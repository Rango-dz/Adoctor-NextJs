"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _default = {
  name: 'departments',
  title: 'Departments / Services',
  type: 'document',
  icon: _gi.GiHospital,
  fields: [{
    title: 'Title',
    name: 'title',
    type: 'string'
  }, {
    title: 'Doctor',
    name: 'doctor',
    type: 'reference',
    to: [{
      type: 'doctor'
    }]
  }, {
    title: 'Text',
    name: 'text',
    type: 'array',
    of: [{
      type: 'block'
    }]
  }, {
    title: 'image',
    name: 'image',
    type: 'image',
    options: {
      hotspot: true // <-- Defaults to false

    }
  }]
};
exports["default"] = _default;