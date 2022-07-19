"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [{
    name: 'title',
    type: 'string',
    title: 'Site Title'
  }, {
    name: 'subtitle',
    type: 'string',
    title: 'Site SubTitle'
  }, {
    name: 'keywords',
    type: 'string',
    title: 'Site Keywords'
  }, {
    name: 'description',
    type: 'text',
    title: 'Site Description'
  }, {
    name: 'logo',
    type: 'image',
    title: 'Site Logo',
    options: {
      hotspot: true
    }
  }, {
    name: 'footer',
    type: 'text',
    title: 'Site Footer'
  }]
}; // Compare this snippet from blog\schemas\doctor.js:

exports["default"] = _default;