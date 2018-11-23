const defaultBreakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1300px',
};

const defaultUnitIntervals = {
  'px': 1,
  'em': 0.01,
  'rem': 0.1,
};

const includeMedia = ({
  breakpoints = defaultBreakpoints,
  unitIntervals = defaultUnitIntervals
} = {}) => (mediaExpression) => {
    if (!mediaExpression) {
      return console.warn('must provide media expression for includeMedia')
    }

    const isMax = mediaExpression.charAt(0) === '<';
    const minOrMax = isMax ? 'max-width' : 'min-width';

    const mediaExpressionValue = breakpoints[mediaExpression.slice(1)] || mediaExpression;

    const value = mediaExpressionValue.replace(/\D/g, '');

    const unit = mediaExpressionValue.replace(/\S*[0-9]/g, '');
    const unitInterval = unitIntervals[unit];
    const newValue = isMax ? value - unitInterval : value;

    if (isNaN(newValue)) {
      return console.warn('must provide valid value');
    }

    return `@media only screen and (${minOrMax}: ${newValue}${unit})`
  };

const im = includeMedia;

export {
  im
};

export default includeMedia;
