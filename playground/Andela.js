/**
 * Using ES6-style classes
 * See below for an alternative ES5-prototype solution setup
 */
/*
class User {
  constructor(name) {}
  isLoggedIn() {}
  getLastLoggedInAt() {}
  logIn() {}
  logOut() {}
  getName() {}
  setName(name) {}
  canEdit(comment) {}
  canDelete(comment) {}
}

class Moderator {}

class Admin {}

class Comment {
  constructor(author, message, repliedTo) {}
  getMessage() {}
  setMessage(message) {}
  getCreatedAt() {}
  getAuthor() {}
  getRepliedTo() {}
  toString() {}
}
*/

/**************************
 * Alternative using ES5 prototypes
 * Or feel free to choose your own solution format
 **************************/

function User(name) {
  this.name = name;
}
User.prototype = {
  isLoggedIn: function() {

  },
  getLastLoggedInAt: function() {

  },
  logIn: function() {

  },
  logOut: function() {

  },
  getName: function() {

  },
  setName: function(name) {

  },
  canEdit: function(comment) {

  },
  canDelete: function(comment) {

  }
}

var Admin = User();

var Moderator = User();

var user = new User('User 1');
var mod = new Moderator('Moderator');
var admin = new Admin('Admin');

function Comment(author, message, repliedTo) {
  this.author = author;
  this.message = message;
  this.repliedTo = repliedTo;
  this.createdAt = Date();
}
Comment.prototype = {
  getMessage: function() {

  },
  setMessage: function(message) {
  this.message = message;
},
  getCreatedAt: function() {},
  getAuthor: function() {},
  getRepliedTo: function() {},
  toString: function() {}
}
/***************************/
