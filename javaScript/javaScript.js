console.log('this works');

// grabbing DOM elements
const btnTarget = document.querySelector('.button-dump');
const gifTarget = document.querySelector('.gif-dump');
const submitSearch = document.getElementById('select-gif');
const gifSearchVal = document.getElementById('gif-input');
const searchForm = document.getElementById('form-area');
const defBtns = document.getElementById('default-btn');
const individualBtn = document.querySelector('.start-btn');

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
  callGiphy();
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
function callGiphy() {
  let searchTerm = 'george';
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=6o0cS1ouHsG6lH47U12XF4qlT0XZK1GL&limit=10&q=${searchTerm}`;
  axios
    .get(queryURL)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      if (error) {
        console.error(error);
      }
    });
}

// Event listenders for the page
// on default button click
defBtns.addEventListener('click', event => renderBtns(event, starterGifs));
// adding a custom button click
submitSearch.addEventListener('click', addCustomBtn);
// clicking a specific button -- I need to grab the specific button when clicked
