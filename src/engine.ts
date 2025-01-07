/*
** EPITECH PROJECT, 2024
** Weelo
** File description:
** engine
*/

import { EloRatedObject, GameResult, isEloRated, isNumber, NumericKeys, WeeloConfig } from "./types";

export class weelo {

  private static config: WeeloConfig = new WeeloConfig();
  public static setConfig(_c: WeeloConfig) {
    this.config = _c
  }

  public static resolve(a: EloRatedObject, b: EloRatedObject, result: GameResult): void {
    const { deltaA, deltaB } = this._eloDeltas(a.elo, b.elo, result);
    a.elo += deltaA;
    b.elo += deltaB;
  }

  public static resolve_any<T>(a: T, b: T, result: GameResult): void {
    if (!isEloRated(a) || !isEloRated(b))
        return;
    const { deltaA, deltaB } = this._eloDeltas(a.elo, b.elo, result);
    a.elo += deltaA;
    b.elo += deltaB;
  }

  public static player<T>(player: T) {
    return new class {
      public setElo(value: number) {
        if (isEloRated(player))
          player.elo = value;
      }
      public wonAgainst(opponent: T) {
        weelo.resolve_any(player, opponent, GameResult.WIN);
      }
      public lostAgainst(opponent: T) {
        weelo.resolve_any(player, opponent, GameResult.LOSS);
      }
      public tiedAgainst(opponent: T) {
        weelo.resolve_any(player, opponent, GameResult.DRAW);
      }
    }
  }

  public static ladder<T>(key: NumericKeys<T>) {
    return new class {
      public resolve(a: T, b: T, result: GameResult) {
        if (!isNumber(a[key]) || !isNumber(b[key]))
          return;
        const { deltaA, deltaB } = weelo._eloDeltas(a[key], b[key], result);
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
            const { deltaA, deltaB } = weelo._eloDeltas(a[key], b[key], result);
            a[key] = (a[key] + deltaA) as T[NumericKeys<T>];
            b[key] = (b[key] + deltaB) as T[NumericKeys<T>];
          }
        }
      }
    }
  }

  private static _eloDeltas(eloA: number, eloB: number, result: GameResult): { deltaA: number, deltaB: number } {
    const pA = this._p(eloA - eloB);
    const pB = this._p(eloB - eloA);
    return {
      deltaA: this._eloDelta(result, pA),
      deltaB: this._eloDelta(1 - result, pB),
    }
  }

  private static _eloDelta(w: number, p: number): number {
    return Math.round(this.config.multiplier * (w - p));
  }

  private static _p(D: number): number {
    D = Math.max(-400, Math.min(D, 400))
    return 1.0 / (1.0 + Math.exp(-D / 180))
  }

}
