const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandom() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apiKey}`;
        const response = await fetch(apiUrl);

        //convert data into json format
        const data = await response.json();

        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error)
        return [];
    }
}

//on search-button click search
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
})
//based on query the data fetch function
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`;
        const response = await fetch(apiUrl);

        //convert data into json format
        const data = await response.json();

        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error)
        return [];
    }
}

//to display the data
function displayBlogs(articles) {
    blogContainer.innerHTML = ""
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        //imgae fetch data
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        // Title fetch data
        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30
            ? article.title.slice(0, 30) + "...."
            : article.title || "";
        title.textContent = truncatedTitle;

        // Description fetch data
        const description = document.createElement("p");
        const truncatedDescription = article.description && article.description.length > 120
            ? article.description.slice(0, 100) + "...."
            : article.description || "";
        description.textContent = truncatedDescription;


        //create img, title, description and add into the blogCard div
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        //add click on div to open the article on another page
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        })

        // created blogCard div add in the blogContainer div
        blogContainer.appendChild(blogCard);
    })
}

(async () => {
    try {
        const articles = await fetchRandom();
        displayBlogs(articles)
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();