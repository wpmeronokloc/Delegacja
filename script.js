document.getElementById("start-game").addEventListener("click", function () {
  document.getElementById("welcome-page").style.display = "none";
});

const button1 = document.getElementById("controls-btn-1");
const button2 = document.getElementById("controls-btn-2");
const button3 = document.getElementById("controls-btn-3");
const display = document.getElementById("display");
const displayText = document.getElementById("displayText");
const enemyStats = document.getElementById("enemy-stats");
const promilsText = document.getElementById("promilText");
const hpText = document.getElementById("hpText");
const moneyText = document.getElementById("moneyText");
const enemyHpText = document.getElementById("enemyHpText");
const enemyPromilsText = document.getElementById("enemyPromilsText");

let promils = 0.0;
let hp = 100;
let money = 30;
let currentEnemyIndex;
let currentEnemyHP;
let currentEnemyPromils;
let currentHP;
let attackDmg;
let enemyAttackDmg;
let enemyLoot;

let enemies = [
  {
    name: "kasiak",
    hp: 50,
    promils: 1.3,
  },
  {
    name: "zbyszek",
    hp: 200,
    promils: 2.5,
  },
];

let inventory = ["piwo"];

let locations = [
  {
    name: "przygoda",
    description:
      "Wyruszyłeś na przygodę i spotkałeś meneli, z którym chesz walczyć",
    buttonText: [enemies[0].name, enemies[1].name, "Idź na barcelone"],
    buttonDo: [fight1, fight2, goTown],
  },
  {
    name: "barcelona",
    description: "Jesteś na Barcelonie",
    buttonText: ["Idź na przygodę", "Idź do złotego rogu", "pij"],
    buttonDo: [goAdventure, goShop, goDrink],
  },
  {
    name: "shop",
    description: "Jesteś w złotym rogu.\nTwoj ekwipunek: ",
    buttonText: ["kup piwo", "kup wodke", "Idź na barcelone"],
    buttonDo: [buyItem1, buyItem2, goTown],
  },
  {
    name: "drink",
    description: "Co chcesz wypic?\nTwój ekwipunek: ",
    buttonText: ["wypij piwo", "wypij wodke", "przestan pic"],
    buttonDo: [drinkItem1, drinkItem2, goTown],
  },
  {
    name: "fight",
    description: "walczysz z ",
    buttonText: ["wal na pizde", "unik", "uciekaj"],
    buttonDo: [attack, attack, goTown],
  },
  {
    name: "won",
    description: "gratulacje udalo ci sie zezgonowac",
    buttonText: ["reset", "reset", "reset"],
    buttonDo: [reset, reset, reset],
  },
  {
    name: "przejebales",
    description: "menel ci najebal lub przechlales sie",
    buttonText: ["reset", "reset", "reset"],
    buttonDo: [reset, reset, reset],
  },
];

button1.onclick = goAdventure;
button2.onclick = goShop;
button3.onclick = goDrink;

function goTown() {
  update(1);
}

function goAdventure() {
  update(0);
}

function goShop() {
  update(2);
  displayText.innerText += inventory;
}

function goDrink() {
  update(3);
  displayText.innerText += inventory;
}

function fight1() {
  fight(0);
  currentEnemyIndex = 0;
  display.style.backgroundImage =
    "url(https://cdn.discordapp.com/attachments/800513230069563463/1318334639714074634/419220987_2726120417552456_7634860907058757948_n.png?ex=6763ec8f&is=67629b0f&hm=d4422a9bab9f9d6c71c3fa61d0b12f7bebf0825bd865ac8b74fde92020e8e06f&)";
}

function fight2() {
  fight(1);
  currentEnemyIndex = 1;
}

function fight(index) {
  update(4);
  displayText.innerText = "Walczysz z: " + enemies[index].name;
  enemyStats.style.display = "flex";
  enemyHpText.innerText = enemies[index].hp;
  enemyPromilsText.innerText = enemies[index].promils;
  currentEnemyHP = enemyHpText.innerText;
  currentEnemyPromils = enemyPromilsText.innerText;
}

function attack() {
  if (promils === 0) {
    attackDmg = Math.round(3 * Math.floor(Math.random() * 5));
    currentEnemyHP -= attackDmg;
  } else {
    attackDmg = Math.round(7 * promils * Math.floor(Math.random() * 5));
    currentEnemyHP -= attackDmg;
  }
  enemyHpText.innerText = Math.round(currentEnemyHP);
  enemyAttackDmg = Math.round(
    Math.floor(Math.random() * currentEnemyPromils * 6)
  );
  hp -= enemyAttackDmg;
  hpText.innerText = hp;
  displayText.innerText =
    "Uderzasz za: " + attackDmg + "\n Przeciwnik uderza za: " + enemyAttackDmg;
  if (hp <= 0) {
    update(6);
  }
  if (currentEnemyHP <= 0) {
    update(1);
    enemyLoot = Math.round(
      currentEnemyPromils * Math.floor(Math.random() * 70)
    );
    display.style.background = "white";
    money += enemyLoot;
    moneyText.innerText = money;
    displayText.innerText =
      "Zwyciestwo! Wrociles na barcelone.\nZdobyłeś: " +
      enemyLoot +
      "zł!\nRura po browary";
  }
}

function buyItem1() {
  if (money >= 10) {
    money -= 10;
    inventory.push("piwo");
    goShop();
    moneyText.innerText = money;
  } else {
    displayText.innerText = "nie stac cie";
  }
}

function buyItem2() {
  if (money >= 20) {
    money -= 20;
    inventory.push("wodka");
    goShop();
    moneyText.innerText = money;
  } else {
    displayText.innerText = "nie stac cie";
  }
}

function drinkItem1() {
  if (inventory.includes("piwo")) {
    const index = inventory.indexOf("piwo");
    if (index !== -1) {
      inventory.splice(index, 1);
    }
    promils += 0.2;
    promilsText.innerText = parseFloat(promils.toFixed(2));
    hp += 10;
    hpText.innerText = hp.toFixed(0);
    goDrink();
    if (promils >= 3) {
      update(5);
    }
  } else {
    displayText.innerText = "nie masz tego w eq";
  }
}

function drinkItem2() {
  if (inventory.includes("wodka")) {
    const index = inventory.indexOf("wodka");
    if (index !== -1) {
      inventory.splice(index, 1);
    }
    promils += 0.5;
    promilsText.innerText = parseFloat(promils.toFixed(2));
    hp -= 30;
    hpText.innerText = hp.toFixed(0);
    goDrink();
    if (promils >= 3) {
      update(5);
    }
  } else {
    displayText.innerText = "nie masz tego w eq";
  }
  if (hp <= 0) {
    update(6);
  }
}

function reset() {
  promils = 0;
  hp = 100;
  money = 10;
  promilsText.innerText = parseFloat(promils.toFixed(2));
  hpText.innerText = hp;
  moneyText.innerText = money;
  update(1);
}

function update(location) {
  displayText.innerText = locations[location].description;
  button1.innerText = locations[location].buttonText[0];
  button2.innerText = locations[location].buttonText[1];
  button3.innerText = locations[location].buttonText[2];
  button1.onclick = locations[location].buttonDo[0];
  button2.onclick = locations[location].buttonDo[1];
  button3.onclick = locations[location].buttonDo[2];
  enemyStats.style.display = "none";
}
