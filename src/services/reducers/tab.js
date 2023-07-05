import {
  SET_TAB_ACTIVE,
} from '../actions';

const tabState = {
  tab: 'bun',
};

export const tabReducer = (state = tabState, action) => {
  switch (action.type) {
    case SET_TAB_ACTIVE: {
      return {
        ...state,
        tab: action.tab
      };
    }
    default: {
      return state;
    }
  }
}