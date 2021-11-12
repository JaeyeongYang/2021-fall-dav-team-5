<<<<<<< HEAD
=======



>>>>>>> 0c79d81e7b319cacbe347edcc02aa6c0185073d7
export function Menu(menu: MenuType){
    return <h4>{menu.name}</h4>;
    // 일단 이름만 
}

<<<<<<< HEAD
=======

>>>>>>> 0c79d81e7b319cacbe347edcc02aa6c0185073d7
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
<<<<<<< HEAD
}
=======
}

>>>>>>> 0c79d81e7b319cacbe347edcc02aa6c0185073d7
