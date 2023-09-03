const addBtn = document.querySelector("#add-gif");
const clearBtn = document.querySelector("#clear-gifs");
const title = document.querySelector("h1");

class giphy {
  constructor(api, apiKey) {
    this.body = document.querySelector("body");
    this.gifCollection = document.querySelector("#gifs");
    this.input = document.querySelector("#gif-input");
    this.gif = document.querySelector(".gif");
    this.api = api;
    this.apiKey = apiKey;

    // private method for random gif choice
    this.randomChoice = function (results) {
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
    this.gifCollection.prepend(gif);
  }

  clearGifs() {
    this.gifCollection.innerHTML = "";
  }

  // adds colorchanging background
  party() {
    const colors = [
      "red",
      "blue",
      "yellow",
      "purple",
      "green",
      "teal",
      "black",
      "orange",
    ];

    let interval = setInterval(() => {
      const color = colors[this.randomChoice(colors)];
      this.body.style.backgroundImage = `none`;
      this.body.style.backgroundColor = color;
    }, 250);

    setTimeout(() => {
      this.body.style.backgroundImage =
        "linear-gradient(var(--background-color2), var(--background-color)";
      clearInterval(interval);
    }, 10000);
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

title.addEventListener("click", function () {
  if (app.input.value === "party") {
    app.party();
  }
});
