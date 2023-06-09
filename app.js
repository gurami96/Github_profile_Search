const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


async function getuser(username) {
    try {
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('No user found with this Username')
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos')
        addReposToCard(data)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('Problem fetching')
        }
    }
}


function createUserCard(user) {
    const cardHTML = `
    <div class="card">
         <div>
             <img src="${user.avatar_url}" 
             alt="" class="avatar">
         </div>
         <div class="user-info">
             <h2>${user.name}</h2>
            <p>${user.bio}</p>
             <ul>
                 <li>${user.followers} <strong>Followers</strong></li>
                 <li>${user.following} <strong>Following</strong></li>
                 <li>${user.public_repos} <strong>REpos</strong></li>
             </ul>
             <div id="repos"></div>
         </div>
     </div>
     `
    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardHTML = `
      <dic class="card">
      <h1>${msg}</h1>
      </div>
      
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .forEach(repo => {
            const repoEL = document.createElement('a')
            repoEL.classList.add('repo')
            repoEL.href = repo.html_url
            repoEL.target = '_blank'
            repoEL.innerText = repo.name

            reposEl.appendChild(repoEL)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value
    if (user) {
        getuser(user)

        search.value = ''
    }

})