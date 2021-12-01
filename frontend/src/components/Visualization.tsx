import React, { useEffect, useState } from "react";

import { PAGINATION } from "src/globals";
import { useAppSelector } from "src/hooks";
import { Menu, selectMenus } from "src/store/reducers/data";
import ScatterPlot from "src/components/charts/ScatterPlot";
import ScatterPlotMenu from "./ScatterPlotMenu";
import "./Visualization.css";
import { Button, Form } from "react-bootstrap";

const Visualization = function () {
  const menus: Menu[] = useAppSelector(selectMenus) ?? [];
  const [menusShuffled, setMenusShuffled] = useState<Menu[]>([]);
  const [menusSelected, setMenusSelected] = useState<Menu[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [forced, setForced] = useState<boolean>(true);

  // const Visualization = function ({
  //     children,
  //     xAxis,
  //     yAxis,
  //     setXAxis,
  //     setYAxis,
  //     onAlignButtonClick,
  //     onResetButtonClick
  // }:{
  //     children: never[],
  //     xAxis: string,
  //     yAxis: string,
  //     setXAxis: React.Dispatch<React.SetStateAction<string>>,
  //     setYAxis: React.Dispatch<React.SetStateAction<string>>,
  //     onAlignButtonClick: (e: any) => void,
  //     onResetButtonClick: (e: any) => void
  // }) {
  //     const menus1 = useAppSelector(selectMenus)!;
  //     const menus2 = menus1?.slice(1, 600).concat(menus1?.slice(601, 1318));
  //     const shuffled = menus2?.sort(() => Math .random() - 0.5 );
  //     // const selectedMenus = shuffled?.slice(1, 200);
  //     const selectedMenus = shuffled?.slice(1, 20);

  //     const selectedKeyHandler = (key: string) => {
  //         // eslint-disable-next-line no-alert
  //         alert(key)
  //       };

  //     if (typeof selectedMenus === typeof undefined){
  //         console.log('if selected', selectedMenus);
  //         return (
  //             <div></div>
  //         )
  //     } else{
  //         console.log('else selected', selectedMenus)
  //         return (
  //             <div className='vis-div'>
  //                 <div>
  //                     {/* <PopupWindow text="Pie Chart"></PopupWindow> */}
  //                     <BubbleChart
  //                         bubblesData={selectedMenus}
  //                         width={1300}
  //                         height={700}
  //                         textFillColor="drakgrey"
  //                         backgroundColor="#ffffff"
  //                         minValue={1}
  //                         maxValue={300}
  //                         selectedCircle={selectedKeyHandler} />
  //                 </div>

  //             </div>
  //         )
  useEffect(() => {
    if (menus) {
      const _menu: Menu[] = [...menus];
      const _index = 0;
      _menu.sort(() => Math.random() - 0.5);

      setMenusShuffled(_menu);
      setIndex(_index);
    }
  }, [menus]);

  useEffect(() => {
    if (menusShuffled) {
      if (index < 0) {
        setIndex(Math.ceil(menusShuffled.length / PAGINATION) - 1);
      } else if (index * PAGINATION > menusShuffled.length) {
        setIndex(0);
      } else {
        setMenusSelected(
          menusShuffled.slice(
            index * PAGINATION,
            Math.min((index + 1) * PAGINATION, menusShuffled.length)
          )
        );
      }
    }
  }, [menusShuffled, index]);

  const Pagination = () => {
    return (
      <div
        className="pagination"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="dark" onClick={() => setIndex(index - 1)}>
          ◀️
        </Button>
        <Button variant="outline" disabled>
          {index + 1} / {Math.ceil(menusShuffled.length / PAGINATION)}
        </Button>
        <Button variant="dark" onClick={() => setIndex(index + 1)}>
          ▶️
        </Button>
      </div>
    );
  };

  const OptionBox = () => {
    return (
      <div
        className="pagination"
        style={{
          display: "flex",
          height: "2rem",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form>
          <Form.Check
            id="show-forced-chart"
            label={"Avoid overlapping"}
            checked={forced}
            onChange={() => {
              setForced(!forced);
            }}
          />
        </Form>
      </div>
    );
  };

  return (
    <div className="vis-div">
      <ScatterPlot
        data={menusSelected}
        width={800}
        height={600}
        forced={forced}
      />
      <Pagination />
      <OptionBox />
      {/* <div className="scatter-plot-menu-div">
        <ScatterPlotMenu
          xAxis={xAxis}
          yAxis={yAxis}
          setXAxis={setXAxis}
          setYAxis={setYAxis}
          onAlignButtonClick={onAlignButtonClick}
          onResetButtonClick={onResetButtonClick}
        ></ScatterPlotMenu>
      </div> */}
    </div>
  );
};

export default Visualization;
