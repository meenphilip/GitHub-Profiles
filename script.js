const APIURL = "https://api.github.com/users/";

const profile = document.getElementById("profile");
const form = document.getElementById("form");
const input = document.getElementById("search");

// GET USRES
async function getUser(username) {
  try {
    const res = await fetch(APIURL + username);
    const data = await res.json();

    // pass user data
    createUserProfile(data);
    // get repos
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No profile with this username");
    }
  }
}

// GET USRES REPOS
async function getRepos(username) {
  try {
    const res = await fetch(APIURL + username + "/repos?sort=created");
    const data = await res.json();

    addReposToCard(data);
  } catch (err) {
    createErrorCard("Problem fetching user details");
  }
}

function createUserProfile(user) {
  const UserProfileCard = `
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3 text-center">
              <img
                class="img-fluid border border-primary rounded-circle mb-3"
                src="${user.avatar_url}"
              />
              <p>${user.name}</p>
              <a
                href="${user.html_url}"
                target="_blank"
                class="btn btn-primary w-100 rounded-pill mb-4"
                >View Profile</a
              >
            </div>
            <div class="col-md-9 p-3">
              <div class="shadow-sm p-3 bg-body rounded">
                <span class="badge text-bg-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge text-bg-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge text-bg-success">Followers: ${user.followers}</span>
                <span class="badge text-bg-info">Following: ${user.following}</span>
              </div>

              <p class="lead mt-3 shadow-sm p-3 bg-body rounded">${user.bio}</p>

              <div id="repos" class="shadow-sm p-3 bg-body rounded mb-2" >
              <h3  class="fs-4 mb-3">Latest Repos</h3>
              </div> 

              </div>
            </div>
          </div>
  `;
  profile.innerHTML = UserProfileCard;
}
// Error card
function createErrorCard(msg) {
  const cardHTML = `
    <div class="bg-dark text-danger text-center fw-bold display-5">
    <h1>${msg}</h1>
    </div>
  `;
  profile.innerHTML = cardHTML;
}

// Add repos
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  // loop throu repos
  repos.slice(0, 5).forEach((repo) => {
    // create a link
    const repoEl = document.createElement("a");
    // add css classes
    repoEl.className += "btn btn-outline-primary btn-sm rounded-pill m-2";
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

// Add submit Event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = input.value;

  //get username type in
  if (user) {
    getUser(user);
    //clear after submit
    search.value = "";
  }
});
