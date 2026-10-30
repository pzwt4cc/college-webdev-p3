import kafkaImg from "../assets/img/Kafka.png";
import castoriceImg from "../assets/img/Castorice.png";
import aventurineImg from "../assets/img/Aventurine.png";
import summerettoImg from "../assets/img/Summeretto.png";

function changeHP(count) {
  console.log(`Damage for ${this.name}: ${count}`);
  this.damageHP = Math.max(0, this.damageHP - count);
}

export const ALL_FIGHTERS = [
  {
    id: 1,
    name: "Kafka",
    img: kafkaImg,
    defaultHP: 100,
    damageHP: 100,
    changeHP,
    attacks: [
      { id: 1, name: "Shockwave Slash", maxDamage: 15 },
      { id: 2, name: "Caressing Moonlight", maxDamage: 30 },
      { id: 3, name: "Twilight Trill", maxDamage: 50 },
    ],
  },
  {
    id: 2,
    name: "Castorice",
    img: castoriceImg,
    defaultHP: 100,
    damageHP: 100,
    changeHP,
    attacks: [
      { id: 1, name: "Quantum Strike", maxDamage: 15 },
      { id: 2, name: "Photon Ripple", maxDamage: 25 },
      { id: 3, name: "Dimension Collapse", maxDamage: 45 },
    ],
  },
  {
    id: 3,
    name: "Aventurine",
    img: aventurineImg,
    defaultHP: 100,
    damageHP: 100,
    changeHP,
    attacks: [
      { id: 1, name: "Gold Coin Toss", maxDamage: 10 },
      { id: 2, name: "Straight Bet", maxDamage: 35 },
      { id: 3, name: "All-In Roulette", maxDamage: 60 },
    ],
  },
  {
    id: 4,
    name: "Summeretto",
    img: summerettoImg,
    defaultHP: 100,
    damageHP: 100,
    changeHP,
    attacks: [
      { id: 1, name: "Breeze Cut", maxDamage: 15 },
      { id: 2, name: "Gale Slash", maxDamage: 28 },
      { id: 3, name: "Hurricane Tempest", maxDamage: 48 },
    ],
  },
];
