import {
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

import { RootState } from '../configureStore';

export type UIState = {
  displayModal?: boolean;
};

export const initialUIState: UIState = {
  displayModal: false,
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
    showModal: (state) => {
      state.displayModal = true;
    },
    hideModal: (state) => {
      state.displayModal = false;
    },
  },
});

const { reducer } = slice;

export const {
  showModal,
  hideModal,
} = slice.actions;

export const selectDisplayModal = createSelector(
  (state: RootState) => state.UI.displayModal, (x) => x
);

export default reducer;