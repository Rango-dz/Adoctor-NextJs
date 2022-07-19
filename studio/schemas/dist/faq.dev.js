"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _default = {
  name: 'faq',
  type: 'object',
  title: 'Frequently asked question',
  icon: _gi.GiTalk,
  fields: [{
    name: 'question',
    type: 'string',
    title: 'Question'
  }, {
    name: 'answer',
    type: 'text',
    title: 'Answer'
  }]
};
exports["default"] = _default;