const player1 = {
  element: fire,
  character: archer,
  points: 1000,
}

const player2 = {
  element: water,
  character: rogue,
  points: 500,
}

let winner;
let damage;

if (player1.element == fire && player2.element == water) {
  winner = player2;
} else if (player1.element == fire && player2.element == earth) {
  winner = player1;
} else if (player1.element == fire && player2.element == fire) {
  winner = tie;
} else if (player1.element == water && player2.element == water) {
  winner = tie;
} else if (player1.element == water && player2.element == fire) {
  winner = player1;
} else if (player1.element == water && player2.element == earth) {
  winner = player2;
} else if (player1.element == earth && player2.element == water) {
  winner = player1;
} else if (player1.element == earth && player2.element == fire) {
  winner = player2;
} else if (player1.element == earth && player2.element == earth) {
  winner = tie;
}

if (player1.character == archer && player2.character == knight) {
  damage = 0.25;
} else if (player1.character == archer && player2.character == rogue) {
  damage = 0.75;
} else if (player1.character == archer && player2.character == mage) {
  damage = 0.5;
} else if (player1.character == archer && player2.character == archer) {
  damage = 0;
} else if (player1.character == rogue && player2.character == knight) {
  damage = 0.5;
} else if (player1.character == rogue && player2.character == rogue) {
  damage = 0;
} else if (player1.character == rogue && player2.character == mage) {
  damage = 0.75;
} else if (player1.character == rogue && player2.character == archer) {
  damage = 0.25;
} else if (player1.character == mage && player2.character == knight) {
  damage = 0.75;
} else if (player1.character == mage && player2.character == rogue) {
  damage = 0.25;
} else if (player1.character == mage && player2.character == mage) {
  damage = 0;
} else if (player1.character == mage && player2.character == archer) {
  damage = 0.5;
} else if (player1.character == knight && player2.character == knight) {
  damage = 0;
} else if (player1.character == knight && player2.character == rogue) {
  damage = 0.5;
} else if (player1.character == knight && player2.character == mage) {
  damage = 0.25;
} else if (player1.character == knight && player2.character == archer) {
  damage = 0.75;
}

if (winner == player1) {
  player2.points = player2.points * damage;
  player1.points = player1.points + player2.points * damage;
} else if (winner == player2) {
  player1.points = player1.points * damage;
  player2.points = player2.points + player1.points * damage;
}