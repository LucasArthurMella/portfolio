declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string;
      PORT: string;
      HOST: string;
      MONGO_URI: string;
      JWT_SECRET: string;
    }
  }
}

export {}
