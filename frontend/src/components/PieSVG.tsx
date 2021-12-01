import React, { useRef, useEffect, useState }  from "react";
import * as d3 from "d3";
import { Menu, MenuDetail } from "src/store/reducers/data";


interface PieProps {
  data: Menu | MenuDetail;
  width:number;
  height:number;
  innerRadius:number;
  outerRadius:number;
}
interface PieDataProps {
  name: string;
  value: number;
}


const Pie = function(props:PieProps) {
  const ref = useRef(null);
  const createPie = d3
    .pie<PieDataProps>()
    .value(d => d.value)
    .sort(null);  
  const createArc = d3
    .arc<d3.PieArcDatum<PieDataProps>>() 
    .outerRadius(props.outerRadius)
    .innerRadius(props.innerRadius);
  const colors: string[] = ['red','green','blue'];
  const vis_data : PieDataProps[]=[
      {name:"탄수화물",value:props.data.carb},
      {name: "단백질", value: props.data.protein},
      {name: "지방", value: props.data.fat}];
  const format = d3.format(".1f");
  const data = createPie(vis_data);


  useEffect(
    () => {
      const data = createPie(vis_data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);
      const legendgroupWithData = group.selectAll("g.legend").data(data);

      groupWithData.exit().remove();
      legendgroupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc"); 

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors[i]);

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .style("fill", "white")
        .style("font-size", 15)
        .text(d => d.value?format(d.value)+"g":'');
    },
    [props.data]
  );


  return (
    <svg width={props.width} height={props.height}>
    <g
      ref={ref}
      transform={`translate(${props.outerRadius} ${props.outerRadius})`}
    />
    <text transform={`translate(${props.outerRadius} ${props.outerRadius})`} text-anchor={"middle"} alignment-baseline={"middle"} font-weight={"bold"} font-size={15}>
      {props.data.energy}kcal
    </text>
    <rect transform={"translate(" + (10) + "," + (props.height - 30) + ")"} width={15} height={15} fill= {colors[0]} />
    <rect transform={"translate(" + (90) + "," + (props.height - 30) + ")"} width={15} height={15} fill= {colors[1]} />
    <rect transform={"translate(" + (170) + "," + (props.height - 30) + ")"} width={15} height={15} fill= {colors[2]} />
    <text transform={"translate(" + (20) + "," + (props.height - 30) + ")"} x={12} y={12} font-size={13}>
      {vis_data[0].name}
    </text>
    <text transform={"translate(" + (100) + "," + (props.height - 30) + ")"} x={12} y={12} font-size={13}>
      {vis_data[1].name}
    </text>
    <text transform={"translate(" + (180) + "," + (props.height - 30) + ")"} x={12} y={12} font-size={13}>
      {vis_data[2].name}
    </text>
    </svg>
  );
};

export default Pie;