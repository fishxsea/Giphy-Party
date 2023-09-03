console.log("Let's get this party started!");

const addBtn = document.querySelector("#add-gif");
const clearBtn = document.querySelector("#clear-gifs");
class giphy {
  constructor(api, apiKey) {
    this.gifCollection = document.querySelector("#gifs");
    this.input = document.querySelector("#gif-input");
    this.api = api;
    this.apiKey = apiKey;

    // private method for random gif choice
    this.randomChoice = (results) => {
      return Math.floor(Math.random() * results.length);
    };
  }

  async addGif() {
    console.log(this.input.value);
    const res = await axios.get(this.api, {
      params: {
        q: this.input.value,
        api_key: this.apiKey,
      },
    });
    const returnedGifs = res.data.data;
    const gif = document.createElement("img");
    gif.classList.add("gif");

    gif.src = returnedGifs[this.randomChoice(returnedGifs)].images.original.url;
    console.log(gif);
    this.gifCollection.prepend(gif);
  }
  clearGifs() {
    this.gifCollection.innerHTML = "";
  }
}

const app = new giphy(
  "https://api.giphy.com/v1/gifs/search",
  "IE84SClJGPOWYx5b3PVTD6Mm4vG1LNx6"
);

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  app.addGif();
});

clearBtn.addEventListener("click", function (e) {
  e.preventDefault();
  app.clearGifs();
});
