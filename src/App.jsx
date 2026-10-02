import { useState } from "react";
import Fighter from "./components/Fighter";
import kafkaImg from "./assets/img/Kafka.png";
import castoriceImg from "./assets/img/Castorice.png";
import "./reset.css";
import styles from "./App.module.css";

function App() {
  const [fighters, setFighters] = useState([
    { id: 1, name: "Kafka", img: kafkaImg, defaultHP: 100, damageHP: 100 },
    {
      id: 2,
      name: "Castorice",
      img: castoriceImg,
      defaultHP: 100,
      damageHP: 100,
    },
  ]);

  function random(max) {
    return Math.ceil(Math.random() * max);
  }

  function kick(max) {
    setFighters(
      fighters.map((f) => ({
        ...f,
        damageHP: Math.max(0, f.damageHP - random(max)),
      })),
    );
  }

  const [hero, enemy] = fighters;

  let result = "";
  if (hero.damageHP === 0 && enemy.damageHP === 0) result = "Draw";
  else if (enemy.damageHP === 0) result = hero.name + " Won";
  else if (hero.damageHP === 0) result = enemy.name + " Won";

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
    </div>
  );
}

export default App;
