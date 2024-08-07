import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'slick-carousel/slick/slick.min.js';
import $ from 'jquery';


export function home() {

Fancybox.bind('[data-fancybox]', {
});

$(function(){
  $('.project-box-images').slick({
   infinite: true,
    dots: true,
    speed: 300,
  });
});

let lang:HTMLInputElement = document.querySelector("#lang")!;
let emailForm = document.querySelector(".form-box")! as HTMLFormElement;

emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var data = new FormData(emailForm);
  let request_data: Record<string, any> = {};  

  for (var [key, value] of data) {
    request_data[key] = value as string;
  }


  const mailJetRequest = await fetch(window.location.origin + "/api/email", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request_data)
  })

  let response = await mailJetRequest.json();

  if(response.status == "success"){
    if(lang.value=="pt-BR"){
      alert("Email enviado com sucesso!");
    }else{
      alert("Email sent sucessfully!");
    }
  
  }else if(response.status=="many_email_requests"){
    if(lang.value == "pt-BR"){
      alert("Muitas tentativas de envio! Tente novamente mais tarde.");
    }else{
      alert("Too many send attempts! Try again later.");
    }
  }else {
    if(lang.value == "pt-BR"){
      alert("Falha ao enviar email!");
    }else{
      alert("Failure to send email!");
    }
  }
  emailForm.reset();
})
  
}

home();



