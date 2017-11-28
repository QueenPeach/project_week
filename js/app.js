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

  prepareEventListeners: function () {
    // attach event listener to the add new business form
    var form = document.getElementByID('newbusiness');
    form.addEventListener('submit', happyHour.createOnSubmit);
  }
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
  console.log('Business object created:', this);
}


function User(name, password) {
  this.name = name;
  this.password = password;
  console.log('User object constructor created:', this);
}
