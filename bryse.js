let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let newWeapon;
let monsterHealth;
let inventory = ['stick'];


const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
    {
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw-hammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }
];

const monsters = [
    {
        name: 'slime',
        level: 2,
        health: 15
    },
    {
        name: 'fanged beast',
        level: 8,
        health: 60
    },
    {
        name: 'dragon',
        level: 20,
        health: 300
    }
]


const locations = [
    {
        name: 'town square',
        buttonText: ['Go to store', 'Go to cave', 'Fight dragon'],
        buttonFunctions: [goStore, goCave, fightDragon],
        text: 'You are in the town square, You see a sign that says \ *store.\** '
    },
    {
        name: 'store',
        buttonText: ['Buy 10 health (10 gold)', 'Buy weapon(30 gold)', 'Go to town Square'],
        buttonFunctions: [buyHealth, buyWeapon, goTown],
        text: 'You enter the store'
    },
    {
        name: 'cave',
        buttonText: ['fight slime', 'fight fanged beast', 'Go to town square'],
        buttonFunctions: [fightSlime, fightBeast, goTown],
        text: 'You enter the cave . You see some monsters'
    },
    {
        name: 'fight',
        buttonText: ['Attack', 'Dodge', 'Run'],
        buttonFunctions: [attack, dodge, goTown],
        text: 'You are fighting a monster'

    },
    {
        name: 'kill monster',
        buttonText: ['Go to town square', 'Go to town square', 'Easter egg'],
        buttonFunctions: [goTown, goTown, easterEgg],
        text: 'The monster screams Arg! as it dies. You gain experience ponts and find gold'

    },
    {
        name: 'lose',
        buttonText: ['REPLAY', 'REPLAY', 'REPLAY'],
        buttonFunctions: [restart, restart, restart],
        text: 'You die'
    },
    {
        name: 'win',
        buttonText: ['REPLAY?', 'REPLAY', 'REPLAY'],
        buttonFunctions: [restart, restart, restart],
        text: 'You defeat the dragon! YOU WIN THE GAME!'

    },
    {
        name: 'eater egg',
        buttonText: ['2', '8', 'Go to town square'],
        buttonFunctions: [pickTwo, pickEight, goTown],
        text: 'You find a  secret game.Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers , you win!'

    }

]

// Initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {
    monsterStats.style.display = 'none';
    button1.innerText = location.buttonText[0];
    button2.innerText = location.buttonText[1];
    button3.innerText = location.buttonText[2];
    button1.onclick = location.buttonFunctions[0];
    button2.onclick = location.buttonFunctions[1];
    button3.onclick = location.buttonFunctions[2];
    text.innerText = location.text
} 


function goTown() {
    update(locations[0]);

}

function goStore() {
    update(locations[1]);

}

function goCave() {
    update(locations[2]);

}



function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = 'You just added more health to your life';
    }
    else {
        text.innerText = " You do not have enough gold to buy health";
    }
}
 
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText ="You now have a "+ newWeapon + '.';
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have a"+ inventory;
        }
        else {
            text.innerText = " You do not have enough gold to buy a weapon";
        }
    } else {
        text.innerText = 'You already have the most powerful wapon!';
        button2.innerText = 'Sell weapon for 15 gold';
        button2.onclick = sellWeapon;
    }
}


function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = 'You sold a ' + currentWeapon + '.';
        text.innerText += "In your inventory you have" + inventory;
    }
    else {
        text.innerText = 'Dont sell your only weapon';
    
    }

}
function fightSlime() {
    fighting = 0;
    gofight();

}
function fightBeast() {
    fighting = 1;
    gofight();j

}

function fightDragon() {
    fighting = 2;
    gofight();

}
function gofight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}


function attack() {
    text.innerText = 'The' + monsters[fighting].name + 'attacks';
    text.innerText += "You attack it with your" + weapons[currentWeapon].name + '.';
    if (isMonsterHit()) {
        health = getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText = 'You miss';
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealth.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += 'Your' + inventory.pop() + 'breaks';
        currentWeapon--;
    }
}


function getMonsterAttackValue(level) {
    let hit = (level * 5) - Math.floor(Math.random() * xp);
    return hit;

}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the" + monsters[fighting].name + '.';

}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    currentWeapon = 0;
    gold = 50;
    inventory = ['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);

}

function pickTwo() {
    pick(2);

}
function pickEight() {
    pick(8);

}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked" + guess + " . Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += 'Right! you win 20 gold';
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText = 'Wrong! You lose 10 health!'
        health -= 10;
        healthText.innerText = health
        if (health <= 0) {
            lose();
        }
    }

}