

const global = {
  ptPr: {
    title: "Lucas Mella | Desenvolvedor Backend",
    header: {
      allProjects: "Todos Projetos",
      about: "Sobre",
      technologies: "Tecnologias",
      projects: "Projetos",
      contact: "Contato"
    },
  },
  enUs: {
    title: "Lucas Mella | Backend Developer",
    header: {
      allProjects: "All Projects",
      about: "About",
      technologies: "Technologies",
      projects: "Projects",
      contact: "Contact"
    },
  }
}


export function generateTextHome(language: "pt-BR" | "en-US"){

  if(language == "pt-BR"){
  let texts = {
    ...global.ptPr,
    about: {
      box1: {
        h2: "Olá, meu nome é",
        h1: "Lucas Mella"
      },
      box2: {
        aboutMe: "Sobre mim",
        p1: "Sou um desenvolvedor backend formado em engenharia de software que reside em Maringá, Paraná.",
        p2: "Começei a programar desde a adolescência, e começei a trabalhar oficialmente em 2022.",
        p3: "Minhas principais experiências envolvem o desenvolvimento de aplicações Web Fullstack, Criações de APIs backend, Integrações de APIs externas e entre outros.",
        cvDownload: "Baixar CV"
      },
    },
    technologies: {
      title: "Principais Tecnologias"
    },
    projects: {
      title: "Principais Projetos",
      projectsButton: "Ver todos projetos"
    },
    contact: {
      title: "Contato",
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
  } else {
  let texts = {
    ...global.enUs,
    about: {
      box1: {
        h2: "Hello, my name is",
        h1: "Lucas Mella"
      },
      box2: {
        aboutMe: "About me",
        p1: "I'm a backend developer graduated in software engineering who currently resides in Maringá, Paraná, Brazil.",
        p2: "I started coding since teenagehood, and started working on IT oficially in 2022.",
        p3: "My main experiences involve Web Fullstack applications development, backend APIs development, external APIs integrations and among others.",
        cvDownload: "Download CV"
      },
    },
    technologies: {
      title: "Main Technologies"
    },
    projects: {
      title: "Main Projects",
      projectsButton: "Check all projects"
    },
    contact: {
      title: "Contact",
      myNetworks:{ title: "My Socials"},
      speakToMe: { 
        title: "Talk to Me",
        name: "Name",
        matter: "Matter",
        message: "Message",
        send: "Send"
      }
    }
  }   
  
  return texts; 
  }
}

export function generateTextProjects(language: string) {

  if(language == "pt-BR"){
    let texts = {
      ...global.ptPr,
      projects: {
        title: "Projetos"
      }
    }
    return texts
  }else {
   let texts = {
     ...global.enUs,
     projects: {
       title: "Projects"
     }
   }
   return texts
  }
}








