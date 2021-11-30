import { sort } from "d3";
import React, { useEffect, useState } from "react";

import { PAGINATION } from "src/globals";
import { useAppSelector } from "src/hooks";
import { Menu, selectMenus } from "src/store/reducers/data";
import ScatterPlot from "src/components/charts/ScatterPlot";
import ScatterPlotMenu from "./ScatterPlotMenu";
import "./Visualization.css";

const Visualization = function () {
  const menus: Menu[] = useAppSelector(selectMenus) ?? [];
  const [menusShuffled, setMenusShuffled] = useState<Menu[]>([]);
  const [menusSelected, setMenusSelected] = useState<Menu[]>([]);
  const [index, setIndex] = useState<number>(0);

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
      if (index < 0 || index * PAGINATION > menusShuffled.length) {
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

  return (
    <div className="vis-div">
      <ScatterPlot data={menusSelected} width={800} height={600} />
      <div className="scatter-plot-menu-div">
        <ScatterPlotMenu></ScatterPlotMenu>
      </div>
    </div>
  );
};

export default Visualization;
