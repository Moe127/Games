import gameDetails from "./GameDetails.js";
import gameData from "./GameData.js";
import UI from "./UI.js";

let ui = new UI();
let gData = new gameData();
let gDetails = new gameDetails();

// implementation for a sticky nav
const nav = document.querySelector("nav");

// Get the offset position of the navbar
const sticky = nav.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove the sticky class when you leave the scroll position.
function myFunction() {
  if (window.scrollY >= sticky) {
    nav.classList.add("position-fixed");
    nav.classList.add("top-0");
    nav.classList.add("end-0");
    nav.classList.add("start-0");
    nav.style.zIndex = "2";
  } else {
    nav.classList.remove("position-fixed");
  }
}
// trigger myFunction when the window touch the navbar
window.addEventListener("scroll", myFunction);

async function game() {
  // getting the game data element
  const gameContainer = document.querySelector(".game-container");
  // getting the game details element
  const gameDetails = document.querySelector(".game-details");
  // getting the categories links
  const categories = document.querySelectorAll(".nav-link");

  // starting game catergory to be shown
  let category = "MMORPG";
  let gamesList = await gData.getDataByCategory(category);
  let gameInfo = await gDetails.getDataByCategory;
  if (gamesList) {
    ui.displayData(gamesList);
  }

  // adding active class to the current clicked button
  categories.forEach((category) => {
    category.addEventListener("click", async (e) => {
      categories.forEach((category) => {
        if (category.textContent !== e.target.textContent) {
          category.classList.remove("active");
        } else {
          category.classList.add("active");
        }
      });

      gamesList = await gData.getDataByCategory(category.textContent);
      if (gamesList) {
        ui.displayData(gamesList);
      }
    });
  });

  // hide game data and show game details when clicking on each game card and hiding game details when click close button
  document.addEventListener("click", async (e) => {
    const loader = document.querySelector(".loader");

    if (e.target.classList.contains("close")) {
      gameContainer.classList.replace("d-none", "d-block");
      gameDetails.classList.replace("d-block", "d-none");
    }
    if (e.target.closest("[data-id]").dataset.id) {
      gameInfo = await gDetails.getDetailsById(
        e.target.closest("[data-id]").dataset.id
      );
      if (gameInfo) {
        ui.displayGameDetails(gameInfo);
      }
      gameContainer.classList.replace("d-block", "d-none");
      gameDetails.classList.replace("d-none", "d-block");
    }
  });
}

game();
