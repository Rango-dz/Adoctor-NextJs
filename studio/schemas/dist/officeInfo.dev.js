"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _countries = _interopRequireDefault(require("./countries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = {
  name: "officeInfo",
  title: "Office Info",
  type: "document",
  icon: _gi.GiInfo,
  fields: [{
    name: "name",
    title: "Name",
    type: "string"
  }, {
    name: "logo",
    title: "logo",
    type: "image",
    options: {
      hotspot: true
    }
  }, {
    name: "website",
    title: "Website",
    type: "url"
  }, {
    name: "phoneNumber",
    title: "Phone Number",
    type: "number"
  }, {
    name: "email",
    title: "Email",
    type: "string",
    validation: function validation(Rule) {
      return Rule.regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
  }, {
    name: "address",
    title: "Address",
    type: "string"
  }, {
    name: "city",
    title: "City",
    type: "string"
  }, {
    name: "state",
    title: "State",
    type: "string"
  }, {
    name: "zip",
    title: "Zip",
    type: "string"
  }, {
    name: "country",
    title: "Country",
    type: "string",
    options: {
      list: _toConsumableArray(_countries["default"])
    }
  }, {
    name: "description",
    title: "Description",
    type: "text"
  }, {
    name: "openingHours",
    title: "Opening Hours",
    type: "array",
    of: [{
      type: "dayAndTime"
    }]
  }, {
    name: "social",
    title: "Social Websites",
    type: "array",
    of: [{
      type: "social"
    }]
  }]
};
exports["default"] = _default;