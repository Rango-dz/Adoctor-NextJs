"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _schemaCreator = _interopRequireDefault(require("part:@sanity/base/schema-creator"));

var _schemaType = _interopRequireDefault(require("all:part:@sanity/base/schema-type"));

var _blockContent = _interopRequireDefault(require("./blockContent"));

var _category = _interopRequireDefault(require("./category"));

var _post = _interopRequireDefault(require("./post"));

var _doctors = _interopRequireDefault(require("./doctors"));

var _dayAndTime = _interopRequireDefault(require("./objects/dayAndTime"));

var _faq = _interopRequireDefault(require("./faq"));

var _helpArticle = _interopRequireDefault(require("./helpArticle"));

var _departments = _interopRequireDefault(require("./departments"));

var _reviews = _interopRequireDefault(require("./reviews"));

var _social = _interopRequireDefault(require("./social"));

var _homeFeatures = _interopRequireDefault(require("./homeFeatures"));

var _siteSettings = _interopRequireDefault(require("./siteSettings"));

var _TheDoctor = _interopRequireDefault(require("./TheDoctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
// We import object and document schemas
// Then we give our schema to the builder and provide the result to Sanity
var _default = (0, _schemaCreator["default"])({
  // We name our schema
  name: 'adoctor',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: _schemaType["default"].concat([// The following are document types which will appear
  // in the studio.
  _post["default"], _category["default"], _doctors["default"], _dayAndTime["default"], _faq["default"], _helpArticle["default"], _social["default"], _departments["default"], _reviews["default"], _homeFeatures["default"], _siteSettings["default"], _TheDoctor["default"], // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  _blockContent["default"]])
});

exports["default"] = _default;