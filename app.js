const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function displayPosts(data) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  data.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

document.getElementById("search").addEventListener("input", async (event) => {
  const searchText = event.target.value.toLowerCase();
  const posts = await fetchPosts();
  displayPosts(posts.filter((post) => post.title.toLowerCase().includes(searchText)));
});

document.getElementById("posts-container").addEventListener("click", (event) => {
  if (event.target.tagName === "H3") {
    alert(
      `Post Title: ${event.target.textContent}\nPost Body: ${event.target.parentElement.querySelector("p").textContent}`
    );
  }
});