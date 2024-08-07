import { Router } from "express";
import { emailTemplates } from "../../constants/email";
import { getEnv } from "../../constants/envs";
import { sendMailJetEmail } from "../../services/email";
import { plainToInstance } from "class-transformer";
import { EmailDto } from "../../dtos/email";
import { validate } from "class-validator";
import rateLimit from "express-rate-limit";

const emailRoutes = Router();
emailRoutes.post("/email", 
    //3 tries in 24 hours
    rateLimit({
        windowMs: 24 * 60 * 60 * 1000,
        headers: false,
        max: 3,
        handler: function(req,res, next){
          res.json({status: "many_email_requests"})
        } 
    }),

async (req, res) => {

  let emailDto = plainToInstance(EmailDto, req.body);
  const errors = await validate(emailDto);
  if(errors.length > 0){
    return res.json("error");
  }

  const message = `
    <div style="color: white;">Email novo: </div>
    <ul>
      <li style="color: white;">Nome: ${req.body.name}</li>
      <li style="color: white;">Email: ${req.body.email}</li>
      <li style="color: white;">Assunto: ${req.body.subject}</li>
      <li style="color: white;">Mensagem: ${req.body.message}</li>
    </ul>`

    const emailObject = {
      Messages: [{
        From: {
          Email: getEnv().mailJet.emailInfo.toEmail,
          Name: req.body.name
        },
        To: [{
          Email: getEnv().mailJet.emailInfo.toEmail,
          Name: getEnv().mailJet.emailInfo.toName
        }],
        Subject: "Meu Site | "+req.body.subject,
        HTMLPart: emailTemplates.upperPart + message + emailTemplates.lowerPart
      }]
    }

    const mailJetResponse = await sendMailJetEmail(emailObject);
    let response = {status: mailJetResponse}
    return res.json(response);
});

export default emailRoutes;
