import * as d3 from 'd3';

export const getScale = (isDiscrete: boolean, domain: any, range: any) => {
  if (isDiscrete) {
    return d3.scaleBand(domain, range) as d3.AxisScale<d3.NumberValue>;
  } else {
    return d3.scaleLinear(domain, range) as d3.AxisScale<d3.NumberValue>;
  }
};

export default getScale;
