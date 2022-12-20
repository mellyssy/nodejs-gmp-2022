import * as readline from "node:readline/promises";
import { stdin as input, stdout as output, exit } from "node:process";

const rl = readline.createInterface({ input, output });

const ask = async () => {
  const answer = await rl.question("Input your number: ");
  if (answer === "q") {
    exit(0);
  }
  const num = answer.split("").reverse().join("");
  console.log("Your number reversed: ", num);

  ask();
};

ask();
