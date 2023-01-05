import React, { useEffect, useRef, useState } from 'react';
import { Action } from '../utils';
import css from '../annotations.module.scss';
import { AnnotationInput } from './annotation-input';

interface Props {
  left: number;
  top: number;
  hideInput: () => void;
  posX: number;
  posY: number;
  dispatch: React.Dispatch<Action>;
  imageWidth: number;
}

export const AnnotationInputContainer = ({ left, top, hideInput, dispatch, posX, posY, imageWidth }: Props) => {
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);
    
  const modalHalfWidth = (modalRef?.clientWidth ?? 0) / 2;
  const offset = (window.innerWidth - imageWidth) / 2;
  const topOffset = 135
  const distance = 10;
  const isOverflowLeft = offset + left < modalHalfWidth ;
  const isOverflowRight = imageWidth - left + offset < modalHalfWidth 
  const isOverflowBottom = window.innerHeight - top - topOffset - (modalRef?.clientHeight ?? 0) - distance < 0;
  
  return (
    <>
      <div
        className={css.dot}
        style={{
          left: left,
          top: top,
        }}
      />
      <div
        ref={(ref) => setModalRef(ref)}
        style={{
          left: left,
          top: top,
          transform: `translate(${isOverflowRight ? '-100%' : isOverflowLeft ? '0px' : '-50%'}, ${
            isOverflowBottom ? '-50px' : `${distance}px`
          })`,
        }}
        className={css.modal}
      >
        <AnnotationInput dispatch={dispatch} hideInput={hideInput} posX={posX} posY={posY} />
      </div>
    </>
  );
};
