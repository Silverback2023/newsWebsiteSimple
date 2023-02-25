const apiKey = "ec15354c02484e54a9536f4e53f0005a";

// Define an object containing all the news categories and their API endpoints
const newsCategories = {
  general: "top-headlines?country=us&category=general",
  business: "top-headlines?country=us&category=business",
  sports: "top-headlines?country=us&category=sports",
  technology: "top-headlines?country=us&category=technology",
  entertainment: "top-headlines?country=us&category=entertainment",
  health: "top-headlines?country=us&category=health",
};

// Define a function to fetch news data from the API and display it on the page
const getNewsData = async (category) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/${newsCategories[category]}&apiKey=${apiKey}`);
    const data = await response.json();
    const articles = data.articles;

    // Select the container div and clear any previous news content
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";

    // Loop through the articles and create a new tile for each one
    articles.forEach((article) => {
      const { title, author, description, urlToImage } = article;

      const newsTile = document.createElement("div");
      newsTile.classList.add("news-tile", "col-md-4", "mt-3");

      const image = document.createElement("img");
      image.src = urlToImage;
      image.alt = title;
      image.classList.add("news-tile-image");

      const titleElement = document.createElement("h3");
      titleElement.classList.add("news-tile-title");
      titleElement.textContent = title;

      const authorElement = document.createElement("p");
      authorElement.classList.add("news-tile-author");
      authorElement.textContent = `By ${author}`;

      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("news-tile-description");
      descriptionElement.textContent = description;

      // Append the tile to the news container div
      newsContainer.appendChild(newsTile);
      newsTile.appendChild(image);
      newsTile.appendChild(titleElement);
      newsTile.appendChild(authorElement);
      newsTile.appendChild(descriptionElement);
    });
  } catch (error) {
    console.log(error);
  }
};

// Define a function to handle category clicks and display the corresponding news
const handleCategoryClick = (event) => {
  const category = event.target.id;
  getNewsData(category);
};

// Add event listeners for category clicks
const categoryButtons = document.querySelectorAll(".nav-link");
categoryButtons.forEach((button) => {
  button.addEventListener("click", handleCategoryClick);
});

// Call the getNewsData function on page load to display the default news category
getNewsData("general");
