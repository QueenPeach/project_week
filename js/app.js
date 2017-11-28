'use strict';

var happyHour = {
  business: [],
  user: [],

  filterBy: function (key, value) {

  },

  displayBusiness: function (businessArray) {

  },

  filterOnSubmit: function (event) {

  },

  createOnSubmit: function (event) {

  },

  cacheData: function () {

  },

  restoreData: function () {

  },
};

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
  happyHour.business.push(this);
}
console.log('Business object constructor created: ', Business);

function User(name, password) {
  this.name = name;
  this.password = password;
}
console.log('User object constructor created: ', User);
