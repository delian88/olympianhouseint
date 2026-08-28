import teamImageOne from "../assets/images/Gallery/gallery-09.jpeg";
import teamImageTwo from "../assets/images/HeroImg/hero2.jpeg";
import teamImageThree from "../assets/images/Gallery/gallery-12.jpeg";
import teamImageFour from "../assets/images/Gallery/gallery-11.jpeg";

export const teamMembers = [
  { name: "Oliver Mbuya Litondo", title: "President", image: teamImageOne, slug: "oliver-mbuya-litondo" },
  { name: "Balbasie N. Mandisha", title: "Director, Co-Founder", image: teamImageTwo, slug: "balbasie-n-mandisha" },
  { name: "Benjamin Ubiri", title: "Regional Director, West Africa", image: teamImageThree, slug: "benjamin-ubiri" },
  { name: "Carreso Cota Amyta", title: "Regional Director, Southern Africa", image: teamImageFour, slug: "carreso-cota-amyta" },
  { name: "Fombako Banke N", title: "Regional Director, Central Africa", image: teamImageOne, slug: "fombako-banke-n" },
  { name: "Francis Etuk", title: "Consultant (Audit/Report)", image: teamImageTwo, slug: "francis-etuk" },
  { name: "Aizez Oowng Faborau", title: "Director, Growth and Opportunities", image: teamImageThree, slug: "aizez-oowng-faborau" },
  { name: "Kalu Onuka", title: "Accountant", image: teamImageFour, slug: "kalu-onuka" },
  { name: "James Kamaaka", title: "Content Communications Officer", image: teamImageOne, slug: "james-kamaaka" },
];

export const boardMembers = [
  { name: "Oliver Mbuya Litondo", title: "Chair", image: teamImageOne, slug: "oliver-mbuya-litondo-board" },
  { name: "Ngalame N. Mandisha", title: "Vice Chair", image: teamImageTwo, slug: "ngalame-n-mandisha" },
  { name: "Koretawe Vandeveer", title: "Board Member", image: teamImageThree, slug: "koretawe-vandeveer" },
  { name: "Afomefusi Omusu Obi", title: "Director, Steubing", image: teamImageFour, slug: "afomefusi-omusu-obi" },
  { name: "Afidem T. Mundanga", title: "Director, Programmes", image: teamImageOne, slug: "afidem-t-mundanga" },
  { name: "Nipra Smith", title: "Board Member", image: teamImageTwo, slug: "nipra-smith" },
  { name: "Torey Des Rosemarind", title: "Director, Advocacy", image: teamImageThree, slug: "torey-des-rosemarind" },
  { name: "Dr. Prince Amujie", title: "Board Member", image: teamImageFour, slug: "dr-prince-amujie" },
];

export const allMembers = [...teamMembers, ...boardMembers];
