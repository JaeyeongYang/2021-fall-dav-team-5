import {
  createSlice,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from '../configureStore';

export enum SearchTermType {
  menu = 'menu',
  ingredient = 'ingredient',
}

export interface SearchTerm {
  name: string;
  type: SearchTermType;
  isParsed?: boolean;
  excluded?: boolean;
}

export const isEqualSearchTerm = (x: SearchTerm, y: SearchTerm) => {
  return (
    (x.name == y.name) &&
    (x.type == y.type) &&
    ((x.type == SearchTermType.ingredient)
      ? (
        ((x.isParsed ?? false) == (y.isParsed ?? false)) &&
        ((x.excluded ?? false) == (y.excluded ?? false))
      )
      : (true))
  )
}

export interface FilterState {
  terms?: SearchTerm[];
  way?: string[];
  pat?: string[];
  energy_min?: number;
  energy_max?: number;
  carb_min?: number;
  carb_max?: number;
  protein_min?: number;
  protein_max?: number;
  fat_min?: number;
  fat_max?: number;
  na_min?: number;
  na_max?: number;
  hashtag?: string[];
}

export const initialFilterState: FilterState = {
  terms: [],
  way: [],
  pat: [],
  hashtag: [],
};

export const getPreloadedFilterState = (): FilterState => {
  return {
    ...initialFilterState,
  };
};

const _addFilter = (state: FilterState, action: PayloadAction<string>, key: string) => {
  // @ts-ignore
  if (state[key] === undefined) state[key] = [];
  if (action.payload != '') {
    // @ts-ignore
    state[key].push(action.payload);
  }
}

const _removeFilter = (state: FilterState, action: PayloadAction<string>, key: string) => {
  // @ts-ignore
  if (state[key] === undefined) state[key] = [];
  // @ts-ignore
  const index = state[key].indexOf(action.payload);
  // @ts-ignore
  if (index != -1) state[key].splice(index, 1)
}

const _clearFilter = (state: FilterState, key: string) => {
  // @ts-ignore
  state[key] = [];
}

const slice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<SearchTerm>) => {
      if (state.terms === undefined) state.terms = [];
      state.terms.push(action.payload);
    },
    removeSearchTerm: (state, action: PayloadAction<SearchTerm>) => {
      if (state.terms === undefined) state.terms = [];
      const term = action.payload;
      const index = (
        state.terms.map((x) => isEqualSearchTerm(x, term)).indexOf(true)
      )
      if (index != -1) state.terms.splice(index, 1);
    },
    clearSearchTerm: (state) => _clearFilter(state, 'terms'),
    addNameFilter: (state, action: PayloadAction<string>) => _addFilter(state, action, 'name'),
    removeNameFilter: (state, action: PayloadAction<string>) => _removeFilter(state, action, 'name'),
    clearNameFilter: (state) => _clearFilter(state, 'name'),
    addWayFilter: (state, action: PayloadAction<string>) => _addFilter(state, action, 'way'),
    removeWayFilter: (state, action: PayloadAction<string>) => _removeFilter(state, action, 'way'),
    clearWayFilter: (state) => _clearFilter(state, 'way'),
    addPatFilter: (state, action: PayloadAction<string>) => _addFilter(state, action, 'pat'),
    removePatFilter: (state, action: PayloadAction<string>) => _removeFilter(state, action, 'pat'),
    clearPatFilter: (state) => _clearFilter(state, 'pat'),
    setEnergyMinFilter: (state, action: PayloadAction<number>) => { state.energy_min = action.payload; },
    setEnergyMaxFilter: (state, action: PayloadAction<number>) => { state.energy_max = action.payload; },
    clearEnergyMinFilter: (state) => { delete state['energy_min']; },
    clearEnergyMaxFilter: (state) => { delete state['energy_max']; },
    setCarbMinFilter: (state, action: PayloadAction<number>) => { state.carb_min = action.payload; },
    setCarbMaxFilter: (state, action: PayloadAction<number>) => { state.carb_max = action.payload; },
    clearCarbMinFilter: (state) => { delete state['carb_min']; },
    clearCarbMaxFilter: (state) => { delete state['carb_max']; },
    setProteinMinFilter: (state, action: PayloadAction<number>) => { state.protein_min = action.payload; },
    setProteinMaxFilter: (state, action: PayloadAction<number>) => { state.protein_max = action.payload; },
    clearProteinMinFilter: (state) => { delete state['protein_min']; },
    clearProteinMaxFilter: (state) => { delete state['protein_max']; },
    setFatMinFilter: (state, action: PayloadAction<number>) => { state.fat_min = action.payload; },
    setFatMaxFilter: (state, action: PayloadAction<number>) => { state.fat_max = action.payload; },
    clearFatMinFilter: (state) => { delete state['fat_min']; },
    clearFatMaxFilter: (state) => { delete state['fat_max']; },
    setNaMinFilter: (state, action: PayloadAction<number>) => { state.na_min = action.payload; },
    setNaMaxFilter: (state, action: PayloadAction<number>) => { state.na_max = action.payload; },
    clearNaMinFilter: (state) => { delete state['na_min']; },
    clearNaMaxFilter: (state) => { delete state['na_max']; },
    addHashtagFilter: (state, action: PayloadAction<string>) => _addFilter(state, action, 'hashtag'),
    removeHashtagFilter: (state, action: PayloadAction<string>) => _removeFilter(state, action, 'hashtag'),
    clearHashtagFilter: (state) => _clearFilter(state, 'hashtag'),
  },
});

const { reducer } = slice;

export const {
  addSearchTerm,
  removeSearchTerm,
  clearSearchTerm,
  addWayFilter,
  removeWayFilter,
  clearWayFilter,
  addPatFilter,
  removePatFilter,
  clearPatFilter,
  setEnergyMinFilter,
  setEnergyMaxFilter,
  clearEnergyMinFilter,
  clearEnergyMaxFilter,
  setCarbMinFilter,
  setCarbMaxFilter,
  clearCarbMinFilter,
  clearCarbMaxFilter,
  setProteinMinFilter,
  setProteinMaxFilter,
  clearProteinMinFilter,
  clearProteinMaxFilter,
  setFatMinFilter,
  setFatMaxFilter,
  clearFatMinFilter,
  clearFatMaxFilter,
  setNaMinFilter,
  setNaMaxFilter,
  clearNaMinFilter,
  clearNaMaxFilter,
  addHashtagFilter,
  removeHashtagFilter,
  clearHashtagFilter,
} = slice.actions;

export const selectMenus = createSelector(
  (state: RootState) => state.filter,
  (filter) => filter
);
export const selectSearchTerms = createSelector(
  (state: RootState) => state.filter.terms,
  (terms) => terms
);

export default reducer;