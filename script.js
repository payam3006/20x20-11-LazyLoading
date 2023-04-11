q = console.log;

let items = [];
let page = 1;

const loadingImg = document.getElementById("loading");
const body = document.getElementsByTagName("body")[0];
const input = document.getElementsByTagName("input")[0];
const posts = document.getElementById("posts");

function setItems(items) {
  items.forEach((element) => {
    posts.innerHTML += `<div id="${element.id}" class="item">
    <div class="itemNum">${element.id}</div>
    <div class="content">
        <h3>${element.title}</h3>
        <p>${element.body}</p>
    </div>
</div>`;
    // q(element);
  });
}

loadingImg.classList.add("show");

fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
  .then((response) => response.json())
  .then(function get(json) {
    items = [...items, ...json];
    setItems(items);
    loadingImg.classList.remove("show");

    // q(body.offsetHeight);
    // q(loadingImg.getBoundingClientRect().top);
    // q(window.innerHeight);

    // q(items);
  });

function getNewItems() {
  loadingImg.classList.remove("show");
  setTimeout(function set() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
      .then((response) => response.json())
      .then(function get(json) {
        items = [...items, ...json];
        setItems(json);
        window.addEventListener("scroll", loadIfNeeded);
        search();
        q(items);
      });
  }, 800);
}

function loadIfNeeded() {
  if (
    loadingImg.getBoundingClientRect().top <= window.innerHeight &&
    page != 20
  ) {
    window.removeEventListener("scroll", loadIfNeeded);

    loadingImg.classList.add("show");
    page += 1;
    setTimeout(getNewItems, 2000);
  }
}

window.addEventListener("scroll", loadIfNeeded);

// let hiddenList = [];

function search() {
  if (input.value.length >= 2) {
    // hiddenList.forEach(function show(elemId) {
    //   document.getElementById(`${elemId}`).classList.remove("hidden");
    // });
    hiddenList = [];

    Array.from(document.getElementsByClassName("hidden")).forEach(function show(
      item
    ) {
      //   q(item.id);
      document.getElementById(`${item.id}`).classList.remove("hidden");
    });

    items
      .filter(function ifExistInTitle(item) {
        return (
          !item.title.includes(input.value) && !item.body.includes(input.value)
        );
      })
      .forEach(function hidden(item) {
        // q(item);
        document.getElementById(`${item.id}`).classList.add("hidden");
        hiddenList.push(item.id);
      });

    // q(items);
    // q(input.value);
  } else {
    // hiddenList.forEach(function show(elemId) {
    //   document.getElementById(`${elemId}`).classList.remove("hidden");
    // });
    // hiddenList = [];

    Array.from(document.getElementsByClassName("hidden")).forEach(function show(
      item
    ) {
      //   q(item.id);
      document.getElementById(`${item.id}`).classList.remove("hidden");
    });
  }
}

input.addEventListener("input", search);
