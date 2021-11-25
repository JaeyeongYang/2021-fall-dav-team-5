import {
  createSlice,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export interface Menu {
  id: number;
  name: string;
  way: string;
  pat: string;
  energy: number;
  carb: number;
  protein: number;
  fat: number;
  na: number;
  hashtag: string;
  img_small: string;
  img_large: string;
  ingredients_count: number;
}

export interface Ingredient {
  id: number;
  name: string;
  count: number;
}

export interface Recipe {
  order: number;
  text: string;
  img: string;
}

export interface MenuDetail extends Menu {
  ingredients: string;
  ingredients_set: Array<Ingredient>;
  recipes: Array<Recipe>;
}

export interface IngredientDetail extends Ingredient {
  menus: Array<Menu>;
}

export type ValueCountTuple = [string, number];

export interface DataState {
<<<<<<< HEAD
  flagLoadData?: boolean;
  menus?: Menu[];
=======
  flagLoadMenus?: boolean;
  flagLoadMenuDetail?: boolean;
  menus?: Menu[];
  menuID?: number;
  menuDetail?: MenuDetail;
>>>>>>> main
  ingredients?: Ingredient[];
  ways?: ValueCountTuple[];
  pats?: ValueCountTuple[];
  hashtags?: ValueCountTuple[];
}

<<<<<<< HEAD
export const initialDataState: DataState = {
  flagLoadData: true,
=======
export interface Tag {
  ingredientOrMenu: string;
  radioValue: string;    
}

export const initialDataState: DataState = {
  flagLoadMenus: true,
  flagLoadMenuDetail: false,
>>>>>>> main
};

export const getPreloadedDataState = (): DataState => {
  return {
    ...initialDataState,
  };
};

const slice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
<<<<<<< HEAD
    loadData: (state) => {
      state.flagLoadData = true;
    },
    doneLoadingData: (state) => {
      state.flagLoadData = false;
=======
    loadMenus: (state) => {
      state.flagLoadMenus = true;
    },
    doneLoadingMenus: (state) => {
      state.flagLoadMenus = false;
    },
    loadMenuDetail: (state, action: PayloadAction<number>) => {
      state.menuID = action.payload;
      state.flagLoadMenuDetail = true;
    },
    doneLoadingMenuDetail: (state) => {
      state.flagLoadMenuDetail = false;
    },
    clearMenuDetail: (state) => {
      delete state['menuID'];
      delete state['menuDetail'];
>>>>>>> main
    },
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
<<<<<<< HEAD
=======
    setMenuDetail: (state, action: PayloadAction<MenuDetail>) => {
      state.menuDetail = action.payload;
    },
>>>>>>> main
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload;
    },
    setWays: (state, action: PayloadAction<ValueCountTuple[]>) => {
      state.ways = action.payload;
    },
    setPats: (state, action: PayloadAction<ValueCountTuple[]>) => {
      state.pats = action.payload;
    },
    setHashtags: (state, action: PayloadAction<ValueCountTuple[]>) => {
      state.hashtags = action.payload;
    },
  },
});

const { reducer } = slice;

export const {
<<<<<<< HEAD
  loadData,
  doneLoadingData,
  setMenus,
=======
  loadMenus,
  doneLoadingMenus,
  loadMenuDetail,
  doneLoadingMenuDetail,
  clearMenuDetail,
  setMenus,
  setMenuDetail,
>>>>>>> main
  setIngredients,
  setWays,
  setPats,
  setHashtags,
} = slice.actions;

export const selectMenus = createSelector(
  (state: RootState) => state.data.menus,
  (menus) => menus
);
<<<<<<< HEAD
=======
export const selectMenuDetail = createSelector(
  (state: RootState) => state.data.menuDetail,
  (menuDetail) => menuDetail
);
>>>>>>> main
export const selectIngredients = createSelector(
  (state: RootState) => state.data.ingredients,
  (ingredients) => ingredients
);
export const selectWays = createSelector(
  (state: RootState) => state.data.ways,
  (ways) => ways
);
export const selectPats = createSelector(
  (state: RootState) => state.data.pats,
  (pats) => pats
);
export const selectHashtags = createSelector(
  (state: RootState) => state.data.hashtags,
  (hashtags) => hashtags
);

export default reducer;
