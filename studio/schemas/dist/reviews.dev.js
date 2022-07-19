"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _default = {
  name: 'Reviews',
  title: 'Patients Reviews',
  type: 'document',
  icon: _gi.GiBubbles,
  fields: [{
    name: 'name',
    title: 'Name',
    type: 'string'
  }, {
    name: 'review',
    title: 'Review',
    type: 'text'
  }, {
    name: 'rating',
    title: 'Rating',
    type: 'rating'
  }, {
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {
      hotspot: true
    }
  }]
};
exports["default"] = _default;