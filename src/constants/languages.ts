
export function generateText(language: "pt-BR" | "en-US"){

  if(language == "pt-BR"){
  let texts = {
    header: {
      allProjects: "Todos Projetos",
      about: "Sobre",
      technologies: "Tecnologias",
      projects: "Projetos",
      contact: "Contato"
    },
    about: {
      box1: {
        h2: "Olá, meu nome é",
        h1: "Lucas Mella"
      },
      box2: {
        aboutMe: "Sobre mim",
        p1: "Sou um desenvolvedor back-end formado em engenharia de software que reside em Maringá, Paraná.",
        p2: "Começei a programar desde a adolescência, e começei a trabalhar oficialmente em 2022.",
        p3: "Minhas principais experiências envolvem o desenvolvimento de aplicações Web Fullstack, Criações de APIs backend, Integrações de APIs externas entre outros."
      },
      cvDownload: "Baixar CV"
    },
    technologies: {
      title: "Principais Tecnologias"
    },
    projects: {
      projectsButton: "Ver todos os projetos"
    },
    contact: {
      myNetworks:{ title: "Minhas Redes"},
      speakToMe: { 
        title: "Fale Comigo",
        name: "Nome",
        matter: "Assunto",
        message: "Mensagem",
        send: "Enviar"
      }
    }
  }   
  
  return texts; 
  }


}
