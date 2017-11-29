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
    happyHour.cacheData();
  },

  cacheData: function () {
    if (happyHour.business.length > 0) {
      localStorage.business = JSON.stringify(happyHour.business);
      console.log('cached businesses:', happyHour.business);
    }
    if (happyHour.user.length > 0) {
      localStorage.user = JSON.stringify(happyHour.user);
      console.log('cached users:', happyHour.user);
    }
  },

  restoreData: function () {
    if (localStorage.business) {
      var objects = JSON.parse(localStorage.business);
      for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var b = new Business(
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
    // TODO: Restore data for users as well
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
function User(name, password) {
  this.name = name;
  this.password = password;
  console.log('User object constructor created:', this);
}

// console.log('Business object constructor created: ', Business);
var shopOne = new Business('shopOne', '15 142nd', 'seattle', 'Wa', '98133', 4, 6, 5);
var shopTwo = new Business('shopTwo', '15 142nd', 'seattle', 'Wa', '98133', 5, 7, 10);
var shopThree = new Business('shopThree', '15 142nd', 'seattle', 'Wa', '98133', 4, 10, 15);
var shopFour = new Business('shopFour', '15 142nd', 'seattle', 'Wa', '98133', 2, 5, 20);
