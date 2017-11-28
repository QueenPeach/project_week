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

  },

  cacheData: function () {

  },

  restoreData: function () {

  },
};

// happyHour.filterBy (5, 5, 5);


function Business(name, streetAddress, townAddress, zipAddress, stateAddress, distance, hhTimeStart, hhTimeEnd, price, /*foodType,*/ imgURL) {
  this.name = name;
  this.street = streetAddress;
  this.town = townAddress;
  this.zip = zipAddress;
  this.state = stateAddress;
  this.distance = distance;
  this.hhTimeStart = hhTimeStart;
  this.hhTimeEnd = hhTimeEnd;
  this.price = price;
  // this.foodType = [];
  this.img = imgURL;
  businessArray.push(this);

}
// console.log('Business object constructor created: ', Business);
var shopOne = new Business('shopOne', '15 142nd', 'seattle', 98133, 'Wa', 10, 4, 6, 5);
var shopTwo = new Business('shopTwo', '15 142nd', 'seattle', 98133, 'Wa', 5, 5, 7, 10);
var shopThree = new Business('shopThree', '15 142nd', 'seattle', 98133, 'Wa', 10, 4, 10, 15);
var shopFour = new Business('shopFour', '15 142nd', 'seattle', 98133, 'Wa', 15, 2, 5, 20);

function User(name, password) {
  this.name = name;
  this.password = password;

}
// console.log('User object constructor created: ', User);
