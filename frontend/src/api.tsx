import axios from "axios";

export const getMenus = async function() {
    const menus = await axios.get("/menus");
    console.log(menus.data);
    return menus.data;
};

export const getAMenu = async function(id: number) {
    const menu = await axios.get("/menus/" + String(id));
    console.log(menu.data);
    return menu.data;
};