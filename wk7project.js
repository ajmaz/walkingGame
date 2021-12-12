const readlineSync = require(`readline-sync`);

const player = readlineSync.question("What is your name?");

readlineSync.question("Hello " + player + ", Welcome to the game! Keep a steady guard while walking, be ready for enemy attack!");

const badGuys = ["Flying Monkey", " The Lioness", " The Bear", " Evil Unicorn"];
const treasure = ["firstAid", "Body Armor", "Energy Drink"];
const prize = [];
let playerHealth = 40;
const options = ["Walk", "Exit", "Print"];
let pickUp = treasure[Math.floor(Math.random() * treasure.length)];

function game() {
    const attackPower = Math.floor(Math.random() * (4 + 8 - 7) + 5);
    const badGuy = badGuys[Math.floor(Math.random() * badGuys.length)];
    let badGuysHealth = 40;
    const badGuysPower = Math.floor(Math.random() * (2 - 3 + 2) + 5);

    const index = readlineSync.keyInSelect(options, "what would you like to do next?");

    if (options[index] == "Exit") {
        return playerHealth = 0;
    } else if (options[index] == "Print") {
        console.log(player + ": \n" + playerHealth + "\nTreasure: " + pickUp);
    } else if (options[index] === "Walk") {
        let key = Math.random();
        if (key <= .3) {
            console.log("Walking....");
        }
        else if (key >= .3) {
            console.log(badGuy + " showed up.");

            while (badGuysHealth > 0 && playerHealth > 0) {

                const user = readlineSync.question("What do you want to do? Enter 'r' to run or 'a' to attack: ");

                switch (user) {
                    case "r": //runaway
                        const run = Math.random();
                        if (run < .5) {
                            console.log("Before you can run away " + badGuy + " attacks you with " + badGuysPower + "attack power!");
                        } else {
                            console.log("You ran away!!");
                            break;
                        }
                    case "a":
                        badGuysHealth -= attackPower;
                        console.log("You attacked " + badGuy + " with " + attackPower + " attack power!");

                        playerHealth -= badGuysPower;
                        console.log("Enemy just attacked you with: " + badGuysPower + " attack power!");

                        if (badGuysHealth <= 0) {
                            console.log("You killed " + badGuy + ".\n" + badGuy + " left " + pickUp);
                            let loot = Math.random();
                            if (loot <= .3) {
                                prize.push(pickUp);
                            }
                            else if (playerHealth <= 0) {
                                console.log(badGuy + " has defeated you. You are now dead.");
                            }
                        }
                }
            }
        }
    }
}

while (playerHealth > 0) {
    game();
}