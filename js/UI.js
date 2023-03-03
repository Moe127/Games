export default class UI {
  displayData(data) {
    let carton = ``;
    for (let i = 0; i < data.length; i++) {
      carton += `  
    <div class="col-md-3">
    <div class="game-card border border-dark shadow card h-100  bg-transparent" role="button" data-id="${data[i].id}">
    <div class="card-body" data-id="${data[i].id}">
    <img src="${data[i].thumbnail}" class="card-img-top list-img" alt="${data[i].title}">
    <div class="hstack justify-content-between my-3">
       <h6 class="text-white small d-inline game-title">${data[i].title}</h6>
       <span class="badge text-bg-primary p-2 free-badge">free</span>
       </div>
          <p class=" card-text text-muted text-center game-description">
               ${data[i].short_description}
           </p>
    </div>
         <div class=" card-footer  tags d-flex justify-content-between" data-id="${data[i].id}">
              <span class="badge text-bg-dark">${data[i].genre}</span>
               <span class="badge text-bg-dark">${data[i].platform}</span >
            </div>
  </div>
  </div>
  `;
    }

    document.querySelector(".game-list").innerHTML = carton;
  }

  displayGameDetails(data) {
    let carton = ``;

    carton = `<div class="col-md-4">
            <img src="${data.thumbnail}" alt="" />
          </div>
          <div class="col-md-8">
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
              <p class="game-details-desc">
              ${data.description}
              </p>
              <a class="btn btn-outline-warning mb-5" href="${data.game_url}" target="_blank">Show Game</a>
            </div>
          </div>`;

    document.querySelector(".game-details-carton").innerHTML = carton;
  }
}
