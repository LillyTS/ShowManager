let shows = [];
let lastid = -1;

let ul = document.getElementById("showslist");

let confirmbutton = document.getElementById("confirm");
confirmbutton.addEventListener("click", function () { addNewShowStorage(); });
// let searchbutton = document.getElementById('searchbutton');
// searchbutton.addEventListener("click", function () { search(); });
let input = document.getElementById('search');
input.addEventListener("input", function () { search(); });

chrome.storage.sync.get(['lastid','shows'], function (result) {
  shows = result.shows;
  lastid = result.lastid ?? -1;
  if (shows != undefined && shows.length > 0) {
    for (let i = 0; i < shows.length; i++) {

      let show = shows[i];
      let li = document.createElement('li');
      li.setAttribute("id",show.id);

      let editButton = document.createElement('input');
      editButton.type = "image";
      editButton.src = "pen-to-square-solid.svg";
      editButton.style = "width: 17px; height: 17px;";
      editButton.onclick = () => editShow(li); 

      let deleteButton = document.createElement('input');
      deleteButton.type = "image";
      deleteButton.src = "trash-can-solid.svg";
      deleteButton.style = "width: 17px; height: 17px;";
      deleteButton.onclick = () => deleteShow(li); 

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      li.appendChild(document.createTextNode(show.Name + " | S" + show.Season + "E" + show.Episode));
      ul.appendChild(li);
    }
  }
});


function addNewShowStorage()
{
  let showname = document.getElementById("showname").value;
  let seasonnumber = document.getElementById("seasonnumber").value;
  let episodenumber = document.getElementById("episodenumber").value;
  let id = lastid + 1; 
  let newShow = {
    "id": id,
    "Name": showname,
    "Season": seasonnumber,
    "Episode": episodenumber
  };
  if (showname != "")
  {
    if (shows == undefined) {
      shows = [];
    }
    shows.push(newShow);
  }

  let li = document.createElement('li');

  li.setAttribute("id", id);

  let editButton = document.createElement('input');
  editButton.setAttribute("type", "image");
  editButton.src = "pen-to-square-solid.svg";
  editButton.style = "width: 17px; height: 17px;";
  editButton.onclick = () => editShow(li); 


  let deleteButton = document.createElement('input');
  deleteButton.setAttribute("type", "image");
  deleteButton.src = "trash-can-solid.svg";
  deleteButton.style = "width: 17px; height: 17px;"; 
  deleteButton.onclick = () => deleteShow(li); 


  li.appendChild(editButton);
  li.appendChild(deleteButton);
  li.appendChild(document.createTextNode(newShow.Name + " |   S" + newShow.Season + "E" + newShow.Episode));
  ul.appendChild(li);
  chrome.storage.sync.set({ "lastid": newShow.id,  "shows": shows });


  // console.log(shows);
}

function deleteShow(showElement)
{
  let index = shows.findIndex(function (shows) {
    return shows.id === showElement.id;    
  });
  console.log( index, "  ", showElement.id,  "   ", shows.id);

  shows.splice(index);
  showElement.remove();
  chrome.storage.sync.set({ "shows": shows });
}

function editShow(showElement)
{
  var index = shows.findIndex(function (shows) {
    return shows.id === showElement.id;
  });
    console.log( index, "  ", showElement.id);
    let season = prompt("Season", "Season");
    let episode = prompt("Episode", "Episode");
    console.log(season, episode);
    if(season != null && episode != null && shows.id === index) {
      shows.Season = season;
      shows.Episode = episode;
      chrome.storage.sync.set({ "shows": shows });
    }
}

function search() {
  let filter = input.value.toUpperCase();
  let li = document.getElementsByTagName("li");
  // Loop through all list items, and hide those that don't match the search query
  for (i = 0; i < li.length; i++) {
    let txtValue = li[i].innerHTML;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// removes whitespaces -> string.replace(/\s/g, '');