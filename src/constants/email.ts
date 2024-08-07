export const emailTemplates = {
    upperPart: `<div style="background: linear-gradient(90deg, rgba(3,121,113,1) 0%, rgba(6,159,149,1) 50%, rgba(3,121,113,1) 100%);">
    <div style="background: linear-gradient(90deg, rgba(3,121,113,1) 0%, rgba(6,159,149,1) 50%, rgba(3,121,113,1) 100%);">
        <div>
            <img style="max-width: 200px; margin-left: auto; margin-right: auto; display:block; padding-bottom: 30px; padding-top: 30px;" src="https://i.imgur.com/sL09dmy.png">
        </div>
    </div>

    <div class="row mt-5" style="background: linear-gradient(90deg, rgba(3,121,113,1) 0%, rgba(6,159,149,1) 50%, rgba(3,121,113,1) 100%); padding-bottom: 100px;">
        <div style="box-shadow: 3px 3px 3px 1px #5300a0; margin-left: 15%; margin-right: 15%; padding-left: 5%; padding-right:5%; background: linear-gradient(90deg, rgba(5,80,83,1) 0%, rgba(2,52,54,1) 30%, rgba(5,80,83,1) 100%); border-radius: 25px;">
            <div style="font-size: 30px; padding-bottom:70px; padding-top: 50px; word-break: normal; color: white;">`,
    lowerPart: `</div>
    </div>
</div>
</div>  `

}

export interface EmailStructure {
    Messages: {
        From: {
            Email: string;
            Name: string;
        };
        To: {
            Email: string;
            Name: string;
        }[];
        Subject: string;
        HTMLPart: string;
    }[];
}
