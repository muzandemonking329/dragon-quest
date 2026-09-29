let dragonHP = 100;
let monsterHP = 80;
let dragonLevel = 1;
let dragonXP = 0;
let coins = 0;
let healingFruit = 2;
let guarding = false;
let huntActive = true;

const dragonHPText = document.getElementById("dragon-hp");
const monsterHPText = document.getElementById("monster-hp");
const levelText = document.getElementById("dragon-level");
const xpText = document.getElementById("dragon-xp");
const coinsText = document.getElementById("coins");
const battleMessage = document.getElementById("battle-message");
const explorationMessage = document.getElementById("exploration-message");
const gameMessage = document.getElementById("game-message");
const inventory = document.getElementById("inventory");

const hunters = [
  { name: "Ironwood Hunter", hp: 80, damage: 10 },
  { name: "Storm Tracker", hp: 95, damage: 12 },
  { name: "Moonlight Scout", hp: 70, damage: 8 },
  { name: "Ember Hunter Captain", hp: 120, damage: 14 }
];

function updateScreen() {
  dragonHPText.textContent = dragonHP;
  monsterHPText.textContent = monsterHP;
  levelText.textContent = dragonLevel;
  xpText.textContent = dragonXP;
  coinsText.textContent = coins;
  document.getElementById("monster-name").textContent = currentHunter.name;
  inventory.innerHTML =
    "<li>🍎 Healing Fruit × " + healingFruit + "</li>" +
    "<li>🌿 Wild Herbs × " + herbs + "</li>";
}

let currentHunter = hunters[0];
let herbs = 0;

function dragonAttack() {
  if (!huntActive || dragonHP <= 0) return;

  const damage = 15 + dragonLevel * 5;
  monsterHP = Math.max(0, monsterHP - damage);

  if (monsterHP === 0) {
    winHunt();
    return;
  }

  battleMessage.textContent = "🔥 Fire Breath dealt " + damage + " damage!";
  hunterAttack();
}

function hunterAttack() {
  if (!huntActive) return;

  let damage = currentHunter.damage;
  if (guarding) {
    damage = Math.ceil(damage / 2);
    guarding = false;
    battleMessage.textContent += " 🛡️ Guard reduced the next hit!";
  }

  dragonHP = Math.max(0, dragonHP - damage);

  if (dragonHP === 0) {
    huntActive = false;
    battleMessage.textContent = "🐲 Your dragon needs to retreat and recover!";
    gameMessage.textContent = "The hunters won this round. Start a New Hunt to try again.";
  } else {
    battleMessage.textContent += " 🏹 Hunters dealt " + damage + " damage.";
  }

  updateScreen();
}

function defend() {
  if (!huntActive) return;
  guarding = true;
  battleMessage.textContent = "🛡️ Your dragon braces for the next hunter attack!";
  hunterAttack();
}

function heal() {
  if (!huntActive) return;

  if (healingFruit <= 0) {
    battleMessage.textContent = "🍎 No Healing Fruit left!";
    return;
  }

  healingFruit--;
  const healed = Math.min(25, 100 - dragonHP);
  dragonHP += healed;
  battleMessage.textContent = "💚 Your dragon recovered " + healed + " HP.";
  hunterAttack();
}

function gainXP(amount) {
  dragonXP += amount;

  while (dragonXP >= 100) {
    dragonXP -= 100;
    dragonLevel++;
    battleMessage.textContent += " ⭐ LEVEL UP! Level " + dragonLevel + "!";
  }
}

function winHunt() {
  huntActive = false;
  const reward = 20 + dragonLevel * 5;
  coins += reward;
  gainXP(50);
  herbs += 1;
  battleMessage.textContent =
    "🎉 Hunter squad driven out! +" + reward + " coins, +50 XP, +1 Wild Herb.";
  gameMessage.textContent = "Your territory is safe. Explore for supplies or start another hunt.";
  updateScreen();
}

function explore() {
  if (dragonHP <= 0) {
    explorationMessage.textContent = "🐲 Your dragon needs to recover before exploring.";
    return;
  }

  const roll = Math.random();

  if (roll < 0.4) {
    herbs++;
    explorationMessage.textContent = "🌿 You found a Wild Herb!";
  } else if (roll < 0.7) {
    healingFruit++;
    explorationMessage.textContent = "🍎 You found a Healing Fruit!";
  } else if (roll < 0.9) {
    coins += 10;
    explorationMessage.textContent = "🪙 You discovered 10 coins!";
  } else {
    explorationMessage.textContent = "👀 You spotted hunters nearby, but they did not see you.";
  }

  updateScreen();
}

function newHunt() {
  currentHunter = hunters[Math.floor(Math.random() * hunters.length)];
  monsterHP = currentHunter.hp;
  dragonHP = 100;
  huntActive = true;
  guarding = false;
  battleMessage.textContent = "🏹 A new hunter squad entered your territory!";
  gameMessage.textContent = "Track the hunters, protect your dragon territory, and earn XP.";
  updateScreen();
}

document.getElementById("attack-button").addEventListener("click", dragonAttack);
document.getElementById("defend-button").addEventListener("click", defend);
document.getElementById("heal-button").addEventListener("click", heal);
document.getElementById("explore-button").addEventListener("click", explore);
document.getElementById("reset-button").addEventListener("click", newHunt);

updateScreen();