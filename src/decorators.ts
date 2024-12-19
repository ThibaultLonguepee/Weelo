/*
** EPITECH PROJECT, 2024
** Telo
** File description:
** decorators
*/

import { EloRatedObject } from "./elo-rated";

export function EloRated<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor implements EloRatedObject {
    elo = 1200;
  }
}
