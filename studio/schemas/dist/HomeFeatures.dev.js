"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _default = {
  name: 'HomeFeatures',
  type: 'document',
  title: 'Home Features',
  icon: _gi.GiHouse,
  fields: [{
    name: 'name',
    title: 'Name',
    type: 'string'
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