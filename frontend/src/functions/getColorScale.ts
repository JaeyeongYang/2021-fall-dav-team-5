import * as d3 from 'd3';

export const getColorScale = (isDiscrete: boolean, domain: any) => {
  if (isDiscrete) {
    return d3.scaleOrdinal(domain, d3.schemeCategory10);
  } else {
    return d3.scaleSequential(d3.interpolateSpectral).domain(domain);
  }
};

export default getColorScale;
