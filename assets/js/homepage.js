var repoContainerEl = document.querySelector("#repos-container"); //list of repo searches

var repoSearchTerm = document.querySelector("#repo-search-term"); //search term

var languageButtonsEl = document.querySelector("#language-buttons");

var buttonClickHandler = function(event){
    var language = event.target.getAttribute("data-language");
    if(language){
        getFeaturedRepos(language);

        //clear old content
        repoContainerEl.textContent="";
    }

}

var getFeaturedRepos = function(language){
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayRepos(data.items, language); //display all language items
            });
        } else {
            alert("Error: Github user not found");
        }
    });
};



var displayRepos = function(repos, searchTerm){
    //check if api returned any repos
    if (repos.length === 0){
        repoContainerEl.textContent = "No repositories found";
        return;
    }
    
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i=0; i<repos.length; i++){
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name; //each repo

        //create link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName); //link every container to single-repo page

        //create span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName; //span text content is the formatted repo name

        //append to container
        repoEl.appendChild(titleEl); //put the span element with repo name in div container

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0){ //if there are repo issues
            statusEl.innerHTML=
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML="<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append status to div container
        repoEl.appendChild(statusEl);

        //append div container to the repo list
        repoContainerEl.appendChild(repoEl); //put div container at the end of list of repo searches
    }
};

var getUserRepos = function(user){
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    //make a request to the url
    fetch(apiUrl)
        .then(function(response){
            //request was successful
            if (response.ok){
                response.json().then(function(data){
                    displayRepos(data, user);
                });
            } else{
                alert("Error: Github User Not Found");
            }
        })
        .catch(function(error){
            //catch network error for retreiving user data
            alert("Unable to connect to Github");
        });
};


var userFormEl = document.querySelector("#user-form");//whole form with input + button
var nameInputEl = document.querySelector("#username"); //input

var formSubmitHandler = function(event){
    event.preventDefault();
    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = ""; //reset value of username input in search bar
    } else {
        alert("Please enter a GitHub username");
     }
};

userFormEl.addEventListener("submit", formSubmitHandler); //when submit is clicked on whole form, have formSubmitHandler go off

languageButtonsEl.addEventListener("click", buttonClickHandler);