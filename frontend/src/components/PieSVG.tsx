import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Menu, MenuDetail } from "src/store/reducers/data";

interface PieProps {
  data: Menu | MenuDetail | null | undefined;
  width?: number | string;
  height?: number | string;
  innerRadius?: number;
  outerRadius?: number;
  fontSize?: number;
}

interface PieDataProps {
  name: string;
  value: number;
}

const Pie = function ({
  data,
  width = "100%",
  height = "100%",
  outerRadius = 50,
  innerRadius = 20,
  fontSize = 7,
}: PieProps) {
  const ref = useRef(null);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const colorScale: any = d3.scaleOrdinal(
        ["탄수화물", "단백질", "지방"],
        d3.schemeCategory10
      );

      const createPie = d3
        .pie<PieDataProps>()
        .value((d) => d.value)
        .sort(null);

      const createArc = d3
        .arc<d3.PieArcDatum<PieDataProps>>()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

      const _data = createPie([
        { name: "탄수화물", value: (data as Menu | MenuDetail).carb },
        { name: "단백질", value: (data as Menu | MenuDetail).protein },
        { name: "지방", value: (data as Menu | MenuDetail).fat },
      ]);

      const svg = d3.select(ref.current);
      svg.selectAll(".nutrition").remove();

      const nutrition = svg
        .selectAll("g")
        .data(_data)
        .join("g")
        .attr("class", "nutrition");

      nutrition
        .append("path")
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d) => colorScale(d.data.name));

      nutrition
        .append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", (d) => {
          const pos = createArc.centroid(d);
          return `translate(${pos[0]}, ${pos[1] - (fontSize / 2) * 1.5})`;
        })
        .style("fill", "white")
        .style("font-weight", "bold")
        .style("font-size", fontSize)
        .text((d) => (d.value ? `${d.data.name}` : ""));

      nutrition
        .append("text")
        .attr("class", "value")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", (d) => {
          const pos = createArc.centroid(d);
          return `translate(${pos[0]}, ${pos[1] + (fontSize / 2) * 1.5})`;
        })
        .style("fill", "white")
        .style("font-size", fontSize)
        .text((d) => (d.value ? `${d.value}g` : ""));
    }
  }, [data, width, height, fontSize]);

  if (data === null || data === undefined) {
    return <></>;
  }

  return (
    <div>
      <svg
        width={width}
        height={height}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <g ref={ref} x="50%" y="50%" transform="translate(50, 50)" />
        <text
          x="50%"
          y="50%"
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontWeight={"bold"}
          fontSize={7}
        >
          {data.energy}kcal
        </text>
      </svg>
    </div>
  );
};

export default Pie;
