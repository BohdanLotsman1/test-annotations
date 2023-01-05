export interface Position {
  x: number;
  y: number;
}

export interface Annotation {
  id?: number;
  author: string;
  comment: string;
  pos: Position;
}

export interface InitialState {
  annotations: Array<Annotation>;
}
export interface Action {
  type: string;
  payload?: any;
}
export const initialState: InitialState = {
  annotations: [],
};

export enum Actions {
  setAnnotations = 'setAnnotations',
  addAnnotation = 'addAnnotation',
  deleteAnnotation = 'deleteAnnotation',
}

