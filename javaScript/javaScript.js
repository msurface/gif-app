console.log('this works');

// grabbing DOM elements
const btnTarget = document.querySelector('.button-dump');
const gifTarget = document.querySelector('.gif-dump');
const submitSearch = document.getElementById('select-gif');
const gifSearchVal = document.getElementById('gif-input');
const searchForm = document.getElementById('gif-form');
const defBtns = document.getElementById('default-btn');
const individualBtn = document.querySelector('.start-btn');

console.log(gifTarget);

// created an array of default gify buttons to call
const starterGifs = ['Laughing', 'Celebrating', 'Dancing', 'Cheering'];
// custom array
let customArr = [];

// function to render buttons
let renderBtns = (event, btnToRender) => {
  // preventing default button action
  event.preventDefault();

  // deleting buttons prior to adding new buttons
  while (btnTarget.firstChild) {
    btnTarget.removeChild(btnTarget.firstChild);
    console.log('while loop works');
  }

  // looping over the starterGifs & creating buttons in HTML
  for (i = 0; i < btnToRender.length; i++) {
    let starterBtn = document.createElement('button');
    starterBtn.setAttribute('data-name', btnToRender[i]);
    starterBtn.setAttribute('class', 'start-btn');
    starterBtn.innerText = btnToRender[i];
    btnTarget.appendChild(starterBtn);
  }
};

// function to add a custom button take from the form
function addCustomBtn() {
  let inputVal = gifSearchVal.value.trim();
  if (inputVal === '') {
    alert('enter a gif!');
  } else {
    if (!customArr || !customArr.length) {
      customArr.push(...starterGifs, inputVal);
    } else {
      customArr.push(inputVal);
    }
  }
  renderBtns(event, customArr);
}

// function to call Giphy API using axios -- grab to data-name
callGiphy = async searchVal => {
  console.log('callAPI is firing');
  let searchTerm = searchVal;
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=6o0cS1ouHsG6lH47U12XF4qlT0XZK1GL&limit=10&q=${searchTerm}`;
  return axios
    .get(queryURL)
    .then(response => {
      // removing the 10 previously loaded gifs before adding new gifs.
      while (gifTarget.firstChild) {
        gifTarget.removeChild(gifTarget.firstChild);
        console.log('Gif Target while loop works');
      }

      return response;
    })
    .catch(error => {
      if (error) {
        console.error(error);
      }
    });
};

// a function to use the API response and build DOM elements
function renderGifs(searchVal) {
  callGiphy(searchVal)
    .then(response => {
      console.log(response);
      // console.log(response.data.data[0].images.downsized_still);
      // for animated gifs
      // console.log(response.data.data[0].images.original);
      // response.data.data[i].images.original.url;
      for (i = 0; i < response.data.data.length; i++) {
        // let source = response.data.data[i].images.downsized_still.url;
        let source = response.data.data[i].images.original.url;
        let imageGif = document.createElement('img');
        imageGif.setAttribute('class', 'gif-still');
        imageGif.setAttribute('id', `gif-${i}`);
        imageGif.setAttribute('src', source);
        gifTarget.appendChild(imageGif, gifTarget.childNodes[0]);
      }
    })
    .catch(error => {
      if (error) {
        console.error(error);
      }
    });
}

// // a function to animate the gif clicked by the user
// function animateGif(gifId, event, searchTerm) {
//   console.log(gifId);
//   console.log(event);
//   console.log(searchTerm);
// }
// listening for clicks on buttons to call the api and load 10 gifs
let handleDynamicBtnClick = e => {
  let btnVal = e.target.innerText;
  let gifId = e.target.id;
  if (e.target.className === 'start-btn') {
    console.log(btnVal);
    renderGifs(btnVal);
    searchForm.reset();
  } else if (e.target.className === 'gif-still') {
    console.log(gifId);
  } else if (e.target.className != 'start-btn' && 'gif-still') {
    console.log('bad click');
    return;
  }
};

// Event listenders for the page
// on default button click
defBtns.addEventListener('click', event => renderBtns(event, starterGifs));
// adding a custom button click
submitSearch.addEventListener('click', addCustomBtn);
// clicking a dynamic element using event delegation
document.addEventListener('click', e => handleDynamicBtnClick(e));
