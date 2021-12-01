import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { loadMenuDetail, Menu } from "src/store/reducers/data";
import { useAppDispatch } from "src/hooks";
import { showModal } from "src/store/reducers/UI";
import {
  varsDiscrete,
  VarDiscrete,
  varsContinuous,
  VarContinuous,
  VarName,
  wayDomain,
  patDomain,
} from "src/globals";

const mapVarNameToLabel: { [key: VarName]: string } = {
  way: "조리방법",
  pat: "메뉴종류",
  energy: "열량 (kcal)",
  carb: "탄수화물 (g)",
  protein: "단백질 (g)",
  fat: "지방 (g)",
  na: "나트륨 (g)",
};

interface Tooltip {
  display: boolean;
  menu?: Menu;
  pos?: { x: number; y: number };
}

interface Props {
  data: Menu[];
  width: number;
  height: number;
  radius?: number;
  radiusCollide?: number;
  forced?: boolean;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  inset?: number;
  insetTop?: number;
  insetRight?: number;
  insetBottom?: number;
  insetLeft?: number;
  xVar?: VarName;
  yVar?: VarName;
}

const ScatterPlot = ({
  data,
  width,
  height,
  radius = 5,
  radiusCollide = 2,
  forced = true,
  xVar = "way",
  yVar = "pat",
  marginTop = 60,
  marginRight = 60,
  marginBottom = 60,
  marginLeft = 60,
  inset = 0,
  insetTop = inset, // inset the default y-range
  insetRight = inset, // inset the default x-range
  insetBottom = inset, // inset the default y-range
  insetLeft = inset,
}: Props) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState<Tooltip>({ display: false });

  const dispatch = useAppDispatch();

  const xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
  const yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]

  const getScale = (isDiscrete: boolean, domain: any, range: any) => {
    if (isDiscrete) {
      return d3.scaleBand(domain, range) as d3.AxisScale<d3.NumberValue>;
    } else {
      return d3.scaleLinear(domain, range) as d3.AxisScale<d3.NumberValue>;
    }
  };

  const getDomain = (varName: VarName, _data: Menu[]) => {
    if (varsDiscrete.some((x) => x === varName)) {
      if (varName == "way") return wayDomain;
      else if (varName == "pat") return patDomain;
      else
        return Array.from(new Set(_data.map((d: any) => d[varName] as string)));
    } else {
      const ret = d3.extent(_data, (d: any) => d[varName]);
      return [
        ret[0] - 0.05 * (ret[1] - ret[0]),
        ret[1] + 0.05 * (ret[1] - ret[0]),
      ];
    }
  };

  const Tooltip = () => {
    if (!tooltip.display || !tooltip.menu) return <></>;

    const { x, y } = tooltip.pos as { x: number; y: number };
    const menu = tooltip.menu;

    const name_words = menu.name.split(" ");
    let lines = [];
    if (name_words.length >= 4) {
      const index = Math.trunc(name_words.length / 2);
      lines.push(name_words.slice(0, index).join(" "));
      lines.push(name_words.slice(index).join(" "));
    } else {
      lines.push(menu.name);
    }

    const dy = lines.length > 1 ? 45 : 27;

    const transform = `translate(${x}, ${y - dy})`;
    const visible = tooltip.display ? "visible" : "hidden";

    return (
      <g transform={transform} visibility={visible}>
        <text
          filter="url(#label-background)"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="0.75rem"
        >
          {lines.map((line, i) => {
            return (
              <tspan key={i} textAnchor="middle" x="0" dy="1.2em">
                {line}
              </tspan>
            );
          })}
        </text>
      </g>
    );
  };

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewbox", [0, 0, width, height].toString())
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.selectAll(".chart-component").remove();

    if (data && svgRef.current) {
      const isXDiscrete = varsDiscrete.some((x) => x === xVar);
      const isYDiscrete = varsDiscrete.some((x) => x === yVar);

      const xDomain = getDomain(xVar, data);
      const yDomain = getDomain(yVar, data);
      const xScale: any = getScale(isXDiscrete, xDomain, xRange);
      const yScale: any = getScale(isYDiscrete, yDomain, yRange);
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      const xAxisGroup = svg
        .append("g")
        .attr("class", "chart-component")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(xAxis);
      // xAxisGroup.select(".domain").remove();
      xAxisGroup.selectAll("line").attr("stroke", "#000000");
      xAxisGroup
        .selectAll("text")
        .attr("fill", "black")
        .attr("font-size", ".75rem");
      xAxisGroup
        .append("text")
        .attr(
          "transform",
          `translate(${(xRange[0] + xRange[1]) / 2}, ${(marginBottom * 3) / 4})`
        )
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", "1rem")
        .text(mapVarNameToLabel[xVar]);

      const yAxisGroup = svg
        .append("g")
        .attr("class", "chart-component")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(yAxis);
      // yAxisGroup.select(".domain").remove();
      yAxisGroup.selectAll("line").attr("stroke", "black");
      yAxisGroup
        .selectAll("text")
        .attr("color", "black")
        .attr("font-size", ".75rem");
      yAxisGroup
        .append("text")
        // .attr("transform", "rotate(-90)")
        .attr(
          "transform",
          `translate(${(-marginLeft * 3) / 4}, ${
            (yRange[0] + yRange[1]) / 2
          }) rotate(-90)`
        )
        // .attr("x", (marginLeft * 3) / 4)
        // .attr("y", (yRange[0] + yRange[1]) / 2)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", "1rem")
        .text(mapVarNameToLabel[yVar]);

      if (isXDiscrete && !isYDiscrete) {
        svg
          .append("g")
          .attr("class", "chart-component")
          .selectAll("rect")
          .data(
            xDomain.map((x, i) => {
              return { x, shaded: i % 2 === 0 };
            })
          )
          .join("rect")
          .attr("x", (d) => xScale(d.x))
          .attr("y", yScale(yDomain[1]))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale(yDomain[0]) - yScale(yDomain[1]))
          .attr("opacity", 0.5)
          .attr("fill", (d) => (d.shaded ? "gray" : "white"));
      } else if (!isXDiscrete && isYDiscrete) {
        svg
          .append("g")
          .attr("class", "chart-component")
          .selectAll("rect")
          .data(
            yDomain.map((y, i) => {
              return { y, shaded: i % 2 === 0 };
            })
          )
          .join("rect")
          .attr("x", xScale(xDomain[0]))
          .attr("y", (d) => yScale(d.y))
          .attr("width", xScale(xDomain[1]) - xScale(xDomain[0]))
          .attr("height", yScale.bandwidth())
          .attr("opacity", 0.5)
          .attr("fill", (d) => (d.shaded ? "gray" : "white"));
      } else if (isXDiscrete && isYDiscrete) {
        svg
          .append("g")
          .attr("class", "chart-component")
          .selectAll("rect")
          .data(
            xDomain.flatMap((x, i) => {
              return yDomain.map((y, j) => {
                return { x, y, shaded: (i + j) % 2 === 0 };
              });
            })
          )
          .join("rect")
          .attr("x", (d) => xScale(d.x))
          .attr("y", (d) => yScale(d.y))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("opacity", 0.5)
          .attr("fill", (d) => (d.shaded ? "gray" : "white"));
      }

      const _data = data.map((d: any) => {
        let x = xScale(d[xVar]);
        let y = yScale(d[yVar]);
        let r = radius;

        if (isXDiscrete) x = x + xScale.bandwidth() / 2;
        if (isYDiscrete) y = y + yScale.bandwidth() / 2;

        const ret: {
          x: number;
          y: number;
          r: number;
          menu: Menu;
        } = {
          x,
          y,
          r,
          menu: d,
        };

        return ret;
      });

      if (forced) {
        const simulation = d3
          .forceSimulation(_data)
          .force(
            "x",
            d3.forceX((d: any) => {
              if (isXDiscrete) return d.x;
              else return xScale.invert(d.x) >= 0 ? d.x : xScale(0);
            })
          )
          .force(
            "y",
            d3.forceY((d: any) => {
              if (isYDiscrete) return d.y;
              else return yScale.invert(d.y) >= 0 ? d.y : yScale(0);
            })
          )
          .force(
            "collide",
            d3.forceCollide((d: any) => d.r + radiusCollide).iterations(4)
          );

        for (let i = 0; i < 100; i++) {
          simulation.tick();
        }
        simulation.stop();
      }

      const bubbles = svg
        .append("g")
        .attr("class", "chart-component")
        .selectAll("a")
        .data(_data)
        .join("a")
        .style("cursor", "pointer")
        .attr("class", "scatterplot-point")
        .on("mouseover", (e, d) => {
          setTooltip({
            display: true,
            menu: d.menu,
            pos: { x: d.x, y: d.y },
          });
        })
        .on("mouseout", (e: any) => {
          setTooltip({ display: false });
        })
        .on("click", (e, d) => {
          setTooltip({ display: false });
          dispatch(loadMenuDetail(d.menu.id));
          dispatch(showModal);
        });

      bubbles
        .append("circle")
        .attr("fill", "white")
        .attr("stroke", "#333333")
        .attr("stroke-width", "2px")
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y)
        .attr("r", (d: any) => d.r);

      // bubbles
      //   .append("text")
      //   .attr("font-size", "0.5rem")
      //   .attr("stroke-linejoin", "round")
      //   .attr("stroke-linecap", "round")
      //   .attr("filter", "url(#label-background")
      //   .attr("fill", "white")
      //   .attr("transform", (d: any) => {
      //     const dy = d.menu.name.split(" ").length >= 4 ? 24 : 12;
      //     return `translate(${d.x}, ${d.y - dy})`;
      //   })
      //   .selectAll("tspan")
      //   .data((d: any) => {
      //     const name_words = d.menu.name.split(" ");
      //     let lines = [];
      //     if (name_words.length >= 4) {
      //       const index = Math.trunc(name_words.length / 2);
      //       lines.push(name_words.slice(0, index).join(" "));
      //       lines.push(name_words.slice(index).join(" "));
      //     } else {
      //       lines.push(d.menu.name);
      //     }
      //     return lines;
      //   })
      //   .join("tspan")
      //   .attr("text-anchor", "middle")
      //   .attr("x", 0)
      //   .attr("dy", "1.2em")
      //   // .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
      //   .text((d) => d);
    }
  }, [data, width, height, forced]);

  return (
    <svg ref={svgRef}>
      <defs>
        <filter
          id="label-background"
          x="-10%"
          y="-25%"
          width="120%"
          height="150%"
        >
          <feFlood floodColor="#333333" />
          <feGaussianBlur stdDeviation="2" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0 1" />
          </feComponentTransfer>

          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1" />
          </feComponentTransfer>
          <feComposite operator="over" in="SourceGraphic" />
        </filter>
      </defs>
      <Tooltip />
    </svg>
  );
};

export default ScatterPlot;
