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
    // console.log(dataRepo);
    createUserCard(data,dataRepo);
    addReposToCard(dataRepo);
}

function createUserCard(data,dataRepo) { 
   const wrapperEl = document.querySelector(".wrapper");
   createCard.className = "userCard";
   wrapperEl.appendChild(createCard);
    createCard.innerHTML = data.name;
    // console.log(data);
   let getRepos =  addReposToCard(dataRepo);
    getRepos.forEach(repo => {
        const repoEl = document.createElement("span");
        repoEl.classList.add("repo");
        repoEl.innerHTML = repo.name;
        createCard.appendChild(repoEl);
    }) 
}

function addReposToCard(dataRepo) {
    const addRepo =  dataRepo.filter((repo,index)=> index<5)
    return addRepo;
}
