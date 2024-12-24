# 📈 weelo

An easy-to-use Typscript ELO engine package.

# 🤔 *What is* weelo?

**weelo** is an easy to use ELO / Ranking manager.<br>
It helps you by having a lot of built-in features for easy to use ranking systems based on the ELO system.<br>
**weelo** manages multi-ladder systems well;<br>
Adding to that, a lot of features regarding rankings are too come, stay tuned!

# 🔨 Installing

As **weelo** is simply an **NPM Package**, you can just install with the following command:
```sh
npm i weelo
```
**weelo** is dependecy-less, no additional packages should be installed from that.

# 👨‍💻 Usage

To import **weelo** within a script file, simply add the following line at the top (near your usual imports):
```ts
import { Weelo } from "weelo"
```
This will import the main engine. Another import is feasable, but we will look more into it later.

## Ladder approach

The simplest way to approach using **weelo** is through the **ladders**.<br>
You should look at a ladder like a category people compete in, that has its own separate rank.<br>

> For example, in *League Of Legends*, you have a "Solo" rank, as well as a "Flex" (when playing in pre-made teams of 3+ players) rank; that are totally distinct.

Let's start by making a class that will be used for our ranking:
```ts
/// Simplistic class that can be constructed with a name.
/// Name DOES NOT affect how weelo works, it's for the sake of the example only.
class Player {
    name: string = "Guest";
    power: number = 1000;

    constructor (name: string) { this.name = name; }
}
```
Here, `power` will be used as the ranking factor.<br>
Let's create two new players:
```ts
/// Create a player named "Will", and one named "Noah".
const will = new Player("Will");
const noah = new Player("Noah");
```
At the start, they have `1000` power as set in the class as base value.<br>
So they are both considered to have the same power.<br>
Now, for the sake of the example, let's say that Noah duels Will, and wins it;<br>
We can then **use weelo to determine how much powerful they should be considered now**:
```ts
Weelo.ladder<Player>("power").player(noah).wonAgainst(will);
/// Would be the same as doing:
/// Weelo.ladder<Player>("power").player(will).lostAgainst(noah)
```
After that, using a `console.log` on our players reveals their strength difference:
```
Player { name: 'Will', power: 975 }
Player { name: 'Noah', power: 1025 }
```

## Decorators apporach

This is the less recommended approach "out of the two";<bre>
for technical reason, the implementation given in Weelo is far from being a great one, I wish to make it better in next updates.

> Basically some stuff about decorators not mutating a class topology at compile time meaning type-safety cannot be assured...

Let's start by making a class for our players:
```ts
// Class representation of a Player with an elo score.
@EloRated
class Player {
    name: string = "Guest";
    constructor (name: string) { this.name = name; }
}
```
Now that you have an `EloRated` class, let's head forward and make players battle,<br>
For this, let's create two Players:
```ts
/// Create a player named "Will", and one named "Noah".
const will = new Player("Will");
const noah = new Player("Noah");
```
Now, after a rough battle, Noah wins the battle, and so, it's ranking must increase relatively to it's opponant ranking;<br>
Let's use **weelo** tools for that:
```ts
/// Temporarily needed, to ensure they have the Elo system injected
if (isEloRated(will) && isEloRated(noah)) {
    Weelo.player(noah).wonAgainst(will);
    /// Same as doing the following:
    /// Weelo.player(will).lostAgainst(noah);
    /// Weelo.resolve(noah, will, GameResult.WIN);
}
```
Using a `console.log` on both our players reveals that they do have an `elo` score:
```
Player { name: 'Will', elo: 1225 }
Player { name: 'Noah', elo: 1175 }
```
As you can see, Noah got a higher ELO than Will after the battle he won.