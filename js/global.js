/* ceci est un commentaire js */
// console.log('toto');

// string 

let myVar = "ma variable";
myVar = "variable changée";

const myVar2 = "ma variable 2";

// console.log(myVar);

// boolean
let isTrue = true;
let isFalse = false;

// console.log(isFalse);

// chiffres et opérateurs

let chiffre1 = 4;
let chiffre2 = 3;

// console.log(typeof chiffre1, typeof chiffre2);

// template string, littéraux de gabarits et concat

let test = 'test ' + myVar + 'value';
let test2 = `test ${myVar} dzqdqzd `;

// console.log(test2);
/*
if (chiffre1 <= 3) {
  console.log('condition est valide');
} else if (chiffre1 <= 4) {
  console.log('je passe la');
} else {
  console.log('condition pas valide')
}
*/

// tableaux 

let array = ['item 1', 'item 2', 'item 3', 'item 4'];
// console.log(array[3]);

// objets

let obj = {
  title: 'Mon titre',
  description: 'Ma description'
}

// console.log(obj.title, obj.description);

// les boucles, while, for, foreach
/*
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

array.forEach(item => {
  console.log(item);
})

*/

// fonctions 

/*function myFunction(item, item2) {
  console.log(item, item2);
}*/

const myFunction = (item, item2) => {
  // console.log(item, item2);
}

myFunction('toto', 5);
myFunction('tata', 6);

const calcul = (nb1, nb2) => {
  return nb1 + nb1;
}

let result = calcul(4, 5);
// console.log(result);

// interagir avec le dom // methode, propriete, evement

// selectors
// let header = document.querySelector('.header');
// console.log(header);

// let grids = document.querySelectorAll('.grid');
/*
grids.forEach(grid => {
  grid.classList.add('titi');
  console.log(grid)
});
*/
// evenements les plus courants
/*
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM entièrement chargé et analysé");
});

header.addEventListener('click', (e) => {
  console.log(e);
});

header.addEventListener('mouseenter', (e) => {
  console.log('souris entre');
});*/

// insertion dom et navigation dans le dom

let div = document.createElement('div');
div.classList.add('top');
div.innerHTML = `<span>Top zone</span>`;
// console.log(header.nextElementSibling);

// fin de la théorie 

/* Menu mobile */

function menuMobile() {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
}

menuMobile();

/* Porfolio */

function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('.portfolio .card');

  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    })
  }

  const portfolioRow = (card) => card.closest('.portfolio-item') || card.parentNode;

  const showProjets = (elem) => {
    projets.forEach((projet) => {
      const row = portfolioRow(projet);
      const filter = projet.getAttribute('data-category');

      if (elem === 'all') {
        row.classList.remove('hide');
        return;
      }

      filter !== elem ? row.classList.add('hide') : row.classList.remove('hide');
    });
  };

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let filter = elem.getAttribute('data-filter');
      showProjets(filter)
      resetActiveLinks();
      elem.classList.add('active');
    });
  })
}

tabsFilters()

function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach((modal) => {
      modal.classList.remove('show');
    });
    document.body.style.overflow = '';
  };

  links.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      const modal = document.getElementById(elem.dataset.id);
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      hideModals();
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModals();
  });
}

showProjectDetails();

// Activer .animate-on-scroll (sinon le contenu reste à opacity: 0)
const revealIfVisible = (el) => {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (r.top < vh * 0.92 && r.bottom > 0) {
    el.classList.add('animated');
    return true;
  }
  return false;
};

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
  if (revealIfVisible(el)) return;
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );
  io.observe(el);
});

// Effets d'animation au scroll - Enhanced
const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');
  const services = document.querySelectorAll('.service');
  const cards = document.querySelectorAll('.card');
  const experienceItems = document.querySelectorAll('.experience-item');
  const formationItems = document.querySelectorAll('.formation-item');
  const header = document.querySelector('.header');

  const skipSectionFade = new Set(['about', 'cv', 'cv-strip']);

  // Animation des sections (évite de masquer #about / #cv : contenu restait invisible)
  sections.forEach((section, index) => {
    if (index === 0) return;
    if (section.id && skipSectionFade.has(section.id)) return;
    section.style.opacity = "0";
    section.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    section.style.transform = "translateY(50px)";
  });

  // Animation des compétences
  skills.forEach((elem) => {
    elem.style.width = "0";
    elem.style.transition = "width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  });

  // Animation des services
  services.forEach((service, index) => {
    service.style.opacity = "0";
    service.style.transform = "translateY(30px)";
    service.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
  });

  // Animation des cartes portfolio
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.9) translateY(30px)";
    card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
  });

  // Animation des items expérience et formation
  [...experienceItems, ...formationItems].forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
  });

  // Observer pour les sections
  let sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = "1";
        elem.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Observer pour les services
  let serviceObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  services.forEach(service => {
    serviceObserver.observe(service);
  });

  // Observer pour les cartes
  let cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "scale(1) translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    cardObserver.observe(card);
  });

  // Observer pour les compétences
  let skillsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.width = elem.dataset.width + '%';
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });

  // Observer pour expérience et formation
  let itemObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  }, { threshold: 0.2 });

  [...experienceItems, ...formationItems].forEach(item => {
    itemObserver.observe(item);
  });

  // Effet de scroll sur le header
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

observerIntersectionAnimation();

// Animation au survol des cartes portfolio
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Animation des titres de section
document.querySelectorAll('.section-title').forEach(title => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        title.style.animation = 'fadeInUp 0.8s ease-out';
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(title);
});

// Léger fade du hero au scroll (sans transform sur la section, pour préserver le layout)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.opacity = String(Math.max(0.55, 1 - (scrolled / hero.offsetHeight) * 0.45));
  } else if (hero) {
    hero.style.opacity = '1';
  }
});

// Animation des boutons au chargement
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn, .portfolio-filters a');
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    }, 300);
  });
});


