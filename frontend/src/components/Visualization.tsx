import "./Visualization.css";
import ScatterPlotMenu from "./ScatterPlotMenu";

import PopupWindow from "./PopupWindow";

import ColorSelector from "./ColorSelector";
import BubbleChart from "./BubbleChart";
import { Menu } from "../store/reducers/data";
import "./BubbleChart.css";
import { useAppSelector } from "src/hooks";
import { selectMenus } from "src/store/reducers/data";

const Visualization = function () {
  const menus = useAppSelector(selectMenus) ?? [];
  // const shuffled = menus?.sort(() => Math.random());
  const selectedMenus = menus?.slice(0, menus.length > 50 ? 50 : menus.length);

  const selectedKeyHandler = (key: string) => {
    // eslint-disable-next-line no-alert
    alert(key);
  };

  return (
    <div className="vis-div">
      <div>
        {/* <PopupWindow text="Pie Chart"></PopupWindow> */}
        <BubbleChart
          bubblesData={selectedMenus}
          width={1300}
          height={700}
          textFillColor="drakgrey"
          backgroundColor="#ffffff"
          minValue={1}
          maxValue={300}
          selectedCircle={selectedKeyHandler}
        />
      </div>

      <div className="scatter-plot-menu-div">
        <ScatterPlotMenu></ScatterPlotMenu>
      </div>
    </div>
  );
};

export default Visualization;
