'use strict'

// Global Variables
var products = [];
var totalClicksAllowed = 10;
var clicks = 0;
var myContainer = document.getElementById('container');
var imgOneEl = document.getElementById('image-one');
var imgTwoEl = document.getElementById('image-two');
var myList = document.getElementById('list');

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

//Executable Code (Images in IMG FOLDER)
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

// console.log(getRandomProductIndex());

function renderProducts() {
  var productOne = getRandomProductIndex(); // this is an INDEX
  var productTwo = getRandomProductIndex(); // this is an INDEX
  // ?? var ProductThree = getRandomProductIndex(); // this is an INDEX 

  //with three indexes this gets more complex!!!  maybe use an array, maybe see if the index in question is included in that array, if it is, choose another index
  //NOTE:  we've myArray.push.  how do you remove something from an array?  how do we add something to the FRONT of an array?  remove from the FRONT, how remove from the BACK?
  while (productOne === productTwo) {
    productTwo = getRandomProductIndex();
  }

  imgOneEl.src = products[productOne].src;
  imgOneEl.alt = products[productOne].name;
  products[productOne].views++;

  imgTwoEl.src = products[productTwo].src;
  imgTwoEl.alt = products[productTwo].name;
  products[productTwo].views++;
}

function renderResults(){
  for (var i = 0; i < products.length; i++){
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
    renderResults();
  }

   // console.log(clickedProduct);
}

// Event Listener Takes 2 Parameters: Event and CallBack Function
myContainer.addEventListener('click', handleClick);