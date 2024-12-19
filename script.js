document.getElementById("start-game").addEventListener("click", function () {
  document.getElementById("welcome-page").style.display = "none";
});

const button1 = document.getElementById("controls-btn-1");
const button2 = document.getElementById("controls-btn-2");
const button3 = document.getElementById("controls-btn-3");
const display = document.getElementById("display");
const displayImg = document.getElementById("displayImg");
const displayText = document.getElementById("displayText");
const attackGif = document.getElementById("attack-gif");
const enemyStats = document.getElementById("enemy-stats");
const promilsText = document.getElementById("promilText");
const hpText = document.getElementById("hpText");
const moneyText = document.getElementById("moneyText");
const enemyHpText = document.getElementById("enemyHpText");
const enemyPromilsText = document.getElementById("enemyPromilsText");
const enemyImg = document.getElementById("enemy-img");
const main = document.getElementById("main");

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
    image:
      "https://cdn.discordapp.com/attachments/800513230069563463/1318334639714074634/419220987_2726120417552456_7634860907058757948_n.png?ex=6763ec8f&is=67629b0f&hm=d4422a9bab9f9d6c71c3fa61d0b12f7bebf0825bd865ac8b74fde92020e8e06f&",
  },
  {
    name: "zbyszek",
    hp: 200,
    promils: 2.5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvswN4b61oRmZJTwvubjXE8sFhQyGRX5YV7g&s)",
  },
];

let items = [
  {
    name: "piwo",
    hp: +10,
    promils: +0.2,
  },
  {
    name: "wodka",
    hp: -15,
    promils: +0.5,
  },
];

let inventory = ["piwo", "piwo"];

let locations = [
  {
    name: "przygoda",
    description:
      "Wyruszyłeś na przygodę i spotkałeś meneli, z którym chesz walczyć",
    buttonText: [enemies[0].name, enemies[1].name, "Idź na barcelone"],
    buttonDo: [fight1, fight2, goTown],
    background:
      "https://www.northernirishmaninpoland.com/wp-content/uploads/2023/08/368745081_690519115742468_7199314011439359797_n.jpg",
  },
  {
    name: "barcelona",
    description: "Jesteś na Barcelonie",
    buttonText: ["Idź na przygodę", "Idź do złotego rogu", "pij"],
    buttonDo: [goAdventure, goShop, goDrink],
    background: "https://nasielsk.pl/files/image/Promocyjne/nasielsk_rynek.jpg",
  },
  {
    name: "shop",
    description:
      "Jesteś w złotym rogu.\nPiwo 10zł - +10HP +0.2promila\nWódka 20zł - -30hp + 0.5promila\nTwoj ekwipunek: ",
    buttonText: ["kup piwo", "kup wodke", "Idź na barcelone"],
    buttonDo: [buyItem1, buyItem2, goTown],
    background: "https://i.ibb.co/4Zg7Gj3/Bez-tytu-u.png",
  },
  {
    name: "drink",
    description:
      "Uważaj, żeby sie nie zerzygać\nCo chcesz wypic?\nTwój ekwipunek: ",
    buttonText: ["wypij piwo", "wypij wodke", "przestan pic"],
    buttonDo: [useItem1, useItem2, goTown],
    background: "https://nasielsk.pl/files/image/Promocyjne/nasielsk_rynek.jpg",
  },
  {
    name: "fight",
    description: "walczysz z ",
    buttonText: ["wal na pizde", "unik", "uciekaj"],
    buttonDo: [attack, attack, goTown],
    background: "https://mwfc.pl/wp-content/uploads/2038.jpg",
  },
  {
    name: "won",
    description: "gratulacje udalo ci sie zezgonowac",
    buttonText: ["reset", "reset", "reset"],
    buttonDo: [reset, reset, reset],
    background:
      "https://www.gov.pl/photo/format/2823fa7f-64c1-47a6-961c-15398f7edd58/resolution/1920x810",
  },
  {
    name: "przejebales",
    description: "PRZEGRYWASZ\nmenel ci najebal lub przechlales sie",
    buttonText: ["reset", "reset", "reset"],
    buttonDo: [reset, reset, reset],
    background:
      "https://gazetanowodworska.com/wp-content/uploads/2020/07/nasielsk_poszukiwany-1200x1024.jpg",
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
  enemyImg.style.display = "block";
  enemyImg.src = enemies[index].image;
}

function attack() {
  if (promils === 0) {
    attackDmg = Math.round(3 * Math.floor(Math.random() * 5));
    currentEnemyHP -= attackDmg;
  } else {
    attackDmg = Math.round(7 * promils * Math.floor(Math.random() * 5));
    currentEnemyHP -= attackDmg;
  }
  if (attackDmg > 0) {
    displayText.innerText = "Uderzasz za: " + attackDmg;
    attackGif.style.display = "block"; // Pokaż GIF
    setTimeout(() => {
      attackGif.style.display = "none"; // wylacz gif po 0,5s
    }, 400);
    enemyImg.style.filter = "contrast(200%)";
    enemyImg.style.scale = "0.9";
    setTimeout(() => {
      enemyImg.style.filter = "contrast(100%)";
      enemyImg.style.scale = "1";
    }, 100);
  } else {
    displayText.innerText = "Pudłujesz";
  }
  if (attackDmg >= 30) {
    displayText.innerText = "Uderzasz krytycznie za: " + attackDmg;
  }
  enemyHpText.innerText = Math.round(currentEnemyHP);
  enemyAttackDmg = Math.round(
    Math.floor(Math.random() * 10 * currentEnemyPromils)
  );
  if (enemyAttackDmg > 0) {
    setTimeout(() => {
      main.style.filter = "hue-rotate(+90deg)";
      if (enemyAttackDmg >= 30) {
        displayText.innerText +=
          "\n Przeciwnik krytycznie uderza za: " + enemyAttackDmg;
      } else {
        displayText.innerText += "\n Przeciwnik uderza za: " + enemyAttackDmg;
      }
    }, 500);
    setTimeout(() => {
      main.style.filter = "hue-rotate(0deg)";
    }, 600);
  } else {
    setTimeout(() => {
      displayText.innerText += "\nPrzeciwnik pudłuje";
    }, 500);
  }
  setTimeout(() => {
    hp -= enemyAttackDmg;
    hpText.innerText = hp;
  }, 500);

  if (hp <= 0) {
    setTimeout(() => {
      update(6);
    }, 500);
  }
  if (currentEnemyHP <= 0) {
    setTimeout(() => {
      update(1);
      enemyLoot = Math.round(
        currentEnemyPromils * (Math.floor(Math.random() * 40) + 20)
      );
      money += enemyLoot;
      moneyText.innerText = money;
      displayText.innerText =
        "Zwyciestwo! Wrociles na barcelone.\nZdobyłeś: " +
        enemyLoot +
        "zł!\nRura po browary";
    }, 500);
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

function useItem(itemIndex) {
  if (inventory.includes(items[itemIndex].name)) {
    const index = inventory.indexOf(items[itemIndex].name);
    if (index !== -1) {
      inventory.splice(index, 1);
    }
    promils += items[itemIndex].promils;
    promilsText.innerText = parseFloat(promils.toFixed(2));
    hp += items[itemIndex].hp;
    hpText.innerText = hp.toFixed(0);
    goDrink();
    if (promils >= 3) {
      update(5);
    }
    let vomitChance = Math.random() * 5 * promils;
    if (vomitChance > 9) {
      displayText.innerText = "zrzygales sie, tracisz 1 promila i 30hp";
      promils -= 1;
      promilsText.innerText = Math.round(promils);
      if (hp <= 50) {
        hp = 1;
      } else {
        hp -= 30;
      }
      hpText.innerText = hp;
    }
  } else {
    displayText.innerText = "nie masz tego w eq";
  }
}

function useItem1() {
  useItem(0);
}

function useItem2() {
  useItem(1);
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
  displayImg.style.backgroundSize = "cover";
  displayImg.style.backgroundRepeat = "round";
  displayImg.style.backgroundImage =
    "url('" + locations[location].background + "')";
  enemyImg.style.display = "none";
}
