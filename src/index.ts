/*
** EPITECH PROJECT, 2024
** Telo
** File description:
** index
*/

import { EloRated } from "./decorators"
import { isEloRated } from "./elo-rated";
import { GameResult, Telo } from "./engine";

@EloRated
class Player {
  name: string = "Guest";

  constructor (name: string) {
    this.name = name;
  }
}

const a = new Player("PA");
const b = new Player("PB");
const c = new Player("PC");

if (isEloRated(a) && isEloRated(b)) {
  Telo.resolve(a, b, GameResult.WIN);
  Telo.resolve(a, b, GameResult.WIN);
}

if (isEloRated(a) && isEloRated(c))
  Telo.player(a).wonAgainst(c);

console.log(a as any);
console.log(b as any);
console.log(c as any);