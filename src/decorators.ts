/*
** EPITECH PROJECT, 2024
** Weelo
** File description:
** decorators
*/

import { EloRatedObject } from "./types";

export function EloRated<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor implements EloRatedObject {
    elo = 1200;
  }
}
