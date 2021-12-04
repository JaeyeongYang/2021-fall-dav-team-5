import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { loadMenuDetail, Menu } from "src/store/reducers/data";
import { useAppDispatch } from "src/hooks";
import { showModal } from "src/store/reducers/UI";
import {
  varsDiscrete,
  VarName,
  VarContinuous,
  mapVarNameToLabel,
} from "src/globals";
import getDomain from "src/functions/getDomain";
import getScale from "src/functions/getScale";
import getColorScale from "src/functions/getColorScale";
import TooltipComponent, { Tooltip } from "./TooltipComponent";
import { displayPartsToString } from "typescript";

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
  radiusRange = [radius / 5, radius * 1.5],
  fillColor = "white",
  fillOpacity = 0.5,
  borderColor = "black",
  marginTop = 60,
  marginRight = 200,
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
      .attr("viewbox", "0 0 100 100")
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .selectAll(".graph");

    svg.selectAll("g").remove();
    svg.selectAll("circle").remove();
    svg.selectAll("text").remove();
    svg.selectAll("image").remove();

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

      // Color legend
      if (colorVar !== undefined && colorVar !== null && colorVar !== "") {
        const cDomain = colorDomain
          ? isColorDiscrete
            ? [0].concat(colorDomain)
            : colorDomain
          : [];
        const legend = svg
          .append("g")
          .attr("class", "legends")
          .data(cDomain)
          .enter();

        legend.selectAll("circle").remove();
        legend.selectAll("text").remove();

        svg
          .append("text")
          .attr("class", "legend-title")
          .style("font-weight", "bold")
          .attr("x", 740)
          .attr("y", 175)
          .text(mapVarNameToLabel[colorVar as string]);

        if (isColorDiscrete) {
          legend
            .append("circle")
            .attr("cx", 740)
            .attr("cy", function (d, i) {
              return 175 + i * 25;
            })
            .attr("r", 7)
            .attr("fill", function (d) {
              return colorScale(d);
            });

          legend
            .append("text")
            .attr("x", 760)
            .attr("y", function (d, i) {
              return 175 + i * 25;
            })
            .attr("fill", "black")
            .text(function (d) {
              return d;
            })
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle");
        } else {
          var tmp = Number(cDomain[0]);
          var lDomain = [Math.round(cDomain[0])];
          const range = cDomain[1] - cDomain[0];

          for (var i = 1; i < 6; i++) {
            var tmp = Math.round(tmp + range / 5);
            lDomain.push(tmp);
          }

          svg
            .selectAll("legends")
            .data(lDomain)
            .enter()
            .append("text")
            .attr("x", 760)
            .attr("y", function (d, i) {
              return 200 + i * 25;
            })
            .attr("fill", "black")
            .text(function (d) {
              return d;
            })
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle");

          const n = Math.min(
            colorScale.domain().length,
            colorScale.range().length
          );

          let x = colorScale
            .copy()
            .rangeRound(
              d3.quantize(d3.interpolate(marginLeft, width - marginRight), n)
            );

          const ramp = (color: any, n = 256) => {
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = n;

            const context = canvas.getContext("2d");
            for (let i = 0; i < n; ++i) {
              (context as any).fillStyle = color(i / (n - 1));
              (context as any).fillRect(0, i, 1, 1);
            }
            return canvas;
          };

          svg
            .append("image")
            .attr("x", 740)
            .attr("y", 200)
            .attr("width", 10)
            .attr("height", 125)
            .attr("preserveAspectRatio", "none")
            .attr(
              "xlink:href",
              ramp(
                colorScale.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
              ).toDataURL()
            );
        }
      }

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
          if (!tooltip.display) {
            setTooltip({
              display: true,
              menu: d.menu,
              pos: { x: d.x, y: d.y },
            });
          }
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
