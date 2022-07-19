"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gi = require("react-icons/gi");

var _default = {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: _gi.GiNewspaper,
  groups: [{
    name: 'SEO',
    title: 'SEO'
  }],
  fields: [{
    name: 'title',
    title: 'Title',
    type: 'string'
  }, {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'title',
      maxLength: 96
    }
  }, {
    name: 'author',
    title: 'Author',
    type: 'reference',
    to: {
      type: 'doctor'
    }
  }, {
    name: 'mainImage',
    title: 'Main image',
    type: 'image',
    options: {
      hotspot: true
    }
  }, {
    name: 'categories',
    title: 'Categories',
    type: 'array',
    of: [{
      type: 'reference',
      to: {
        type: 'category'
      }
    }]
  }, {
    name: 'publishedAt',
    title: 'Published at',
    type: 'datetime'
  }, {
    name: 'body',
    title: 'Body',
    type: 'array',
    of: [{
      type: 'block'
    }]
  }, {
    name: 'Tags',
    title: 'Tags',
    type: 'tags',
    options: {
      includeFromRelated: "Tags",
      allowCreate: true
    }
  }, {
    name: 'Featured',
    title: 'Featured',
    type: 'boolean'
  }, {
    name: 'titleSeo',
    title: 'Title Seo',
    type: 'string',
    group: 'SEO'
  }, {
    name: 'keywordsSeo',
    title: 'keywords Seo',
    type: 'string',
    group: 'SEO'
  }, {
    name: 'descriptionSeo',
    title: 'Description Seo',
    type: 'text',
    group: 'SEO'
  }],
  orderings: [{
    title: 'New Articles',
    name: 'releaseDateDesc',
    by: [{
      field: 'releaseDate',
      direction: 'desc'
    }]
  }, {
    title: 'Release Date, Old',
    name: 'releaseDateAsc',
    by: [{
      field: 'releaseDate',
      direction: 'asc'
    }]
  }, {
    title: 'Popularity',
    name: 'popularityDesc',
    by: [{
      field: 'popularity',
      direction: 'desc'
    }]
  }],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare: function prepare(selection) {
      var author = selection.author;
      return Object.assign({}, selection, {
        subtitle: author && "by ".concat(author)
      });
    }
  }
};
exports["default"] = _default;