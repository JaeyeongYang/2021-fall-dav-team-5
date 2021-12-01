import { PartialRootState } from './configureStore';
import { getPreloadedUIState } from '../store/reducers/UI';
import { getPreloadedDataState } from '../store/reducers/data';
import { getPreloadedFilterState } from '../store/reducers/filter';

const getPreloadedState = (): PartialRootState => {
  return {
    UI: getPreloadedUIState(),
    data: getPreloadedDataState(),
    filter: getPreloadedFilterState(),
  };
};

export default getPreloadedState;