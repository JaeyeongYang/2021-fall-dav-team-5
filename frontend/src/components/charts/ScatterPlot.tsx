import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { loadMenuDetail, Menu } from "src/store/reducers/data";
import { useAppDispatch } from "src/hooks";
import { showModal } from "src/store/reducers/UI";
import {
  varsDiscrete,
  VarName,
  mapVarNameToLabel,
  VarContinuous,
} from "src/globals";
import getDomain from "src/functions/getDomain";
import getScale from "src/functions/getScale";
import getColorScale from "src/functions/getColorScale";

interface Tooltip {
  display: boolean;
  menu?: Menu;
  pos?: { x: number; y: number };
}

interface Props {
  data: Menu[];
  width: number;
  height: number;
  xVar: VarName;
  yVar: VarName;
  colorVar?: VarName | null;
  xDomain?: Array<string | number>;
  yDomain?: Array<string | number>;
  radiusVar?: VarContinuous | null;
  radius?: number;
  radiusCollide?: number;
  radiusRange?: [number, number];
  forced?: boolean;
  borderColor?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  inset?: number;
  insetTop?: number;
  insetRight?: number;
  insetBottom?: number;
  insetLeft?: number;
}

const TooltipComponent = ({ tooltip }: { tooltip: Tooltip }) => {
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

const ScatterPlot = ({
  data,
  width,
  height,
  xVar,
  yVar,
  colorVar,
  xDomain,
  yDomain,
  radiusVar,
  radius = 5,
  radiusCollide = 1,
  radiusRange = [2, radius * 2],
  forced = true,
  borderColor = "white",
  marginTop = 60,
  marginRight = 60,
  marginBottom = 60,
  marginLeft = 60,
  inset = 0,
  insetTop = inset,
  insetRight = inset,
  insetBottom = inset,
  insetLeft = inset,
}: Props) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState<Tooltip>({ display: false });

  const dispatch = useAppDispatch();

  const xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
  const yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]

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
      const isColorDiscrete = varsDiscrete.some((x) => x === colorVar);

      xDomain = xDomain === undefined ? getDomain(xVar, data) : xDomain;
      yDomain = yDomain === undefined ? getDomain(yVar, data) : yDomain;
      const colorDomain = colorVar ? getDomain(colorVar, data) : null;
      const radiusDomain = radiusVar ? getDomain(radiusVar, data) : null;

      const xScale: any = getScale(isXDiscrete, xDomain, xRange);
      const yScale: any = getScale(isYDiscrete, yDomain, yRange);
      const colorScale: any = colorVar
        ? getColorScale(isColorDiscrete, colorDomain)
        : null;
      const radiusScale: any = radiusVar
        ? getScale(false, radiusDomain, radiusRange)
        : null;

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      const xAxisGroup = svg
        .append("g")
        .attr("class", "chart-component")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(xAxis);
      xAxisGroup.select(".domain").remove();
      xAxisGroup.selectAll("line").attr("stroke", "#000000");
      xAxisGroup
        .selectAll(".tick line")
        .clone()
        .attr("y2", marginTop + marginBottom - height)
        .attr("stroke-opacity", 0.1);
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
      yAxisGroup.select(".domain").remove();
      yAxisGroup.selectAll("line").attr("stroke", "black");
      yAxisGroup
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1);
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
          .attr("x", (d: any) => xScale(d.x))
          .attr("y", yScale(yDomain[1]))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale(yDomain[0]) - yScale(yDomain[1]))
          .attr("opacity", 0.3)
          .attr("fill", (d: any) => (d.shaded ? "gray" : "white"));
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
          .attr("y", (d: any) => yScale(d.y))
          .attr("width", xScale(xDomain[1]) - xScale(xDomain[0]))
          .attr("height", yScale.bandwidth())
          .attr("opacity", 0.3)
          .attr("fill", (d: any) => (d.shaded ? "gray" : "white"));
      } else if (isXDiscrete && isYDiscrete) {
        svg
          .append("g")
          .attr("class", "chart-component")
          .selectAll("rect")
          .data(
            xDomain.flatMap((x, i) => {
              return yDomain?.map((y, j) => {
                return { x, y, shaded: (i + j) % 2 === 0 };
              });
            })
          )
          .join("rect")
          .attr("x", (d: any) => xScale(d.x))
          .attr("y", (d: any) => yScale(d.y))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("opacity", 0.3)
          .attr("fill", (d: any) => (d.shaded ? "gray" : "white"));
      }

      const _data = data.map((d: any) => {
        let x = xScale(d[xVar]);
        let y = yScale(d[yVar]);
        let r = radiusVar && radiusScale ? radiusScale(d[radiusVar]) : radius;
        let c = colorVar && colorScale ? colorScale(d[colorVar]) : null;

        if (isXDiscrete) x = x + xScale.bandwidth() / 2;
        if (isYDiscrete) y = y + yScale.bandwidth() / 2;

        const ret: {
          x: number;
          y: number;
          r: number;
          c: string;
          menu: Menu;
        } = {
          x,
          y,
          r,
          c,
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
        .attr("fill", (d) => (d.c ? d.c : "black"))
        .attr("stroke", colorVar ? "black" : borderColor)
        .attr("stroke-width", 1)
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
  }, [
    data,
    xVar,
    yVar,
    colorVar,
    radiusVar,
    radiusRange,
    width,
    height,
    forced,
    xDomain,
    yDomain,
  ]);

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
      <TooltipComponent tooltip={tooltip} />
    </svg>
  );
};

export default ScatterPlot;
