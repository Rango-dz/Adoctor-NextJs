"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncate = truncate;
exports.slugify = slugify;
exports.formatPhoneNumber = formatPhoneNumber;
exports.slugifi = slugifi;
exports.unslugify = unslugify;

function truncate(str, maxLength) {
  if (str.length < maxLength) {
    return str;
  }

  var firstWhitespaceAfterTruncation = str.slice(maxLength).search(/\s/) + maxLength;
  return str.slice(0, firstWhitespaceAfterTruncation) + '...';
}

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with
  // eslint-disable-next-line no-useless-escape
  .replace(/[^\w\-]+/g, '-') // Remove all non-word chars
  // eslint-disable-next-line no-useless-escape
  .replace(/\-\-+/g, '-') // Replace multiple - with single
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
}

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    var intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  return null;
}

function slugifi(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // Make the string lowercase

  str = str.toLowerCase(); // Remove accents, swap ñ for n, etc

  var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  } // Remove invalid chars


  str = str.replace(/[^a-z0-9 -]/g, '') // Collapse whitespace and replace by -
  .replace(/\s+/g, '-') // Collapse dashes
  .replace(/-+/g, '-');
  return str;
}

function unslugify(slug) {
  // eslint-disable-next-line
  var result = slug.replace(/\-/g, " ");
  return result.replace(/\w\S*/g, function (txt) {
    return txt;
  });
}