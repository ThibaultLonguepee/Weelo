/*
** EPITECH PROJECT, 2024
** Telo
** File description:
** engine
*/

import { EloRatedObject, GameResult, isNumber, NumericKeys, TeloConfig } from "./types";

export class Telo {

  private static config: TeloConfig = new TeloConfig();
  public static setConfig(_c: TeloConfig) {
    this.config = _c
  }

  public static resolve(a: EloRatedObject, b: EloRatedObject, result: GameResult): void {
    const { deltaA, deltaB } = this._getEloChanges(a.elo, b.elo, result);
    a.elo += deltaA;
    b.elo += deltaB;
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

  public static ladder<T>(key: NumericKeys<T>) {
    return new class {
      public resolve(a: T, b: T, result: GameResult) {
        if (!isNumber(a[key]) || !isNumber(b[key]))
          return;
        const { deltaA, deltaB } = Telo._getEloChanges(a[key], b[key], result);
        a[key] = (a[key] + deltaA) as T[NumericKeys<T>];
        b[key] = (b[key] + deltaB) as T[NumericKeys<T>];
      }
      public player(player: T) {
        return new class {
          public wonAgainst = (opponent: T) => this._resolve(player, opponent, GameResult.WIN);
          public lostAgainst = (opponent: T) => this._resolve(player, opponent, GameResult.LOSS);
          public tiedAgainst = (opponent: T) => this._resolve(player, opponent, GameResult.DRAW);
          public _resolve(a: T, b: T, result: GameResult) {
            if (!isNumber(a[key]) || !isNumber(b[key]))
              return;
            const { deltaA, deltaB } = Telo._getEloChanges(a[key], b[key], result);
            a[key] = (a[key] + deltaA) as T[NumericKeys<T>];
            b[key] = (b[key] + deltaB) as T[NumericKeys<T>];
          }
        }
      }
    }
  }

  private static _getEloChanges(eloA: number, eloB: number, result: GameResult): { deltaA: number, deltaB: number } {
    const pA = this._p(eloA - eloB);
    const pB = this._p(eloB - eloA);
    return {
      deltaA: this._computeEloChange(result, pA),
      deltaB: this._computeEloChange(1 - result, pB),
    }
  }

  private static _computeEloChange(w: number, p: number): number {
    return Math.round(this.config.multiplier * (w - p));
  }

  private static _p(D: number): number {
    D = Math.max(-400, Math.min(D, 400))
    return 1.0 / (1.0 + Math.exp(-D / 180))
  }

}
