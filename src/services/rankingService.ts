import { getDocs, collection } from "firebase/firestore"
import { Entry } from "../types/entry"
import { User } from "../types/user"
import avatarPlaceholder from "../assets/images/avatar-placeholder.svg";
import IChallengerService from "./challengers/challengersServiceInterface"
import { db } from "./firebase"
import { isFromThisWeek } from "../utils"
import { nanoid } from "@reduxjs/toolkit";

export default class RankingService {
    private challengerService: IChallengerService

    constructor(challengerService: IChallengerService) {
        this.challengerService = challengerService
    }

    async getAllTimeRank(): Promise<User[]> {
        throw Error("Method not implemented")
    }

    async getWeeklyRank(): Promise<User[]> {
        const users: User[] = [
            {
                id: nanoid(),
                fullName: 'Tsierenana B. Gracy',
                profilePictureUrl: avatarPlaceholder,
            },
            {
                id: nanoid(),
                fullName: 'Tsierenana B. Gracy',
                profilePictureUrl: avatarPlaceholder,
            },
            {
                id: nanoid(),
                fullName: 'Tsierenana B. Gracy',
                profilePictureUrl: avatarPlaceholder,
            }
        ]

        await new Promise(resolve => setTimeout(resolve, 1000))

        return users

        const allChallengers = await this.challengerService.getAllChallengers()

        const weeksEntries: Entry[] = []

        const querySnapshot = await getDocs(collection(db, "entries"));

        querySnapshot.forEach(async (doc) => {
            if (isFromThisWeek(doc.data().createdAt)) {
                const entry: Entry = {
                    id: doc.id,
                    url: doc.data().url,
                    homepage: doc.data().homepage,
                    author: allChallengers.find(e => e.username === doc.data().author)!,
                    voteCount: doc.data().votes.length,
                }
                weeksEntries.push(entry)
            }
        })

        const rankedEntries = weeksEntries.sort((a, b) => b.voteCount - a.voteCount)

        const rankedChallengers = rankedEntries.map(e => e.author)

        return rankedChallengers
    }
}