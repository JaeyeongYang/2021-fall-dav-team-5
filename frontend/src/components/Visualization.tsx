import React, { useEffect, useState } from "react";

import {
  mapVarNameToLabel,
  PAGINATION,
  VarContinuous,
  VarName,
  varsContinuous,
  varsName,
} from "src/globals";
import { useAppSelector } from "src/hooks";
import { Menu, selectMenus } from "src/store/reducers/data";
import ScatterPlot from "src/components/charts/ScatterPlot";
import ScatterPlotMenu from "./ScatterPlotMenu";
import "./Visualization.css";
import { Button, Dropdown, Form } from "react-bootstrap";
import getDomain from "src/functions/getDomain";
import RangeSlider from "react-bootstrap-range-slider";

const Visualization = function () {
  const menus: Menu[] = useAppSelector(selectMenus) ?? [];
  const [menusShuffled, setMenusShuffled] = useState<Menu[]>([]);
  const [menusSelected, setMenusSelected] = useState<Menu[]>([]);
  const [index, setIndex] = useState<number>(0);

  // TODO: these states should be stored with redux later
  const [xVar, setXVar] = useState<VarName>("energy");
  const [yVar, setYVar] = useState<VarName>("ingredients_count");
  const [colorVar, setColorVar] = useState<VarName | null>(null);
  const [radiusVar, setRadiusVar] = useState<VarContinuous | null>(null);
  const [radiusMin, setRadiusMin] = useState<number>(1);
  const [radiusMax, setRadiusMax] = useState<number>(10);
  const [forced, setForced] = useState<boolean>(false);
  const [fixXDomain, setFixXDomain] = useState<boolean>(false);
  const [fixYDomain, setFixYDomain] = useState<boolean>(false);

  const xDomain =
    fixXDomain && menus ? getDomain(xVar, menusShuffled) : undefined;
  const yDomain =
    fixYDomain && menus ? getDomain(yVar, menusShuffled) : undefined;

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
    if (menus && menus.length > 0) {
      const _menu: Menu[] = [...menus];
      const _index = 0;
      _menu.sort(() => Math.random() - 0.5);

      setMenusShuffled(_menu);
      setIndex(_index);
    }
  }, [menus]);

  useEffect(() => {
    if (menusShuffled && menusShuffled.length > 0) {
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
      <>
        <div
          style={{
            display: "flex",
            minHeight: "3rem",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dropdown style={{ marginRight: "1rem" }}>
            <Dropdown.Toggle>X축: {mapVarNameToLabel[xVar]}</Dropdown.Toggle>
            <Dropdown.Menu>
              {varsName.map((v, i) => {
                return (
                  <Dropdown.Item key={i} as="button" onClick={() => setXVar(v)}>
                    {mapVarNameToLabel[v]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ marginRight: "1rem" }}>
            <Dropdown.Toggle>Y축: {mapVarNameToLabel[yVar]}</Dropdown.Toggle>
            <Dropdown.Menu>
              {varsName.map((v, i) => {
                return (
                  <Dropdown.Item key={i} as="button" onClick={() => setYVar(v)}>
                    {mapVarNameToLabel[v]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ marginRight: "1rem" }}>
            <Dropdown.Toggle>
              색깔: {colorVar ? mapVarNameToLabel[colorVar] : "-"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={() => setColorVar(null)}>
                -
              </Dropdown.Item>
              <Dropdown.Divider />
              {varsName.map((v, i) => {
                return (
                  <Dropdown.Item
                    key={i}
                    as="button"
                    onClick={() => setColorVar(v)}
                  >
                    {mapVarNameToLabel[v]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown style={{ marginRight: "1rem" }}>
            <Dropdown.Toggle>
              크기: {radiusVar ? mapVarNameToLabel[radiusVar] : "-"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={() => setRadiusVar(null)}>
                -
              </Dropdown.Item>
              <Dropdown.Divider />
              {varsContinuous.map((v, i) => {
                return (
                  <Dropdown.Item
                    key={i}
                    as="button"
                    onClick={() => setRadiusVar(v)}
                  >
                    {mapVarNameToLabel[v]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          style={{
            display: "flex",
            minHeight: "3rem",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ marginRight: "1rem" }}>
            <RangeSlider
              value={radiusMin}
              onChange={(e: any) => {
                setRadiusMin(e.target.value);
              }}
              min={2}
              max={10}
              disabled={radiusVar === null}
              tooltip="on"
            />
          </div>
          <div style={{ marginRight: "1rem" }}>
            <RangeSlider
              value={radiusMax}
              onChange={(e: any) => {
                setRadiusMax(e.target.value);
              }}
              min={2}
              max={20}
              disabled={radiusVar === null}
              tooltip="on"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            minHeight: "3rem",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form.Check
            inline
            id="show-forced-chart"
            label={"Avoid overlapping"}
            checked={forced}
            onChange={() => {
              setForced(!forced);
            }}
          />
          <Form.Check
            inline
            id="fix-x-domain"
            label={"Fix the domain of X axis"}
            checked={fixXDomain}
            onChange={() => {
              setFixXDomain(!fixXDomain);
            }}
          />
          <Form.Check
            inline
            id="fix-y-domain"
            label={"Fix the domain of Y axis"}
            checked={fixYDomain}
            onChange={() => {
              setFixYDomain(!fixYDomain);
            }}
          />
        </div>
      </>
    );
  };

  return (
    <div className="vis-div">
      <OptionBox />
      <ScatterPlot
        data={menus.length > 0 ? menusSelected : []}
        xVar={xVar}
        yVar={yVar}
        colorVar={colorVar}
        radiusVar={radiusVar}
        radiusRange={[radiusMin, radiusMax]}
        xDomain={xDomain}
        yDomain={yDomain}
        width={800}
        height={600}
        forced={forced}
      />
      <Pagination />
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
