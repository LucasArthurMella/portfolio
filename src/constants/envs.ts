import dotenv from "dotenv";

dotenv.config({path: ".env"});

export const getEnv = () => {
  return {
    server: {
      host: process.env.HOST!,
      port: parseInt(process.env.PORT!)
    },
    mongoUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_SECRET!
  }}
