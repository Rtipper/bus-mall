'use strict'

// Global Variables
var products = [];
var totalClicksAllowed = 25;
var clicks = 0;
var votesArray = []
var viewsArray = []
var namesArray = []
var cachedProductIndexes = [];

var myContainer = document.getElementById('container');
var imgOneEl = document.getElementById('image-one');
var imgTwoEl = document.getElementById('image-two');
var imgThreeEl = document.getElementById('image-three');
var myList = document.getElementById('list');
var ctx = document.getElementById('myChart').getContext('2d');


// Constructor
function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  products.push(this);
}

// Functions
function getRandomProductIndex() {
  return Math.floor(Math.random() * products.length);
}

// Local Storage pt1
var retrievedResults = localStorage.getItem('productResults');
if (retrievedResults) {
  var parsedRetrievedResults = JSON.parse(retrievedResults);
  products = parsedRetrievedResults;
} else {

  //Executable Code (Images in IMG FOLDER) -- these are now part of local storage!
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb');
}

// console.log(getRandomProductIndex());

// var productOne = getRandomProductIndex(); // this is an INDEX
// var productTwo = getRandomProductIndex(); // this is an INDEX
// ?? var ProductThree = getRandomProductIndex(); // this is an INDEX 

//with three indexes this gets more complex!!!  maybe use an array, maybe see if the index in question is included in that array, if it is, choose another index
//NOTE:  we've myArray.push.  how do you remove something from an array?  how do we add something to the FRONT of an array?  remove from the FRONT, how remove from the BACK?
// while (productOne === productTwo) {
//   productTwo = getRandomProductIndex();
// }
// Lab 12 3 varying images ideas
// [a, b, c, d]  1st time
//  [a, b, e, f]  or [e, f, a, b]  2nd time
// [e, f, g, c]  or [g, c, e, f] 3rd time

function renderProducts() {
  var productIndexes = [];

  while (productIndexes.length < 3) {
    var randomNumber = getRandomProductIndex();
    //Are we already going to show this item and have we showed this item in the last iteration?
    if (!productIndexes.includes(randomNumber) && !cachedProductIndexes.includes(randomNumber)) {
      //Add this random number to the list of current product indexes
      productIndexes.push(randomNumber);
    }
  }

  //Imge One
  imgOneEl.src = products[productIndexes[0]].src;
  imgOneEl.alt = products[productIndexes[0]].name;
  products[productIndexes[0]].views++;

  //Imge Two
  imgTwoEl.src = products[productIndexes[1]].src;
  imgTwoEl.alt = products[productIndexes[1]].name;
  products[productIndexes[1]].views++;

  //Imge Three
  imgThreeEl.src = products[productIndexes[2]].src;
  imgThreeEl.alt = products[productIndexes[2]].name;
  products[productIndexes[2]].views++;

  //Clear the cached product indexes
  cachedProductIndexes = [];
  //Cache a copy of the current product indexes. Shorthand for how to copy an array. Ref. added to README.
  cachedProductIndexes = [...productIndexes];
}

function renderResults() {
  for (var i = 0; i < products.length; i++) {
    // create element
    var li = document.createElement('li');
    // give it content
    li.textContent = `${products[i].name} had ${products[i].votes} votes, and was seen ${products[i].views} times.`;
    // append it to the dom
    myList.appendChild(li);
  }
}

renderProducts();

// Event Handler Takes 1 Paramter: Event or Often "e"
function handleClick(event) {
  // this grabs the image alt property - which is the same as the goat name property
  var clickedProduct = event.target.alt;
  clicks++;

  for (var i = 0; i < products.length; i++) {
    // we are looking at ALL the name properties inside the goat array and comparing them to our image alt property
    if (clickedProduct === products[i].name) {
      // if true, we KNOW we have the correct goat object and we can increment its votes!
      products[i].votes++;
    }
  }

  renderProducts();
  if (clicks === totalClicksAllowed) {
    // Remove Even Listener Takes Parameters: Event and Callback Function
    myContainer.removeEventListener('click', handleClick);
    // Renders Results in a List
    renderChart();
    // renderResults();

    // Local Storage pt2 - Saving the Data
    var stringifiedResults = JSON.stringify(products);
    localStorage.setItem('productResults', stringifiedResults);
  }
}

// console.log(clickedProduct);

function getData() {
  for (var i = 0; i < products.length; i++) {
    votesArray.push(products[i].votes);
    viewsArray.push(products[i].views);
    namesArray.push(products[i].name);
  }
}


function renderChart() {
  getData();
  var chartObject = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of VOTES',
        hoverBackgroundColor: 'rgba(255, 99, 71, 0.2)',
        data: votesArray,
        backgroundColor: 'rgba(255, 99, 71, 0.4)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2
      },
      {
        label: '# of VIEWS',
        data: viewsArray,
        backgroundColor: 'rgba(255, 99, 71, 0.8)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };


  var myChart = new Chart(ctx, chartObject);  //eslint-disable-line

}


// Event Listener Takes 2 Parameters: Event and CallBack Function
myContainer.addEventListener('click', handleClick);