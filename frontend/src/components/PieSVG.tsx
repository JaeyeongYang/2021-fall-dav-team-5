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
      {name:"carb",value:props.data.carb},
      {name: "protein", value: props.data.protein},
      {name: "fat", value: props.data.fat}];
  const format = d3.format(".1f");
  const data = createPie(vis_data);


  useEffect(
    () => {
      const data = createPie(vis_data);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);
      const legendgroupWithData = group.selectAll(".legend").data(data);

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

      // const legendG = legendgroupWithData
      //   .enter().append("g")
      //   .attr("class", "legend")   
      //   .attr("transform", function(d,i){
      //     return "translate(" + (i * 15 + 20) + "," + (props.height - 110) + ")";
      //   })
      

      const legendG = legendgroupWithData
        .enter().append("g")
        .attr("class", "legend")   
        .attr("transform", function(d,i){
          return "translate(" + (i * 15 + 20) + "," + (props.height - 30) + ")";
        })

      legendG.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d, i) => colors[i]);
      
      legendG.append("text")
        .text(function(d){
          return d.value + "  " + d.data.name;
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);

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
    </svg>
  );
};

export default Pie;