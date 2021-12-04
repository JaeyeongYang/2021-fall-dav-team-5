import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { loadMenuDetail, Menu } from "src/store/reducers/data";
import { useAppDispatch } from "src/hooks";
import { showModal } from "src/store/reducers/UI";
import { varsDiscrete, VarName, VarContinuous } from "src/globals";
import getDomain from "src/functions/getDomain";
import getScale from "src/functions/getScale";
import getColorScale from "src/functions/getColorScale";
import TooltipComponent, { Tooltip } from "./TooltipComponent";

interface Props {
  data: Menu[];
  width: number;
  height: number;
  colorVar?: VarName | null;
  radiusVar?: VarContinuous | null;
  radius?: number;
  radiusCollide?: number;
  radiusRange?: [number, number];
  fillColor?: string;
  fillOpacity?: number;
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

const BubbleChart = ({
  data,
  width,
  height,
  colorVar,
  radiusVar,
  radius = 30,
  radiusCollide = 5,
  radiusRange = [radius / 4, radius * 2],
  fillColor = "white",
  fillOpacity = 0.5,
  borderColor = "black",
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
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .selectAll(".graph");

    svg.selectAll("g").remove();

    if (data && svgRef.current) {
      const isColorDiscrete = varsDiscrete.some((x) => x === colorVar);

      const colorDomain = colorVar ? getDomain(colorVar, data) : null;
      const radiusDomain = radiusVar ? getDomain(radiusVar, data) : null;

      const colorScale: any = colorVar
        ? getColorScale(isColorDiscrete, colorDomain)
        : null;
      const radiusScale: any = radiusVar
        ? getScale(false, radiusDomain, radiusRange)
        : null;

      const _data = data.map((d: any) => {
        let x = xRange.reduce((a, b) => a + b) / 2;
        let y = yRange.reduce((a, b) => a + b) / 2;
        let r = radiusVar && radiusScale ? radiusScale(d[radiusVar]) : radius;
        let c = colorVar && colorScale ? colorScale(d[colorVar]) : null;

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

      const simulation = d3
        .forceSimulation(_data)
        .force(
          "x",
          d3.forceX((d: any) => d.x)
        )
        .force(
          "y",
          d3.forceY((d: any) => d.y)
        )
        .force(
          "collide",
          d3.forceCollide((d: any) => d.r + radiusCollide).iterations(4)
        );

      for (let i = 0; i < 100; i++) {
        simulation.tick();
      }
      simulation.stop();

      const bubbles = svg
        .append("g")
        .attr("class", "chart-component")
        .selectAll("g")
        .data(_data)
        .join("g")
        .style("cursor", "pointer")
        .attr("class", "scatterplot-point")
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
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
          dispatch(loadMenuDetail(d.menu.id));
          dispatch(showModal());
          setTooltip({ display: false });
        });

      bubbles
        .append("circle")
        .attr("fill", (d) => (d.c ? d.c : fillColor))
        .attr("fill-opacity", fillOpacity)
        .attr("stroke", colorVar ? "black" : borderColor)
        .attr("stroke-width", 1)
        .attr("r", (d: any) => d.r);

      const uid = `O-${Math.random().toString(16).slice(2)}`;

      bubbles
        .append("clipPath")
        .attr("id", (d) => `${uid}-clip-${d.menu.id}`)
        .append("circle")
        .attr("r", (d) => d.r);

      bubbles
        .append("text")
        .attr(
          "clip-path",
          (d) =>
            `url(${new URL(
              `#${uid}-clip-${d.menu.id}`,
              "http://localhost:3000"
            )})`
        )
        .attr("font-size", "0.75rem")
        .attr("fill", "black")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .style("font-weight", "bold")
        .selectAll("tspan")
        .data((d: any) => {
          const name_words = d.menu.name.split(" ");
          let lines = [];
          if (name_words.length >= 4) {
            const index = Math.trunc(name_words.length / 2);
            lines.push(name_words.slice(0, index).join(" "));
            lines.push(name_words.slice(index).join(" "));
          } else {
            lines.push(d.menu.name);
          }
          return lines;
        })
        .join("tspan")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${1.25 * (i - D.length / 2) + 1}em`)
        .text((d) => d);

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
  }, [data, colorVar, radiusVar, radiusRange, width, height]);

  return (
    <svg ref={svgRef}>
      <g className="graph" />
      <TooltipComponent tooltip={tooltip} />
    </svg>
  );
};

export default BubbleChart;
