import dotenv from "dotenv";

dotenv.config({path: ".env"});

export const getEnv = () => {
  return {
    server: {
      host: process.env.HOST!,
      port: parseInt(process.env.PORT!)
    },
    mongoUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_SECRET!,
    mailJet: {
      emailInfo: {
        fromEmail: process.env.FROM_EMAIL_EMAIL!,
        toEmail: process.env.TO_EMAIL_EMAIL!,
        toName: process.env.TO_EMAIL_NAME!,
      },
      mailJetInfo: {
        apiUrl: process.env.MAILJET_API_URL!,
        publicKey: process.env.MAILJET_PUBLIC_KEY!,
        privateKey: process.env.MAILJET_PRIVATE_KEY! 
      }
    }
  }}
