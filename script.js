const API_KEY = "6d05c54d983b48309a5d3ad1162614d8";
const url = "https://newsapi.org/v2/everything?q";

window.addEventListener('load', () => fetchNews("Nepal"));
// when image is clicked home page is reloaded
function reload(){
    window.location.reload();

}

//The fetchNews function asynchronously fetches news data based on a given query, handles HTTP and News API errors, logs the data for debugging, and invokes a bindData.

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}=${query}&apiKey=${API_KEY}`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.status === "error") {
            console.error(`News API error - Code: ${data.code}, Message: ${data.message}`);
        } else {
            console.log(data);
            // Process the news data here
            bindData(data.articles);  // Move the function call here
        }
    } catch (error) {
        console.error("Error fetching news:", error.message);
    }
}

//bindData function with the articles for further processing, while catching and logging any errors that may occur during the process.

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
        // Perform other operations to populate the cards
    });
}

//The fillDataInCard function takes a cloned news card and an article, then fills in the card with the article's image, title, source, description, and adds a clickable link to the full article.

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("h3"); // corrected
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description; 

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} : ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
// when we click on games then the colorwill change to that games
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}
//search button will search the the news

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    //yelase chain agadi finance ma clicked bhaxa bhane hamile search bar ma kai science halim bahne finance bata tyo colored hatauxa
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
