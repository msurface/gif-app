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
  searchForm.reset();
}

// function to call Giphy API using axios -- grab to data-name
callGiphy = async searchVal => {
  console.log('callAPI is firing');
  let searchTerm = searchVal;
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=6o0cS1ouHsG6lH47U12XF4qlT0XZK1GL&limit=12&q=${searchTerm}`;
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
  console.log(`SearchVal line 83: ${searchVal}`);
  callGiphy(searchVal)
    .then(response => {
      console.log(response);
      // console.log(response.data.data[0].images.downsized_still);
      // for animated gifs
      // console.log(response.data.data[0].images.original);
      // response.data.data[i].images.original.url;

      // console.log(response.data.data);

      let resArr = chunkArr(response.data.data, 4);
      for (j = 0; j < resArr.length; j++) {
        let wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'row');
        let gifArr = resArr[j];
        for (i = 0; i < gifArr.length; i++) {
          let gifSource = gifArr[i].images.original.url;
          let imageGif = document.createElement('img');
          imageGif.setAttribute(
            'class',
            'gif-still col-sm-3 col-md-3 col-lg-3 col-xl-3'
          );
          imageGif.setAttribute('id', `gif-${i}`);
          imageGif.setAttribute('src', gifSource);
          wrapper.append(imageGif);
          gifTarget.appendChild(wrapper);
        }
      }

      // an empty array to hold the construction of the gifs in the for loop.
      // for (i = 0; i < response.data.data.length; i++) {
      //   // let source = response.data.data[i].images.downsized_still.url;
      //   let source = response.data.data[i].images.original.url;
      //   let imageGif = document.createElement('img');
      //   imageGif.setAttribute('class', 'gif-still');
      //   imageGif.setAttribute('id', `gif-${i}`);
      //   imageGif.setAttribute('src', source);
      //   gifTarget.appendChild(imageGif, gifTarget.childNodes[0]);
      // }
      // chunking the array and placing in a variable.
      // 4 can be changed later if the user is provided the opportunity
      // to choose how many gifs to return. Must be a multiple of 12.
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
  } else if (e.target.className === 'gif-still') {
    console.log(gifId);
  } else if (e.target.className != 'start-btn' && 'gif-still') {
    console.log('bad click');
    return;
  }
};

// function to chunk gifArr
function chunkArr(myArray, chunkSize) {
  let tempArr = [];
  for (i = 0; i < myArray.length; i += chunkSize) {
    myChunk = myArray.slice(i, i + chunkSize);
    tempArr.push(myChunk);
  }

  return tempArr;
}

// function to wrap a div w/ the class of row around 4 dom elements in the render function
function wrap(wrapper, gifGroup) {
  wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'row');
  gifGroup.forEach(element => {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild;
  });
}
// Event listenders for the page
// on default button click
defBtns.addEventListener('click', event => renderBtns(event, starterGifs));
// adding a custom button click
submitSearch.addEventListener('click', addCustomBtn);
// clicking a dynamic element using event delegation
document.addEventListener('click', e => handleDynamicBtnClick(e));
