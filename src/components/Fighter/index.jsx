import styles from "./Fighter.module.css";

function Fighter({ hero }) {
  let color = "green";

  if (hero.damageHP <= 50) color = "orange";
  if (hero.damageHP <= 20) color = "red";

  return (
    <div className={styles.heroView}>
      <h1 className={styles.heroName}>{hero.name}</h1>
      <img className={styles.heroImg} src={hero.img} alt={hero.name} />
      <p className={styles.heroStats}>
        {hero.damageHP} / {hero.defaultHP}
      </p>
      <div className={styles.hpBar}>
        <div
          className={styles.hpBarFill}
          style={{ width: hero.damageHP + "%", background: color }}
        />
      </div>
    </div>
  );
}

export default Fighter;
