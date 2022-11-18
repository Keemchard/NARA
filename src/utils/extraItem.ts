import extraModel from "../Types/extraItemsModel";

const extraItems: extraModel[] = [
  {
    id: Math.random(),
    title: "C19",
    short_description:
      "It is a web app that allows the user to view the number of Covid19 infected, recovered, and other cases in a specific county.",
    link: "https://c19data-kc.netlify.app/",
  },
  {
    id: Math.random(),
    title: "Pokedex",
    short_description:
      "It is a web application that allows the user to search for all pokemons and view their images, as well as their types and abilities.",
    link: "https://pokedex-kc.netlify.app/",
  },
  {
    id: Math.random(),
    title: "Librong Bulate [Beta]",
    short_description: "A web app for book worms",
    link: "https://librong-bulate-kc.netlify.app/",
  },
];

export default extraItems;
