/*
** EPITECH PROJECT, 2024
** Telo
** File description:
** elo-rated
*/

export interface EloRatedObject {
    elo: number;
}

export function isEloRated(obj: object): obj is EloRatedObject {
    return "elo" in obj;
}
