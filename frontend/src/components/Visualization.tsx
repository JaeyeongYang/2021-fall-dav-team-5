import "./Visualization.css";
import ScatterPlotMenu from "./ScatterPlotMenu";

import PopupWindow from "./PopupWindow";

import ColorSelector from "./ColorSelector";
import BubbleChart from "./BubbleChart";
import { Menu } from "../store/reducers/data";
import './BubbleChart.css'
import { useAppSelector } from "src/hooks";
import {
  selectMenus
} from "src/store/reducers/data";

const Visualization = function () {
    const menus1 = useAppSelector(selectMenus)!;
    const menus2 = menus1?.slice(1, 600).concat(menus1?.slice(601, 1318));
    const shuffled = menus2?.sort(() => Math .random() - 0.5 );
    const selectedMenus = shuffled?.slice(1, 200);

    const selectedKeyHandler = (key: string) => {
        // eslint-disable-next-line no-alert
        alert(key)
      };
    
    if (typeof selectedMenus === typeof undefined){
        console.log('if selected', selectedMenus);
        return (
            <div></div>
        )        
    } else{
        console.log('else selected', selectedMenus)
        return (                
            <div className='vis-div'>                
                <div> 
                    {/* <PopupWindow text="Pie Chart"></PopupWindow> */}
                    <BubbleChart bubblesData={selectedMenus} width={1300} height={700} textFillColor="drakgrey" backgroundColor="#ffffff" minValue={1} maxValue={300} selectedCircle={selectedKeyHandler} />
                </div>
                
                <div className='scatter-plot-menu-div'>                
                    <ScatterPlotMenu></ScatterPlotMenu>
                </div>
            </div>        
        )

    }

};

export default Visualization;

