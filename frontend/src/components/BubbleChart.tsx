import React from "react";
import * as d3 from "d3";
import { Simulation, SimulationNodeDatum } from "d3-force";
import "./BubbleChart.css";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Menu } from "src/store/reducers/data";
import PopOver from "./PopupWindow";

const uuid = require("react-uuid");

interface ForceMenu {
  size: number;
}

class BubbleChart extends React.Component<
  IBubbleChartProps,
  IBubbleChartState
> {
  public forceData: ForceMenu[];

  private simulation: Simulation<SimulationNodeDatum, undefined> | undefined;

  constructor(props: IBubbleChartProps) {
    super(props);
    this.state = {
      data: [],
    };
    this.forceData = this.setForceData(props);
  }

  componentDidMount() {
    this.animateBubbles();
  }

  componentDidUpdate(
    prevProps: IBubbleChartProps,
    prevState: IBubbleChartState
  ) {
    if (
      JSON.stringify(prevProps.bubblesData) !==
      JSON.stringify(this.props.bubblesData)
    ) {
      this.forceData = this.setForceData(this.props);
      this.animateBubbles();
    }
  }

  setForceData = (props: IBubbleChartProps) => {
    const d = [];
    for (let i = 0; i < props.bubblesData.length; i++) {
      d.push({ size: 120 }); // props.bubblesData[i].size로 추후 변경
    }
    return d;
  };

  animateBubbles = () => {
    if (this.props.bubblesData.length > 0) {
      this.simulatePositions(this.forceData);
    }
  };

  radiusScale = (value: d3.NumberValue) => {
    const fx = d3
      .scaleSqrt()
      .range([1, 50])
      .domain([this.props.minValue, this.props.maxValue]);
    return fx(value);
  };

  simulatePositions = (data: ForceMenu[]) => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data as SimulationNodeDatum[])
      .velocityDecay(0.2)
      .force("x", d3.forceX().strength(0.04)) // 보이는 방법
      .force("y", d3.forceY().strength(0.04))
      .force(
        "collide",
        d3.forceCollide((d: SimulationNodeDatum) => {
          return this.radiusScale((d as ForceMenu).size) + 2;
        })
      )
      .on("tick", () => {
        this.setState({ data });
      });
  };

  backgroundColor = (aMenu: Menu, value: string) => {
    const val = value === "way" ? aMenu.way : aMenu.pat;

    if (val === "굽기" || val == "밥") {
      return "#FFCEC7"; // pink
    } else if (val === "끓이기" || val == "국&찌개") {
      return "#FBDEA2"; // yellow
    } else if (val === "볶기" || val == "반찬") {
      return "#B6DEE7"; // blue
    } else if (val === "찌기" || val == "일품") {
      return "#9ADBC7"; // green
    } else if (val === "튀기기" || val == "후식") {
      return "#C9CBE0"; // light pink
    } else {
      return "#E2E2E2 "; // light grey
    }
  };

  renderBubbles = (data: []) => {
    return data.map((item: { v: number; x: number; y: number }, index) => {
      const { props } = this;
      const fontSize =
        this.radiusScale((item as unknown as ForceMenu).size) / 3;
      const content =
        props.bubblesData.length > index ? props.bubblesData[index].name : "";
      const content_menu = props.bubblesData[index]; // id 형태로 읽어와서 popup에서 읽는 형태로 변경
      const strokeColor =
        props.bubblesData.length > index
          ? "darkgrey"
          : this.props.backgroundColor;
      return (
        <OverlayTrigger placement="top" overlay={PopOver(content_menu)}>
          <g
            key={`g-${uuid()}`}
            transform={`translate(${props.width / 2 + item.x - 70}, ${
              props.height / 2 + item.y
            })`}
          >
            <circle
              style={{ cursor: "pointer" }}
              id="circleSvg"
              r={this.radiusScale((item as unknown as ForceMenu).size)}
              fill={this.backgroundColor(props.bubblesData[index], "way")}
              stroke={"#ffffffff"} //strokeColor
              strokeWidth="2"
            />
            <text
              dy="6"
              className="bubbleText"
              fill={this.props.textFillColor}
              textAnchor="middle"
              fontSize={`${fontSize}px`}
              fontWeight="bold"
              textLength="50"
              lengthAdjust="spacingAndGlyphs" // 더 예쁘게 바꿀 수 있으면 좋겠음
            >
              {content}
            </text>
          </g>
        </OverlayTrigger>
      );
    });
  };

  render() {
    return (
      <div>
        <Button
          className="buttonFixed"
          variant="contained"
          color="default"
          onClick={() => {
            this.animateBubbles();
          }}
        >
          Animate
        </Button>

        <div
          aria-hidden="true"
          id="chart"
          style={{ background: this.props.backgroundColor, cursor: "pointer" }}
        >
          <svg width={this.props.width} height={this.props.height}>
            {this.renderBubbles(this.state.data as [])}
          </svg>
        </div>
      </div>
    );
  }
}

interface IBubbleChartProps {
  bubblesData: Menu[];
  width: number;
  height: number;
  textFillColor: string;
  backgroundColor: string;
  minValue: number;
  maxValue: number;
  selectedCircle: (content: string) => void;
}

interface IBubbleChartState {
  data: ForceMenu[];
}

export default BubbleChart;
