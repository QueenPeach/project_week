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
    // if user selects any a,b,c pass the value to filterBy function, else pass 1 for particular letter.
    event.preventDefault();
    console.log('event object Time: ', event.target[0].value);
    console.log('event object Price: ', event.target[1].value);
    console.log('event object Distance: ', event.target[2].value);

    if (event.target[0].value === '') {
      event.target[0].value = 1;
    }
    if (event.target[1].value === '') {
      event.target[1].value = 1;
    }
    if (event.target[2].value === '') {
      event.target[2].value = 1;
    }

    console.log(event.target[0].value, event.target[1].value, event.target[2].value);

    happyHour.filterBy(event.target[0].value, event.target[1].value, event.target[2].value);

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
    // new business was created, cache all data
    happyHour.cacheData(true, false);
  },

  cacheData: function (cacheBusiness, cacheUser) {
    if (cacheBusiness && happyHour.business.length > 0) {
      localStorage.business = JSON.stringify(happyHour.business);
    }
    if (cacheUser && happyHour.user.length > 0) {
      localStorage.user = JSON.stringify(happyHour.user);
    }
  },

  restoreData: function () {
    console.log('Restoring data!');
    // Restore business data
    if (localStorage.business) {
      happyHour.business = [];
      let objects = JSON.parse(localStorage.business);
      for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        let b = new Business(
          object.name,
          object.address.street,
          object.address.city,
          object.address.state,
          object.address.zip,
          object.hhTime.start,
          object.hhTime.end,
          object.imgURL
        );
        b.distance = object.distance;
      }
    }
    // Restore user data
    if (localStorage.user) {
      happyHour.user = [];
      let objects = JSON.parse(localStorage.user);
      for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        new User(object.userName, object.password);
      }
    }
  },

  userFilterEventListener: function () {
    // attach event listener to the user input filter form
    var form = document.getElementById('userFilter');
    form.addEventListener('submit', happyHour.filterOnSubmit);
  },


  prepareAddNewEventListener: function () {
    // attach event listener to the add new business form
    var form = document.getElementById('newbusiness');
    form.addEventListener('submit', happyHour.createOnSubmit);
  },

  prepareSignInEventListener: function () {
    // attach event listener to the sign in form
    var form = document.getElementById('form-signin');
    form.addEventListener('submit', happyHour.signIn);
  },

  signIn: function (event) {
    // Handle event of a user trying to sign in
    event.preventDefault();
    var userName = event.target.username.value;
    var password = event.target.password.value;
    /* Look for user that matches provided username. If found, validate */
    for (let i = 0; i < happyHour.user.length; i++) {
      let user = happyHour.user[i];

      if (userName !== user.userName) {
        continue;
      }

      if (password !== user.password) {
        console.log('Invalid password! Not logged in.');
        return;
      } else {
        console.log('Successfully logged in!');
        return;
      }
    }

    console.log('Invalid Username!');
  }
};

// Business constructor
function Business(businessName, street, city, state, zip, hhTimeStart, hhTimeEnd, imgURL) {
  this.name = businessName;
  this.address = {};
  this.address.street = street;
  this.address.city = city;
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
function User(userName, password) {
  this.userName = userName;
  this.password = password;
  happyHour.user.push(this);
  // Cache user data
  happyHour.cacheData(false, true);
  console.log('User object constructor created:', this);
}

// console.log('Business object constructor created: ', Business);
var shopOne = new Business('shopOne', '15 142nd', 'seattle', 'Wa', '98133', 4, 6, 5);
var shopTwo = new Business('shopTwo', '15 142nd', 'seattle', 'Wa', '98133', 5, 7, 10);
var shopThree = new Business('shopThree', '15 142nd', 'seattle', 'Wa', '98133', 4, 10, 15);
var shopFour = new Business('shopFour', '15 142nd', 'seattle', 'Wa', '98133', 2, 5, 20);
