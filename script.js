const accessKey = "qadLwzOqqGdxeg2qJQBSS13KU-nQ8kevBH2BIbfahS8";
const SearchInput = document.getElementById("SearchInput");
const searchBtn = document.getElementById("searchBtn");
const container = document.querySelector(".container");

searchBtn.addEventListener("click", async () => {
  const query = SearchInput.value;
  if (query) {
    await showSearchResults(query);
  } else {
    await showRandomImages(10);
  }
});

//Random images

document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.querySelector(".loader");

  await showRandomImages(10);

  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});

const showRandomImages = async (count) => {
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  displayImages(data);
};

//ShowSearchResults
const showSearchResults = async (query) => {
  const apiUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  displayImages(data.results);
};

//domm
const displayImages = (images) => {
  const cardMain = document.querySelector(".cardMain");
  cardMain.innerHTML = ``;

  images.forEach((image) => {
    const cardHtml = `
    <div class="card col col-md-3" style="width: 20rem; height:100%">
      <a href="${image.urls.full}">
        <img src="${image.urls.small}" class="card-img-top" alt="...">
      </a>
      <span>${image.alt_description}</span>
    </div>`;
    cardMain.innerHTML += cardHtml;
  });
};

// Enter Input

SearchInput.addEventListener("keyup", async (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
