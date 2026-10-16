import styles from "./Fighter.module.css";

function Fighter({ hero: { name, img, damageHP, defaultHP } }) {
  let color = "green";

  if (damageHP <= 50) color = "orange";
  if (damageHP <= 20) color = "red";

  return (
    <div className={styles.heroView}>
      <h1 className={styles.heroName}>{name}</h1>
      <img className={styles.heroImg} src={img} alt={name} />
      <p className={styles.heroStats}>
        {damageHP} / {defaultHP}
      </p>
      <div className={styles.hpBar}>
        <div
          className={styles.hpBarFill}
          style={{ width: damageHP + "%", background: color }}
        />
      </div>
    </div>
  );
}

export default Fighter;
