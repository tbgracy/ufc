import authService from "../auth";
import challengerService from "../challengers";
import EntriesService from "./entriesService";
import MockEntriesService from "./mockEntriesService";

const inDevEnv = import.meta.env.VITE_DEV as string == '1' ? true : false;

const entriesService = inDevEnv ? new MockEntriesService() : new EntriesService(challengerService, authService)

export default entriesService;
