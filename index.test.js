import includeMedia from './index';

it(`can be called without arguments and doesn't crash`, () => {
  const mq = includeMedia()();

  expect(mq).toBeFalsy();
});

it('works for min-width with provided explicit value in px', () => {
  const mq = includeMedia()('>800px');

  expect(mq).toEqual('@media only screen and (min-width: 800px)');
});

it('works for max-width with provided explicit value in px and recalculates new value', () => {
  const mq = includeMedia()('<800px');

  expect(mq).toEqual('@media only screen and (max-width: 799px)');
});

it('works with one of predefined breakpoints', () => {
  const mq = includeMedia()('<desktop');

  expect(mq).toEqual('@media only screen and (max-width: 1299px)');
});

it('works for max-width with provided explicit value in em and recalculates new value', () => {
  const mq = includeMedia()('<20em');

  expect(mq).toEqual('@media only screen and (max-width: 19.99em)');
});

it('works for max-width with provided explicit value in rem and recalculates new value', () => {
  const mq = includeMedia()('<20rem');

  expect(mq).toEqual('@media only screen and (max-width: 19.9rem)');
});

it('works with custom breakpoints for all possible units', () => {
  const newBreakpoints = {
    myMobile: '8em',
    myTablet: '12rem',
    myDesktop: '1920px',
  };

  const mq = includeMedia({ breakpoints: newBreakpoints });

  expect(mq('<myMobile')).toEqual('@media only screen and (max-width: 7.99em)');
  expect(mq('<myTablet')).toEqual('@media only screen and (max-width: 11.9rem)');
  expect(mq('<myDesktop')).toEqual('@media only screen and (max-width: 1919px)');

  expect(mq('>myMobile')).toEqual('@media only screen and (min-width: 8em)');
  expect(mq('>myTablet')).toEqual('@media only screen and (min-width: 12rem)');
  expect(mq('>myDesktop')).toEqual('@media only screen and (min-width: 1920px)');
});

it('works with custom unit intervals for explicit values and default breakpoints', () => {
  const newUnitIntervals = {
    'px': 5,
    'em': 0.05,
    'rem': 0.5,
  };

  const mq = includeMedia({ unitIntervals: newUnitIntervals });

  expect(mq('<800px')).toEqual('@media only screen and (max-width: 795px)');
  expect(mq('<10em')).toEqual('@media only screen and (max-width: 9.95em)');
  expect(mq('<10rem')).toEqual('@media only screen and (max-width: 9.5rem)');

  expect(mq('>800px')).toEqual('@media only screen and (min-width: 800px)');
  expect(mq('>10em')).toEqual('@media only screen and (min-width: 10em)');
  expect(mq('>10rem')).toEqual('@media only screen and (min-width: 10rem)');

  expect(mq('<desktop')).toEqual('@media only screen and (max-width: 1295px)');
});

it('works with custom unit intervals for explicit values and default breakpoints', () => {
  const newUnitIntervals = {
    'px': 5,
    'em': 0.05,
    'rem': 0.5,
  };

  const newBreakpoints = {
    myMobile: '8em',
    myTablet: '12rem',
    myDesktop: '1920px',
  };

  const mq = includeMedia({ breakpoints: newBreakpoints, unitIntervals: newUnitIntervals });

  expect(mq('<myMobile')).toEqual('@media only screen and (max-width: 7.95em)');
  expect(mq('<myTablet')).toEqual('@media only screen and (max-width: 11.5rem)');
  expect(mq('<myDesktop')).toEqual('@media only screen and (max-width: 1915px)');
});

it('fails with if new value is not a number', () => {
  const mq = includeMedia();

  expect(mq('<myMobile')).toBeFalsy();
});
