import { SET_TAB_ACTIVE, TAnyAction } from '../actions';

const tabState = {
  tab: 'bun',
};

export const tabReducer = (state = tabState, action: TAnyAction) => {
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