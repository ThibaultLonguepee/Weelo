/*
** EPITECH PROJECT, 2024
** Telo
** File description:
** engine
*/

import { TeloConfig } from "./config";
import { EloRatedObject } from "./elo-rated";

export enum GameResult {
  WIN = 1.0,
  DRAW = 0.5,
  LOSS = 0.0
}

export class Telo {

  private static config: TeloConfig = new TeloConfig();
  public static setConfig(_c: TeloConfig) {
    this.config = _c
  }

  public static resolve(a: EloRatedObject, b: EloRatedObject, result: GameResult): void {
    const p_a_win = this._p(a.elo - b.elo);
    const p_b_win = this._p(b.elo - a.elo);
    this._updateElo(a, result, p_a_win);
    this._updateElo(b, 1 - result, p_a_win);
  }

  public static player(player: EloRatedObject) {
    return new class {
      public wonAgainst(opponent: EloRatedObject) {
        Telo.resolve(player, opponent, GameResult.WIN);
      }
      public lostAgainst(opponent: EloRatedObject) {
        Telo.resolve(player, opponent, GameResult.LOSS);
      }
      public tiedAgainst(opponent: EloRatedObject) {
        Telo.resolve(player, opponent, GameResult.DRAW);
      }
    }
  }

  private static _updateElo(obj: EloRatedObject, w: number, p: number): void {
    obj.elo += Math.round(this.config.multiplier * (w - p));
  }

  private static _p(D: number): number {
    D = Math.max(-400, Math.min(D, 400))
    return 1.0 / (1.0 + Math.exp(-D / 180))
  }
}
