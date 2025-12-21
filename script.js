let posts = JSON.parse(localStorage.getItem("posts")) || [];

function displayPosts() {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        let tagsHTML = post.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join("");

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <div class="tags">${tagsHTML}</div>
            <p>${post.content}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        postDiv.querySelector(".edit-btn").onclick = () => editPost(index);
        postDiv.querySelector(".delete-btn").onclick = () => deletePost(index);

        postsDiv.appendChild(postDiv);
    });
}

function addPost() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const category = document.getElementById("category").value.trim();

    if (!title || !content) {
        alert("Title and content are required.");
        return;
    }

    const tags = category
        ? category.split(",").map(tag => tag.trim())
        : [];

    posts.unshift({ title, content, tags });
    savePosts();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("category").value = "";

    displayPosts();
}

function deletePost(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        posts.splice(index, 1);
        savePosts();
        displayPosts();
    }
}

function editPost(index) {
    const newTitle = prompt("Edit title:", posts[index].title);
    const newContent = prompt("Edit content:", posts[index].content);
    const newTags = prompt(
        "Edit tags (comma separated):",
        posts[index].tags.join(", ")
    );

    if (newTitle && newContent) {
        posts[index] = {
            title: newTitle,
            content: newContent,
            tags: newTags
                ? newTags.split(",").map(t => t.trim())
                : []
        };
        savePosts();
        displayPosts();
    }
}

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

displayPosts();
