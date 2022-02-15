var shows = [];

var ul = document.getElementById("showslist");

var confirmbutton = document.getElementById("confirm");
confirmbutton.addEventListener("click", function () { addNewShowStorage(); });
// var searchbutton = document.getElementById('searchbutton');
// searchbutton.addEventListener("click", function () { search(); });
var input = document.getElementById('search');
input.addEventListener("input", function () { search(); });

chrome.storage.sync.get(['shows'], function (result) {
  shows = result.shows;
  for (var i = 0; i < shows.length; i++) {
    var show = shows[i];
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(show.Name + " | S" + show.Season + "E" + show.Episode));
    ul.appendChild(li);
  }
});


function addNewShowStorage()
{
  var showname = document.getElementById("showname").value;
  var seasonnumber = document.getElementById("seasonnumber").value;
  var episodenumber = document.getElementById("episodenumber").value;
  var newShow = {
    "Name": showname,
    "Season": seasonnumber,
    "Episode": episodenumber
  };
  if (showname != "")
  {
    shows.push(newShow);
  }
  
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(newShow.Name + " |   S" + newShow.Season + "E" + newShow.Episode));
  ul.appendChild(li);
  chrome.storage.sync.set({ "shows": shows });
  // console.log(shows);
}

function editShow(showname,seasonnumber,episodenumber)
{
  var index = shows.findIndex(function (shows) {
    return shows.Name === showname;
  });

  if (index == -1)
  {
    alert('The show you\'re trying to edit does not exist');
  }
  else {
    shows[index].Season = seasonnumber;
    shows[index].Episode = episodenumber;
    chrome.storage.sync.set({ "shows": shows });
  }
}

function search() {
  var filter = input.value.toUpperCase();
  var li = document.getElementsByTagName("li");
  // Loop through all list items, and hide those that don't match the search query
  for (i = 0; i < li.length; i++) {
    var txtValue = li[i].innerHTML;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// removes whitespaces -> string.replace(/\s/g, '');