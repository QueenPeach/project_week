'use strict';

var businessArray = [];

function Business(name, streetAddress, townAddress, zipAddress, stateAddress, hhTimeStart, hhTimeEnd, imgURL) {
  this.name = name;
  this.street = streetAddress;
  this.town = townAddress;
  this.zip = zipAddress;
  this.state = stateAddress;
  this.hhTimeStart = 0;
  this.hhTimeEnd = 0;
  this.img = imgURL;
  businessArray.push(this);
}
console.log('Business object constructor created: ', Business);

function User(name, password) {
  this.name = name;
  this.password = password;
}
console.log('User object constructor created: ', User);
