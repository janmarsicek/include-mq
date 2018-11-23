'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultBreakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1300px'
};

var defaultUnitIntervals = {
  'px': 1,
  'em': 0.01,
  'rem': 0.1
};

var includeMedia = function includeMedia() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$breakpoints = _ref.breakpoints,
      breakpoints = _ref$breakpoints === undefined ? defaultBreakpoints : _ref$breakpoints,
      _ref$unitIntervals = _ref.unitIntervals,
      unitIntervals = _ref$unitIntervals === undefined ? defaultUnitIntervals : _ref$unitIntervals;

  return function (mediaExpression) {
    if (!mediaExpression) {
      return console.warn('must provide media expression for includeMedia');
    }

    var isMax = mediaExpression.charAt(0) === '<';
    var minOrMax = isMax ? 'max-width' : 'min-width';

    var mediaExpressionValue = breakpoints[mediaExpression.slice(1)] || mediaExpression;

    var value = mediaExpressionValue.replace(/\D/g, '');

    var unit = mediaExpressionValue.replace(/\S*[0-9]/g, '');
    var unitInterval = unitIntervals[unit];
    var newValue = isMax ? value - unitInterval : value;

    if (isNaN(newValue)) {
      return console.warn('must provide valid value');
    }

    return '@media only screen and (' + minOrMax + ': ' + newValue + unit + ')';
  };
};

var im = includeMedia;

exports.im = im;
exports.default = includeMedia;
