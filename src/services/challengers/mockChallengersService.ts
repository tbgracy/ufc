import { Challenger } from "../../types/challenger";
import IChallengerService from "./challengersServiceInterface";

export default class MockChallengerService implements IChallengerService {
    getAllChallengers(): Promise<Challenger[]> {
        throw new Error("Method not implemented.");
    }
}