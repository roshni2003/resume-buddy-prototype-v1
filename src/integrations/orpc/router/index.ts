import { authRouter } from "./auth";
import { flagsRouter } from "./flags";
import { storageRouter } from "./storage";

export default {
	auth: authRouter,
	flags: flagsRouter,
	storage: storageRouter,
};
