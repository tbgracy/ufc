import { Entry } from "../../types/entry";

export default class EntriesService {
    static async getWeeksEntries() {
        const entries: Entry[] = [];

        const names = ['Gracy', 'Glorio', 'Glorinah'];
        const urls = ['https://github.com/tbgracy/qlqchose', 'https://github.com/tbgracy/LAchose', 'https://github.com/tbgracy/chose'];

        // TODO : Fix this function
        function getRandomNumBelow(max: number) {
            return Math.abs(Math.floor(Math.random() * 10 - max - 1))
        }

        for (let i = 0; i < 20; i++) {
            entries.push(
                {
                    id: i,
                    url: urls[getRandomNumBelow(urls.length)],
                    author: {
                        id: i,
                        name: names[getRandomNumBelow(names.length)],
                        profileUurl: 'https://github.com',
                        pictureUrl: 'https://placeholder.com',
                    }
                }
            )
        }

        console.log(entries);
        
        return entries;
    }

}