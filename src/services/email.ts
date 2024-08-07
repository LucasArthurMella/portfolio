import { getEnv } from "../constants/envs";
import { EmailStructure } from "../constants/email";



export async function sendMailJetEmail(emailStructure: EmailStructure){
        const mailJetAuthHeader = 'Basic ' + Buffer.from(`${getEnv().mailJet.mailJetInfo.publicKey}:${getEnv().mailJet.mailJetInfo.privateKey}`).toString('base64');
       try{ 
        const mailJetRequest = await fetch(getEnv().mailJet.mailJetInfo.apiUrl, {
            method: "POST",
            headers: {
                'Authorization': mailJetAuthHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailStructure)
        })
        const mailJetResponse = await mailJetRequest.json();
        return mailJetResponse.Messages[0].Status;
      }catch(e){
        return "error";
      }

    }
