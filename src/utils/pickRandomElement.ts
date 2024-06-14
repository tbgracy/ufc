import getRandomNumberBetween from "./getRandomNumber";

export default function pickRandom<T>(list: T[]) {
    return list[getRandomNumberBetween(0, list.length - 1)]
}