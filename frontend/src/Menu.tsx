


export function Menu(menu: MenuType){
    return <h4>{menu.name}</h4>;
    // 일단 이름만 
}


export interface MenuType {
	menuId: number;
	name: string;
	way: string;
	pat: string;
    energy: number;
    carb: number;
    protein: number;
    fat: number;
    na: number;
    hashtag: string;
    url_small: string;
    url_large: string;
    ingredients: string; 
    recipes: Array<{order: number, text: Text, img: string}>;
}

