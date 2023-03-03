export default class gameDetails {
  // fetching the API by a certain id to get details about a game then passing the data to the displayGameDetails() to be shown
  async getDetailsById(id) {
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
      gameDetails.classList.replace("d-none", "d-block");
      loader.classList.replace("d-block", "d-none");
      return data;
    }
  }
}
