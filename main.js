// Github Profile Username & Repositories
let GithubUser = "ourouimed"
document.querySelector("title").innerHTML = `Github Profile - ${GithubUser}`
let ProfileApi = `https://api.github.com/users/${GithubUser}`
let ReposApi = `https://api.github.com/users/${GithubUser}/repos`

// Profile Card
let GithubCard = document.querySelector(".github-card")
let Repositories = document.querySelector(".github-repos .repos-grid")

// Fetch Github Profile Data 
fetch(ProfileApi)
.then(response => response.json())
.then(data =>{
    if(data.login != undefined){
        GithubCard.innerHTML = `
        <img  class="profile-img" src="${data.avatar_url}">
        <h3 class="name">${data.name}</h3>
        <p class="username">${data.login}</p>
        <p class="bio">${data.bio}</p>
        <ul class="subscribers-count">
            <li>
                <span>${data.followers}</span>
                <a href="https://github.com/${data.login}?tab=followers">followers</a>
            </li>
            <li>
                <span>${data.following}</span>
                <a href="https://github.com/${data.login}?tab=following">following</a>
            </li>
            <li>
                <span>${data.public_repos}</span>
                <a href="https://github.com/${data.login}?tab=repositories">repos</a>
            </li>
        </ul>
        <a class="userlink" href="${data.html_url}" target="_blanl">See on Github<i class="fa-brands fa-github"></i></a>
        <ul class="profile-links">
            <li>
                <a href="${data.blog}" target="_blank">
                    <i class="fa-solid fa-link"></i>
                    ${data.blog}
                </a>
            </li>
            <li>
                <a href="" target="_blank">
                    <i class="fa-solid fa-location-dot"></i>
                    ${data.location}
                </a>
            </li>
        </ul>
    `
    }
    else {
        GithubCard.innerHTML = `
        <div class="error-msg">
            <h3>Error!! Something went wrong</h3>
            <p>Unvalid Username : ${GithubUser} Not found<br>
            please Check Github user on main.js file & enter a valid Username </p>
        </div>
        `
    }
}).catch(error => {
    console.error(error)
    GithubCard.innerHTML = `
        <div class="error-msg">
            <h3>Error!! Something went wrong</h3>
            <p>${error}</p>
        </div>`
})


// Fetch Github Repositories Data 
fetch(ReposApi).then(response => response.json())
.then(repos =>{
    repos.forEach(repo =>{
        let repoEl = document.createElement("div")
        repoEl.className = "repo"
        repoEl.innerHTML =`
            <div class="repo-header">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <span>${repo.visibility}</span>
            </div>
            <p>
            ${repo.description != null ? repo.description : ""}
            </p>
            <div class="repo-footer">
                <ul>
                    <li>
                        <a href="${repo.languages_url}" target="_blank"><i class="fa-solid fa-code"></i> ${repo.language}</a>
                        
                    </li>
                    <li>
                        <a href="https://github.com/${repo.full_name}/stargazers" target="_blank"><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</a>
                    </li>
                    <li>
                        <a href="https://github.com/${repo.full_name}/forks" target="_blank"><i class="fa-solid fa-code-fork"></i> ${repo.forks}</a>
                    </li>
                    <li>
                        <a href="https://github.com/${repo.full_name}/watchers"><i class="fa-solid fa-eye"></i> ${repo.watchers}
                    </li>
                </ul>
            </div>
        `
        Repositories.append(repoEl)
    })
})