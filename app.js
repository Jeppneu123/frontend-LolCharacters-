// ====== CONFIG & GLOBAL VARS ====== //
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3333" : serverUrl;

// === READ (GET) === //
// get all posts
function getPostsLolCharacters() {
    fetch(endpoint + "/legends")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            appendPostsLolCharacters(data)
            createPostLolCharacters ()
            deletePostLolCharacters()
        });
}

// appends posts to the DOM
function appendPostsLolCharacters(postList) {
    console.log(postList)
    let html = "";

    for (let index = 0; index < postList.length; index++) {
        const post = postList[index];

        html += /*html*/ `
            <article>
               <img src="${post.image}">
               <h2>${post.title}</h2>
               <p>${post.body}</p>
               <div class="btns" ">
                   <button onclick="deletePostLolCharacters('${post.id}')"> Delete </button>
               </div> 
            </article>
        `;
    }
    document.querySelector("#posts-grid").innerHTML = html;
}

function createPostLolCharacters (event)
{
    const post =
        {
            title: event.target.title.value,
            body: event.target.body.value,
            image: event.target.url.value
        };

    fetch ( endpoint + "/legends", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {"Content-type": "application/json"}
    }).then(function(){
        getPostsLolCharacters()
    })
}

function deletePostLolCharacters (id)
{
    fetch(endpoint + "/legends/" + id,{method : "DELETE"}).then(function()
    {
        getPostsLolCharacters();
    });
}

// === INITIALIZE APP === //
getPostsLolCharacters();
// ====== INITIALIZE APP END ====== //