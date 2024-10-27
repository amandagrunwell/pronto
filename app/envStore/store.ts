import { EnvStore } from "./types";

export const envStore: EnvStore = {
    DATABASE_URL: process.env.DATABASE_URL || "",
};

const setEnvStoreFromEnvironment = () => {
    (Object.keys(envStore) as Array<keyof EnvStore>).forEach((envVar) => {
        envStore[envVar] = process.env[envVar] as any;
    });
};

export const configureEnv = async (): Promise<void> => {
    setEnvStoreFromEnvironment();

    const emptyDataResults = Object.keys(envStore).filter(
        (envVar: string) => envStore[envVar as keyof EnvStore] === ""
    );

    if (emptyDataResults.length > 0) {
        console.error(
            `Missing required environment variables: ${emptyDataResults.join(", ")}`
        );
        process.exit(1);
    }
};

export default envStore;
