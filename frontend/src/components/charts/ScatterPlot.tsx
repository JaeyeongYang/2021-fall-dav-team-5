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
import TooltipComponent, { Tooltip } from "./TooltipComponent";

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
        legend.selectAll(".legend-text").remove(); 

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
            .attr('class', 'legend-text')
            .attr("x", 760)
            .attr("y", function (d, i) {
              return 175 + i * 25;
            })
            .attr("fill", "black")
            .attr('class', 'legend-text')
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
      } // if (colorVar !== undefined && colorVar !== null && colorVar !== "")

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

      // if (forced) {
      //   const simulation = d3
      //     .forceSimulation(_data)
      //     .force(
      //       "x",
      //       d3.forceX((d: any) => {
      //         if (isXDiscrete) return d.x;
      //         else return xScale.invert(d.x) >= 0 ? d.x : xScale(0);
      //       })
      //     )
      //     .force(
      //       "y",
      //       d3.forceY((d: any) => {
      //         if (isYDiscrete) return d.y;
      //         else return yScale.invert(d.y) >= 0 ? d.y : yScale(0);
      //       })
      //     )
      //     .force(
      //       "collide",
      //       d3.forceCollide((d: any) => d.r + radiusCollide).iterations(4)
      //     );

      //   for (let i = 0; i < 100; i++) {
      //     simulation.tick();
      //   }
      //   simulation.stop();
      // }

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
          dispatch(loadMenuDetail(d.menu.id));
          dispatch(showModal());
          setTooltip({ display: false });
        });

      bubbles
        .append("circle")
        .attr("fill", (d) => (d.c ? d.c : "black"))
        .attr("stroke", colorVar ? "black" : borderColor)
        .attr("stroke-width", 1)
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y)
        .attr("r", (d: any) => d.r);
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
      <g className="graph" />
      <TooltipComponent tooltip={tooltip} />
    </svg>
  );
};

export default ScatterPlot;
