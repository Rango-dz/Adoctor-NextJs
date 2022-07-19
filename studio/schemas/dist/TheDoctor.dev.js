"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _doctorSpeacialties = _interopRequireDefault(require("./doctor-speacialties"));

var _gender = _interopRequireDefault(require("./gender"));

var _countries = _interopRequireDefault(require("./countries"));

var _gi = require("react-icons/gi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = {
  name: 'TheDoctor',
  title: 'Main Doctors',
  type: 'document',
  icon: _gi.GiFirstAidKit,
  groups: [{
    name: 'Main',
    title: 'Main',
    "default": true
  }, {
    name: 'Doctor Info',
    title: 'Doctor Info'
  }, {
    name: 'Address',
    title: 'Address'
  }, {
    name: 'Social',
    title: 'Social'
  }],
  fields: [{
    name: 'name',
    title: 'name',
    type: 'string',
    group: 'Main',
    description: 'Doctor Full Name'
  }, {
    name: 'slug',
    title: 'slug',
    type: 'slug',
    group: 'Main',
    options: {
      // Change to schema title to automatically populate
      source: 'name',
      maxLength: 200
    }
  }, {
    name: 'Speicialties',
    title: 'Specialties',
    type: 'string',
    group: 'Main',
    options: {
      list: _toConsumableArray(_doctorSpeacialties["default"])
    }
  }, {
    name: 'phoneNumber',
    title: 'Phone',
    type: 'number',
    group: 'Main'
  }, {
    name: 'doctoremail',
    title: 'Email',
    type: 'string',
    group: 'Main',
    validation: function validation(Rule) {
      return Rule.regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
  }, {
    title: 'Opening Hours',
    name: 'openingHours',
    group: 'Main',
    type: 'array',
    of: [{
      type: 'dayAndTime'
    }]
  }, {
    title: 'Text',
    name: 'text',
    type: 'array',
    group: 'Main',
    of: [{
      type: 'block'
    }]
  }, {
    name: 'mainImage',
    title: 'image',
    type: 'image',
    group: 'Main',
    options: {
      hotspot: true
    }
  }, // doctor info
  {
    name: 'Gender',
    title: 'Gender',
    type: 'string',
    group: 'Doctor Info',
    options: {
      list: _toConsumableArray(_gender["default"])
    }
  }, {
    name: 'Languages',
    title: 'Language',
    type: 'tags',
    group: 'Doctor Info',
    options: {
      includeFromRelated: 'Languages',
      predefinedTags: [{
        label: 'Arabic',
        value: 'Arabic'
      }, {
        label: 'French',
        value: 'French'
      }, {
        label: 'English',
        value: 'English'
      }],
      allowCreate: true
    }
  }, {
    name: 'Expertise',
    title: 'Expertise',
    type: 'tags',
    group: 'Doctor Info',
    options: {
      includeFromRelated: 'Expertise',
      allowCreate: true
    }
  }, {
    name: 'Services',
    title: 'Services',
    type: 'tags',
    group: 'Doctor Info',
    options: {
      includeFromRelated: 'Services',
      allowCreate: true
    }
  }, {
    name: 'Education',
    title: 'Education',
    type: 'tags',
    group: 'Doctor Info',
    options: {
      includeFromRelated: 'Education',
      allowCreate: true
    }
  }, {
    name: 'Awards',
    title: 'Awards',
    type: 'tags',
    group: 'Doctor Info',
    options: {
      includeFromRelated: 'Awards',
      allowCreate: true
    }
  }, // address
  {
    title: 'Country',
    name: 'Country',
    type: 'string',
    group: 'Address',
    options: {
      list: _toConsumableArray(_countries["default"])
    }
  }, {
    title: 'City',
    name: 'city',
    type: 'string',
    group: 'Address'
  }, {
    name: 'Address',
    title: 'Address',
    type: 'string',
    group: 'Address'
  }, {
    title: 'Launchpad Location',
    name: 'location',
    type: 'geopoint',
    group: 'Address'
  }, // social
  {
    name: 'Website',
    title: 'Website',
    type: 'url',
    group: 'Social',
    option: {
      placeholder: 'https://www.example.com'
    }
  }, {
    name: 'Facebook',
    title: 'Facebook',
    type: 'url',
    group: 'Social'
  }, {
    name: 'Instagram',
    title: 'Instagram',
    type: 'url',
    group: 'Social'
  }, {
    name: 'Twitter',
    title: 'Twitter',
    type: 'url',
    group: 'Social'
  }, {
    name: 'Pinterest',
    title: 'Pinterest',
    type: 'url',
    group: 'Social'
  }, {
    name: 'Youtube',
    title: 'Youtube',
    type: 'url',
    group: 'Social'
  }],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage'
    }
  }
};
exports["default"] = _default;