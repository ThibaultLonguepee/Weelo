/*
** EPITECH PROJECT, 2024
** Telo
** File description:
** elo-rated
*/

export class TeloConfig {
    public multiplier: number = 50.0;
    public linear_streak_delta: number = 0.0;
    public geometric_streak_delta: number = 1.0;
}

export interface EloRatedObject {
    elo: number;
}

export function isEloRated(obj: object): obj is EloRatedObject {
    return "elo" in obj;
}

export function isNumber(x: any): x is number {
    return typeof x === "number";
}

export type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export enum GameResult {
    WIN = 1.0,
    DRAW = 0.5,
    LOSS = 0.0
}
