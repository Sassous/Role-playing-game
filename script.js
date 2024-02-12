//variable = let (let is most used for variables that will change)
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
// array = ["stick"];
let inventory = ["stick"];

/*querySelector method takes CSS selector as an argument 
and returns the first element that matches that selector.*/

// const it's a variable that can't be changed
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//Object properties are written as key: value pairs, where key is the name of the property (or the key), and value is the value that property holds.
//the value and the properties are separated by a comma.
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
  ];
const monsters = [
    {name: "slime", level: 2, health: 15},
    {name: "fanged beast", level: 8, health: 60},
    {name: "dragon", level: 20, health: 300}
  ]

const locations = [
    {
        name: "town square",
        "button text": ["Go to store 🏦", "Go to cave 🛖", "Fight dragon 🐉"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health ❤️ (10🪙)", "Buy weapon ⚔️ (30🪙)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown, sellWeapon],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight 🧛‍♀️", "Fight 🧟","Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart, restart, restart],
        text:"You die. ☠️"
      },
      {
        name:"win",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
      },
      {
        name: "easter egg",
        "button text": ["2","8","Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
      }
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = sellWeapon;

//The innerText property controls the text that appears in an HTML element.
//function myFunction(param){} = Functions can take parameters, which are values that are given to the function each time it is run. 
function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];//location["button text"] is an 'bracket notation'.
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    button4.style.display = "block";
    text.innerText = location.text;
}
function goTown(){
    //call the function
    //Pass in only the first element of the locations array by adding [0] at the end of the variable.
    update(locations[0]);
    button4.style.display = "none";
    button3.style.backgroundColor = "transparent";
    button2.style.backgroundColor = "transparent";
    button1.style.backgroundColor = "transparent";
    
}
function goStore(){
    update(locations[1]);
    button4.style.display = "block";
    button3.style.backgroundColor = "#072B30";
    button2.style.backgroundColor = "transparent";
    button1.style.backgroundColor = "transparent";
};
function goCave() {
    update(locations[2]);
    button4.style.display = "none";
    button3.style.backgroundColor = "#072B30";
    button2.style.backgroundColor = "transparent";
    button1.style.backgroundColor = "transparent";
  }

  

  //componement assignement is math operation in js
  function buyHealth(){
    if (gold >= 10) {
        gold -=10;
        health += 10;
        healthText.innerText = health;
        goldText.innerText = gold;
      
    }else{
        text.innerText = "You do not have enough gold to buy health.";
    }
  }
  
  function buyWeapon(){

    if(currentWeapon< weapons.length -1){ //if currentWeapon is less than the length of the weapons array -1 cause the array starts at 0

        if(gold >= 30){
            gold -=30;
            currentWeapon ++; //++ = add 1 
            goldText.innerText = gold;
            let newWeapon=weapons[currentWeapon].name;
            inventory.push(newWeapon); //array method push
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon."
        }
    } else{
        text.innerText = "You already have the most powerful weapon!";
        button4.innerText = "Sell weapon for 15 gold";
        button4.onclick=sellWeapon;
    }
  }
  function sellWeapon(){
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();//The shift() method on an array removes the first element in the array and returns it.
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory + "\n";
    } else{
        inventory.length = 1;
        text.innerText = "Don't sell your only weapon!";
    }
  }
function fightSlime() {
fighting = 0;
goFight();
button4.style.display = "none";
}
  
function fightBeast() {
fighting = 1;
goFight();
button4.style.display = "none";
}

function fightDragon() {
    fighting = 2;
    goFight();
    button4.style.display = "none";
    button3.style.backgroundColor = "#072B30";
}
function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "flex";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }
function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()){
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // math.random is a random number between 0 and 1
    }else {
        text.innerText += " You miss."
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      defeatMonster();
      fighting === 2 ? winGame() : defeatMonster(); //ternary operator, true ?, false :
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
      text.innerText += " Your " + inventory.pop() + " breaks.";
      currentWeapon -- ;
    }
  }
  function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0? hit : 0;
  }
  function isMonsterHit() {
    return Math.random() > .2 || health < 20;
  }
function dodge (){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  }
function lose(){
    update(locations[5]);
    button4.style.display = "none";
    button2.style.backgroundColor = "#072B30";
    button1.style.backgroundColor = "#072B30";
}
function winGame(){
    update(locations[6]);
    button4.style.display = "none";
  }
function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory=["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
function easterEgg() {
  update(locations[7]);
}
function pickTwo(){
  pick(2);
}
function pickEight(){
  pick(8) ;
}
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10);{ //while is a loop that runs as long as the condition is true
    numbers.push (Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n"
  for (let i = 0; x < 5; i++) { //for is a loop that runs as long as the condition is true :start to 0, loop 10 times, increment by 1 after each loop
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    goldText.innerText = gold += 20;
  }else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if(health <= 0){
      lose();
    }
  }
}