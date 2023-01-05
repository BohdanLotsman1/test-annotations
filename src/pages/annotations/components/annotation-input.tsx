import React, { ChangeEvent, memo, useState } from 'react';
import SendIcon from '../../../assets/icons/send-icon';
import css from '../annotations.module.scss';
import { Action, Actions, Annotation } from '../utils';

interface Props {
  posX: number;
  posY: number;
  hideInput: () => void;
  dispatch: React.Dispatch<Action>;
}

const MAX_LENGTH = 256;

export const AnnotationInput = memo(({ dispatch, posX, posY, hideInput }: Props) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= MAX_LENGTH) {
      setInput(value);
      error && setError(false);
    } else {
      setError(true);
      setInput(value.slice(0, MAX_LENGTH));
    }
  };

  const handleSend = async () => {
    try {
      const newAnnotation: Annotation = {
        author: 'John Doe',
        comment: input,
        pos: {
          x: posX,
          y: posY,
        },
      };

      const response = await fetch('http://localhost:3000/annotations', {
        method: 'POST',
        body: JSON.stringify(newAnnotation),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const annotations = await response.json();
      dispatch({ type: Actions.addAnnotation, payload: annotations });
    } catch {
      console.error();
    }
    finally {
      hideInput();
    }
  };

  return (
    <React.Fragment>
      <div className={css.modalContent}>
        <input type={'text'} value={input} className={css.annotationInput} onChange={handleInput} />
        <div onClick={handleSend}>
          <SendIcon className={css.sendIcon} />
        </div>
        {error && <div className={css.warning}> Max length {MAX_LENGTH} </div>}
      </div>
    </React.Fragment>
  );
});
