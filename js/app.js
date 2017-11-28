'use strict';

var businessArray = [];
var happyHour = {
  business: [],
  user: [],
  selectedArray: [],

  filterBy: function (time, distance, price /*foodType*/) {
    for (var i = 0; i < businessArray.length; i++) {
      if(((time >= businessArray[i].hhTimeStart) || (time <= (businessArray[i].hhTimeEnd - 1))) && (distance <= businessArray[i].distance) && (price <= businessArray[i].price)) /* && (foodType === businessArray[i].foodType))*/ {
        this.selectedArray.push(businessArray[i]);
      }

    }

    console.log ('filter choice', this.selectedArray);
    return this.selectedArray;
  },

  displayBusiness: function (businessArray) {

  },

  filterOnSubmit: function (event) {
    // a(time), b(distance), c(price), d(foodType)
    // if user selects any a,b,c pass the value to filterBy function, else pass 1 for particual letter.
  },

  createOnSubmit: function (event) {
    event.preventDefault();
    console.log('Entered event listener!');
    new Business(
      event.target.businessname.value,
      event.target.addrstreet.value,
      event.target.addrcity.value,
      event.target.addrstate.value,
      event.target.addrzip.value,
      event.target.starttime.value,
      event.target.endtime.value,
      event.target.imageurl.value
    );
  },

  cacheData: function () {

  },

  restoreData: function () {

  },

  prepareAddNewEventListener: function () {
    // attach event listener to the add new business form
    var form = document.getElementById('newbusiness');
    form.addEventListener('submit', happyHour.createOnSubmit);
  }
};

// Business constructor
function Business(businessName, street, city, state, zip, hhTimeStart, hhTimeEnd, imgURL) {
  this.name = businessName;
  this.address = {};
  this.address.street = street;
  this.address.state = state;
  this.address.zip = zip;
  this.hhTime = {};
  this.hhTime.start = hhTimeStart;
  this.hhTime.end = hhTimeEnd;
  this.imgURL = imgURL;
  // all businesses will be 0..15 miles away
  this.distance = Math.floor(Math.random() * 15);
  happyHour.business.push(this);
  console.log('Business object created:', this);
}

// User constructor
function User(name, password) {
  this.name = name;
  this.password = password;
  console.log('User object constructor created:', this);
}

// console.log('Business object constructor created: ', Business);
var shopOne = new Business('shopOne', '15 142nd', 'seattle', 'Wa', '98133', 10, 4, 6, 5);
var shopTwo = new Business('shopTwo', '15 142nd', 'seattle', 'Wa', '98133', 5, 5, 7, 10);
var shopThree = new Business('shopThree', '15 142nd', 'seattle', 'Wa', '98133', 10, 4, 10, 15);
var shopFour = new Business('shopFour', '15 142nd', 'seattle', 'Wa', '98133', 15, 2, 5, 20);