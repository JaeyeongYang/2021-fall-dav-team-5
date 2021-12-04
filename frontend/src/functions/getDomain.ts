import * as d3 from 'd3';
import { patDomain, VarName, varsDiscrete, wayDomain } from "src/globals";
import { Menu } from "src/store/reducers/data";

export const getDomain = (varName: VarName, data: Menu[]) => {
  if (varsDiscrete.some((x) => x === varName)) {
    if (varName === "way") return wayDomain;
    else if (varName === "pat") return patDomain;
    else
      return Array.from(
        new d3.InternSet(data.map((d: any) => d[varName] as string))
      );
  } else {
    const ret = d3.extent(data, (d: any) => d[varName]);
    return [
      ret[0],
      ret[1]

      // ret[0] - 0.05 * (ret[1] - ret[0]),
      // ret[1] + 0.05 * (ret[1] - ret[0]),
    ];
  }
};

export default getDomain