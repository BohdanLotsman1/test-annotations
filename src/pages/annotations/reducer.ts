import { Action, Actions, InitialState } from './utils';

export const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case Actions.setAnnotations:
      return { ...state, annotations: action.payload };
    case Actions.addAnnotation:
      return { ...state, annotations: [...state.annotations, action.payload] };
    case Actions.deleteAnnotation:
      return {...state, annotations: state.annotations.filter((item) => item.id !== action.payload) };
    default:
      throw new Error();
  }
};
