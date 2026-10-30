import { useState, useRef, useEffect } from "react";
import Fighter from "./components/Fighter";
import { ALL_FIGHTERS } from "./data/all_fighters";
import "./reset.css";
import styles from "./App.module.css";

function random(max) {
  return Math.ceil(Math.random() * max);
}

function getRandomFighters() {
  const shuffled = [...ALL_FIGHTERS].sort(() => 0.5 - Math.random());
  return [
    { ...shuffled[0], counts: [10, 10, 10], damageHP: shuffled[0].defaultHP },
    { ...shuffled[1], counts: [10, 10, 10], damageHP: shuffled[1].defaultHP },
  ];
}

function App() {
  const [fighters, setFighters] = useState(getRandomFighters);
  const [logs, setLogs] = useState([]);
  const [turn, setTurn] = useState(0);

  const logsEndRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const hero = fighters[0];
  const enemy = fighters[1];

  let result = "";
  if (hero.damageHP === 0 && enemy.damageHP === 0) result = "Draw";
  else if (enemy.damageHP === 0) result = hero.name + " Won";
  else if (hero.damageHP === 0) result = enemy.name + " Won";

  function handleAttack(fighterIndex, attackIndex) {
    if (turn !== fighterIndex) return;

    const activeFighter = fighters[fighterIndex];
    if (activeFighter.counts[attackIndex] <= 0) return;

    const attackObj = activeFighter.attacks[attackIndex];
    const roundLogs = [];

    const updated = fighters.map((f, index) => {
      const fighter = { ...f };

      if (index === fighterIndex) {
        fighter.counts = [...fighter.counts];
        fighter.counts[attackIndex] -= 1;
      } else {
        const hpBefore = fighter.damageHP;
        fighter.changeHP(random(attackObj.maxDamage));
        const loss = hpBefore - fighter.damageHP;

        roundLogs.push({
          id: crypto.randomUUID(),
          text: `${activeFighter.name}: used "${attackObj.name}" vs ${fighter.name}! Lost ${loss} HP (left: ${fighter.damageHP})`,
        });
      }

      return fighter;
    });

    setFighters(updated);
    setLogs([...logs, ...roundLogs]);
    setTurn((prev) => (prev === 0 ? 1 : 0));
  }

  function handleReset() {
    setFighters(getRandomFighters());
    setLogs([]);
    setTurn(0);
  }

  return (
    <div className={styles.arena}>
      {result && (
        <div className={styles.winnerContainer}>
          <h2 className={styles.resultLabel}>{result}</h2>
          <button className={styles.atkBtn} onClick={handleReset}>
            New Battle
          </button>
        </div>
      )}

      <div className={styles.heroZone}>
        {fighters.map((f, fighterIndex) => (
          <div key={f.id} className={styles.fighterWrapper}>
            <Fighter hero={f} />
            <div className={styles.fighterRemoteZone}>
              {f.attacks.map((atk, attackIndex) => (
                <button
                  key={atk.id}
                  className={styles.atkBtn}
                  disabled={
                    result !== "" ||
                    f.counts[attackIndex] === 0 ||
                    turn !== fighterIndex
                  }
                  onClick={() => handleAttack(fighterIndex, attackIndex)}
                >
                  {atk.name} ({f.counts[attackIndex]})
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.logs}>
        {logs.map(({ id, text }) => (
          <p key={id}>{text}</p>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}

export default App;
