import React, { useEffect, useState } from 'react';
import TreshIcon from '../../../assets/icons/tresh-icon';
import css from '../annotations.module.scss';
import { Action, Actions, Annotation } from '../utils';

interface Props {
  annotation: Annotation;
  calculateLeft: (x: number) => number;
  calculateTop: (y: number) => number;
  dispatch: React.Dispatch<Action>;
  imageWidth: number;
}

export const AnnotationInfo = ({
  annotation,
  calculateTop,
  calculateLeft,
  dispatch,
  imageWidth,
}: Props) => {
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);
  const [initialsRef, setInitialsRef] = useState<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState(false);

  const initials = annotation.author?.split(' ').map((item) => item[0]);
  const topPos = calculateTop(annotation.pos.y);
  const leftPos = calculateLeft(annotation.pos.x);

  const modalWidth = modalRef?.clientWidth ?? 0;
  const offset = (window.innerWidth - imageWidth) / 2;
  const topOffset = 130
  const isOverflowLeft = offset + leftPos < modalWidth / 2;
  const isOverflowRight = imageWidth - leftPos + offset < modalWidth / 2;
  const isOverflowBottom = window.innerHeight - topPos - topOffset - (modalRef?.clientHeight ?? 0) < 0;

  const handleMouseEnter = () => {
    setIsShown(true);
  };

  useEffect(() => {
    function handlemoveOutside(event: Event) {
      if (
        (event.target && initialsRef && modalRef && modalRef.contains(event.target as Node)) ||
        initialsRef?.contains(event.target as Node)
      ) {
        !isShown && setIsShown(true);
      } else {
        isShown && setIsShown(false);
      }
    }
    document.addEventListener('mousemove', handlemoveOutside);
    return () => {
      document.removeEventListener('mousemove', handlemoveOutside);
    };
  }, [modalRef]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/annotations/${annotation.id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        dispatch({ type: Actions.deleteAnnotation, payload: annotation.id });
      }
    } catch (error) {
      console.error();
    }
  };

  return (
    <>
      <div
        className={css.initials}
        ref={(ref) => setInitialsRef(ref)}
        style={{
          top: topPos,
          left: leftPos-2,
        }}
        onMouseEnter={handleMouseEnter}
      >
        {initials}
      </div>
      {isShown && (
        <div
          ref={(ref) => setModalRef(ref)}
          className={css.infoPopover}
          style={{
            transform: `translate(${isOverflowRight ? '-100%' : isOverflowLeft ? '0px' : '-50%'}, ${
              isOverflowBottom ? '-50px' : `10px`
            })`,
            top: topPos,
            left: leftPos,
          }}
        >
          <div className={css.modalContent}>
            <div className={css.initialsIcon}>{initials}</div>
            <div className={css.comment}>{annotation.comment}</div>
            <div className={css.tresh} onClick={handleDelete}>
              <TreshIcon className={css.treshIcon} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
