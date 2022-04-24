var repoContainerEl = document.querySelector("#repos-container"); //list of repo searches

var repoSearchTerm = document.querySelector("#repo-search-term"); //search term

var displayRepos = function(repos, searchTerm){
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i=0; i<repos.length; i++){
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name; //each repo

        //create div container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName; //span text content is the formatted repo name

        //append to container
        repoEl.appendChild(titleEl); //put the span element with repo name in div container

        //append container to the dorm
        repoContainerEl.appendChild(repoEl); //put div container at the end of list of repo searches
    }
};

var getUserRepos = function(user){
    //format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            displayRepos(data, user);
        });
    });
};


var userFormEl = document.querySelector("#user-form");//whole form with input + button
var nameInputEl = document.querySelector("#username"); //input

var formSubmitHandler = function(event){
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

