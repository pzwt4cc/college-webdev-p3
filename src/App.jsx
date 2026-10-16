import { useState } from "react";
import Fighter from "./components/Fighter";
import kafkaImg from "./assets/img/Kafka.png";
import castoriceImg from "./assets/img/Castorice.png";
import "./reset.css";
import styles from "./App.module.css";

function changeHP(count) {
  console.log(`Damage for ${this.name}: ${count}`);
  this.damageHP = Math.max(0, this.damageHP - count);
}

function random(max) {
  return Math.ceil(Math.random() * max);
}

function App() {
  const [fighters, setFighters] = useState([
    {
      id: 1,
      name: "Kafka",
      img: kafkaImg,
      defaultHP: 100,
      damageHP: 100,
      changeHP,
    },
    {
      id: 2,
      name: "Castorice",
      img: castoriceImg,
      defaultHP: 100,
      damageHP: 100,
      changeHP,
    },
  ]);
  const [logs, setLogs] = useState([]);

  function kick(max) {
    const roundLogs = [];

    const updated = fighters.map((f) => {
      const fighter = { ...f };
      const { name } = fighter;
      const hpBefore = fighter.damageHP;

      fighter.changeHP(random(max));

      const { damageHP } = fighter;
      const loss = hpBefore - damageHP;

      roundLogs.push({
        id: crypto.randomUUID(),
        text: `${name} втратив ${loss} HP, залишилось життів: ${damageHP}`,
      });

      return fighter;
    });

    setFighters(updated);
    setLogs([...roundLogs].reverse().concat(logs));
  }

  const [hero, enemy] = fighters;
  const { name: heroName, damageHP: heroHP } = hero;
  const { name: enemyName, damageHP: enemyHP } = enemy;

  let result = "";
  if (heroHP === 0 && enemyHP === 0) result = "Draw";
  else if (enemyHP === 0) result = heroName + " Won";
  else if (heroHP === 0) result = enemyName + " Won";

  return (
    <div className={styles.arena}>
      {result && <h2 className={styles.resultLabel}>{result}</h2>}
      <div className={styles.heroZone}>
        {fighters.map((f) => (
          <Fighter key={f.id} hero={f} />
        ))}
      </div>
      <div className={styles.remoteZone}>
        <button
          className={styles.atkBtn}
          disabled={result !== ""}
          onClick={() => kick(20)}
        >
          Normal Attack
        </button>
        <button
          className={styles.atkBtn}
          disabled={result !== ""}
          onClick={() => kick(40)}
        >
          Skill Strike
        </button>
      </div>
      <div id="logs" className={styles.logs}>
        {logs.map(({ id, text }) => (
          <p key={id}>{text}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
