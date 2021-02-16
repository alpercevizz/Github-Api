const GITHUB_API = "https://api.github.com/users"
const formEl = document.querySelector(".form");
const createCard = document.createElement("div");

formEl.addEventListener("submit", (e) => {
    const inputEl = document.querySelector(".input");
    e.preventDefault();
    const inputValue = inputEl.value;
    console.log(inputValue);
    userApi(inputValue);
    createCard.innerHTML = "";

})

async function userApi(value) {
    const response =  await fetch(`${GITHUB_API}/${value}`);
    const responseRepo = await fetch(`${GITHUB_API}/${value}/repos?sort=created`);
    const data = await response.json()
    const dataRepo = await responseRepo.json();
    createUserCard(data,dataRepo);
    addReposToCard(dataRepo);
}

function createUserCard(data,dataRepo) { 
    const wrapperEl = document.querySelector(".wrapper")

    const createCardEl = `
    <div class = "card input">
        <div class="card-body">
            <img src = "${data.avatar_url}"/>
            <div class = "card-info">
                <h4 class = "card-name">${data.name}</h4>
                <p class = "card-bio">${data.bio}</p>
                <div class = "card-userInfos">
                    <span>${data.followers} <b>Followers</b></span>
                    <span>${data.following} <b>Following</b></span>
                    <span>${data.public_repos} <b>Repos</b></span>
                </div>
                <div class="user-repos">
                    ${renderLink(dataRepo)}
                </div>
            </div>


        </div>
    
    </div>
    `
    wrapperEl.innerHTML += createCardEl;
}

function renderLink(dataRepo) {
   return addReposToCard(dataRepo).map((repo) => {
        return `<a href="${repo.html_url}" class = "card-link">${repo.name}</a>`;

    })
        
}


function addReposToCard(dataRepo) {
    const addRepo =  dataRepo.filter((repo,index)=> index<5)
    return addRepo;
}
