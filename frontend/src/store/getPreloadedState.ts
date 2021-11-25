import { PartialRootState } from './configureStore';
import { getPreloadedUIState } from '../store/reducers/UI';
import { getPreloadedDataState } from '../store/reducers/data';

const getPreloadedState = (): PartialRootState => {
  return {
    UI: getPreloadedUIState(),
    data: getPreloadedDataState(),
  };
};

export default getPreloadedState;