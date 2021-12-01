import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

import { RootState } from '../configureStore';

export type UIState = {
  displayDetailView?: boolean;
};

export const initialUIState: UIState = {
  displayDetailView: false,
};

export const getPreloadedUIState = (): UIState => {
  return {
    ...initialUIState,
  };
};

const slice = createSlice({
  name: 'UI',
  initialState: initialUIState,
  reducers: {
    showDetailView: (state) => {
      state.displayDetailView = true;
    },
    hideDetailView: (state) => {
      state.displayDetailView = true;
    },
  },
});

const { reducer } = slice;

export const {
  showDetailView,
  hideDetailView,
} = slice.actions;

export const selectDisplayDetailView = createSelector(
  (state: RootState) => state.UI.displayDetailView,
  (displayDetailView) => displayDetailView
);

export default reducer;