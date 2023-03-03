export default class gameData {
  async getDataByCategory(category) {
    const loader = document.querySelector(".loader");
    const gameContainer = document.querySelector(".game-container");
    loader.classList.replace("d-none", "d-block");
    gameContainer.classList.replace("d-block", "d-none");
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
      gameContainer.classList.replace("d-none", "d-block");
    }

    return data;
  }
}
