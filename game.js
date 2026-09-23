// =========================
// GAME VARIABLES
// =========================

let dragonHP = 100;
let monsterHP = 100;

let dragonLevel = 1;
let dragonXP = 0;
let coins = 0;


// =========================
// FIND HTML ELEMENTS
// =========================

const dragonHPText = document.getElementById("dragon-hp");
const monsterHPText = document.getElementById("monster-hp");

const levelText = document.getElementById("dragon-level");
const xpText = document.getElementById("dragon-xp");
const coinsText = document.getElementById("coins");

const battleMessage = document.getElementById("battle-message");


// =========================
// DRAGON ATTACK
// =========================

function dragonAttack() {

  // Deal 20 damage
  monsterHP -= 20;

  // Make sure HP doesn't go below 0
  if (monsterHP < 0) {
    monsterHP = 0;
  }

  // Update the screen
  monsterHPText.textContent = monsterHP;

  // Check if monster is defeated
  if (monsterHP === 0) {

    battleMessage.textContent =
      "🎉 You defeated the Shadow Beast!";

    gainXP(50);
    coins += 25;

    coinsText.textContent = coins;

  } else {

    battleMessage.textContent =
      "🔥 Dragon Attack dealt 20 damage!";

    monsterAttack();
  }
}


// =========================
// MONSTER ATTACK
// =========================

function monsterAttack() {

  dragonHP -= 10;

  if (dragonHP < 0) {
    dragonHP = 0;
  }

  dragonHPText.textContent = dragonHP;

  if (dragonHP === 0) {

    battleMessage.textContent =
      "💀 Your dragon was defeated!";

  } else {

    battleMessage.textContent +=
      " 👹 The monster attacked for 10 damage!";
  }
}


// =========================
// GAIN XP
// =========================

function gainXP(amount) {

  dragonXP += amount;

  xpText.textContent = dragonXP;

  checkLevelUp();
}


// =========================
// LEVEL UP
// =========================

function checkLevelUp() {

  if (dragonXP >= 100) {

    dragonLevel++;

    dragonXP = 0;

    levelText.textContent = dragonLevel;
    xpText.textContent = dragonXP;

    battleMessage.textContent +=
      " ⭐ LEVEL UP! Your dragon is now level " +
      dragonLevel + "!";
  }
}


// =========================
// BUTTONS
// =========================

document
  .getElementById("attack-button")
  .addEventListener("click", dragonAttack);
