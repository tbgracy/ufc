import { Challenger } from "../../types/challenger";

export default interface IChallengerService {
    getAllChallengers(): Promise<Challenger[]>;
}