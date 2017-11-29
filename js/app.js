'use strict';

var businessArray = [];
var happyHour = {
  business: [],
  user: [],
  selectedArray: [],

  displayBusiness: function (selectedArray) {
    for (var i = 0; i < selectedArray.length; i++) {
      var sectionElt = document.getElementById('business-div');
      var hOneElt = document.createElement('h3');
      hOneElt.textContent = Business[i].name;
      var imgElt = document.createElement('img');
      imgElt = Business[i].imgURL;
      var hhSectionElt = document.createElement('section');
      hhsectionElt.textContent =  Business[i].hhTime.start;
      var addrSectionElt = document.createElement('section');
      addrSectionElt.textContent = 'Address:';
      var pTag1Elt = document.createElement('p');
      pTag1Elt.textContent = Business[i].address.street;
      var pTag2Elt = document.createElement('p');
      pTag2Elt.textContent = Business[i].address.state;
      var pTag1Elt = document.createElement('p');
      pTag1Elt.textContent = Business[i].address.zip;
    }
  },

  filterBy: function (time, distance, price /*foodType*/) {
    for (var i = 0; i < happyHour.business.length; i++) {
      console.log('happyHour.business[i]: ', happyHour.business[i]);
      if(((time >= happyHour.business[i].hhTimeStart) || (time <= (happyHour.business[i].hhTimeEnd - 1))) && (distance <= happyHour.business[i].distance) && (price <= happyHour.business[i].price)) /* && (foodType === businessArray[i].foodType))*/ {
        this.selectedArray.push(happyHour.business[i]);
      }
    }
    //console.log('businessArray ', happyHour.business);
    console.log ('filter choice', this.selectedArray);
    happyHour.displayBusiness(this.selectedArray);
    //return this.selectedArray;
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
new Business('Some Random Bar', '2604 1st Ave', 'Seattle', 'WA', '98121', '18:00', '20:00', 'https://s3-media1.fl.yelpcdn.com/bphoto/m4hfcLhvJbEGdbgI3DhvqA/o.jpg');
new Business('Mr Darcy\'s', '2222 2nd Ave', 'Seattle', 'WA', '98121', '17:00', '19:00', 'https://s3-media4.fl.yelpcdn.com/bphoto/Mzk-V11ozhmnYxCIppIVJg/o.jpg');
new Business('Jupiter Bar', '2126 2nd Ave', 'Seattle', 'WA', '98121', '14:00', '17:30', 'https://s3-media1.fl.yelpcdn.com/bphoto/_hE7rHaEOUpDm9IRaaWqzA/o.jpg');
new Business('Rabbit Hole', '2222 2nd Ave', 'Seattle', 'WA', '98121', '16:00', '18:00', 'https://s3-media2.fl.yelpcdn.com/bphoto/2mbQQeJuOAkMHT2gXAks8g/o.jpg');
new User('user', 'password');
