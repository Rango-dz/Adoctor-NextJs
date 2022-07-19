"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _default = {
  name: 'Faq',
  title: 'Frequently asked question',
  type: 'document',
  icon: _gi.GiTalk,
  fields: [{
    name: 'title',
    type: 'string',
    title: 'Title'
  }, {
    name: 'faqs',
    type: 'array',
    title: 'Frequently Asked Questions',
    of: [{
      type: 'faq'
    }]
  }]
};
exports["default"] = _default;