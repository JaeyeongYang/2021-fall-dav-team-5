import "./Visualization.css";
import ScatterPlotMenu from "./ScatterPlotMenu";

import PopupWindow from "./PopupWindow";

const Visualization = function ({
    menus,
    menu
}:{
    menus: Promise<any>,
    menu: Promise<any>
}) {    
    
    return (                
        <div className='vis-div'>                    
            <div> 
                {/* 채: 여기서 작업하시면 됩니다. */}
                <PopupWindow text="Pie Chart"></PopupWindow>
                <p>버블 차트 들어가는 곳</p>
            </div>
            
            <div className='scatter-plot-menu-div'>                
                <ScatterPlotMenu></ScatterPlotMenu>
            </div>
        </div>        
    )
};

export default Visualization;

