const nav = document.querySelector("nav");

// Get the offset position of the navbar
const sticky = nav.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove the sticky class when you leave the scroll position.
function myFunction() {
  if (window.scrollY >= sticky) {
    console.log("trus");
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
  const gameData = document.querySelector(".game-data");
  // getting the game details element
  const gameDetails = document.querySelector(".game-details");
  // getting the categories links
  const categories = document.querySelectorAll(".nav-link");
  // starting game catergory to be shown
  let category = "MMORPG";
  await getDataByCategory(category);

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

      let data = await getDataByCategory(category.textContent);
    });
  });
  // hide game data and show game details when clicking on each game card and hiding game details when click close button
  document.addEventListener("click", async (e) => {
    if (e.target.dataset.id) {
      getDetailsById(e.target.dataset.id);
      gameData.classList.replace("d-block", "d-none");
      gameDetails.classList.replace("d-none", "d-block");
    }
    if (e.target.classList.contains("close")) {
      let currentCategory = document.querySelector(".active").textContent;
      gameData.classList.replace("d-none", "d-block");
      gameDetails.classList.replace("d-block", "d-none");
      getDataByCategory(currentCategory);
    }
  });
}

// display the a list of game by a certain category
function displayData(data) {
  let carton = ``;
  for (let i = 0; i < data.length; i++) {
    carton += `  
    <div class="col-md-3">
    <div class="game-card border border-dark shadow card h-100  bg-transparent" role="button" data-id="${data[i].id}">
    <div class="card-body" data-id="${data[i].id}">
    <img src="${data[i].thumbnail}" class="card-img-top list-img" alt="${data[i].title}" data-id="${data[i].id}">
    <div class="hstack justify-content-between my-4" data-id="${data[i].id}">
       <h6 class="text-white small d-inline game-title">${data[i].title}</h6>
       <span class="badge text-bg-primary p-2 free-badge">free</span data-id="${data[i].id}">
       </div>
          <p class=" card-text text-muted text-center fs-6" data-id="${data[i].id}">
               ${data[i].short_description}
           </p>
    </div>
         <div class=" card-footer  tags d-flex justify-content-between" data-id="${data[i].id}">
              <span class="badge text-bg-dark" data-id="${data[i].id}">${data[i].genre}</span>
               <span class="badge text-bg-dark" data-id="${data[i].id}">${data[i].platform}</span >
            </div>
  </div>
  </div>
  `;
  }

  document.querySelector(".game-list").innerHTML = carton;
}

// fetching the API by a certain category then passing the data to the displayData() to be shown
async function getDataByCategory(category) {
  const loader = document.querySelector(".loader");
  const gameData = document.querySelector(".game-data");
  loader.classList.replace("d-none", "d-block");
  gameData.classList.replace("d-block", "d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b054e8d86amsh4a2397ede8c5812p1f8e77jsnd6e2c79057af",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let res = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options
  );
  let data = await res.json();
  if (data) {
    loader.classList.replace("d-block", "d-none");
    gameData.classList.replace("d-none", "d-block");
  }

  displayData(data);
}

// fetching the API by a certain id to get details about a game then passing the data to the displayGameDetails() to be shown
async function getDetailsById(id) {
  const gameDetails = document.querySelector(".game-details");
  const loader = document.querySelector(".loader");

  loader.classList.replace("d-none", "d-block");
  gameDetails.classList.replace("d-block", "d-none");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b054e8d86amsh4a2397ede8c5812p1f8e77jsnd6e2c79057af",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let res = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  let data = await res.json();
  if (data) {
    loader.classList.replace("d-block", "d-none");
    gameDetails.classList.replace("d-none", "d-block");
  }
  displayGameDetails(data);
}

// display the a list of game by id
function displayGameDetails(data) {
  let carton = ``;

  carton = `<div class="col-md-4">
            <img src="${data.thumbnail}" alt="" />
          </div>
          <div class="col-md-6">
            <div class="game-details-content">
              <h3>Title:${data.title}</h3>
              <p>
                Category:
                <span class="badge bg-danger">${data.genre}</span>
              </p>
              <p>
                Platform:
                <span class="badge bg-danger">${data.platform}</span>
              </p>
              <p>
                Status:
                <span class="badge bg-danger">${data.status}</span>
              </p>
              <p>
              ${data.description}
              </p>
              <a class="btn btn-outline-warning mb-5" href="${data.game_url}" target="_blank">Show Game</a>
            </div>
          </div>`;

  console.log(carton);
  document.querySelector(".game-details-carton").innerHTML = carton;
}

game();
