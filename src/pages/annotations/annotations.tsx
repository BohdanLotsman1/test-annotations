import React, {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { DefaultLayout } from '~/components';
import css from './annotations.module.scss';
import { AnnotationInfo } from './components/annotation-info';
import { AnnotationInputContainer } from './components/annotation-input-container';
import { ImageUploader } from './components/image-uploader';
import { reducer } from './reducer';
import { Actions, Annotation, initialState } from './utils';

export const Annotations = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [imgURL, setImgURL] = useState('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [imgRefState, setImgRefState] = useState<HTMLImageElement | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const posX = useRef(0);
  const posY = useRef(0);

  const calculateTop = (y: number) => {
    return imageHeight * y;
  };

  const calculateLeft = (x: number) => {
    console.log(imageWidth);

    return imageWidth * x;
  };

  const handleImadeClick = (event: MouseEvent<HTMLImageElement>) => {
    const newX = event.nativeEvent.offsetX / event.currentTarget.width;
    const newY = event.nativeEvent.offsetY / event.currentTarget.height;
    posX.current = newX;
    posY.current = newY;

    setShowInput((prev) => !prev);
  };

  const isNotUploaded = () => {
    setIsImageUploaded(false);
  };

  const hideInput = () => {
    setShowInput(false);
  };

  useLayoutEffect(() => {
    const setCoordinates = () => {
      setImgRefState(imgRef.current);
      setImageWidth(imgRef.current?.width ?? 0);
      setImageHeight(imgRef.current?.height ?? 0);
    };
    window.addEventListener('resize', setCoordinates);
    return () => window.removeEventListener('resize', setCoordinates);
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/annotations');
      const annotations = await response.json();
      dispatch({ type: Actions.setAnnotations, payload: annotations });
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      imgRef.current = imgRefState;
      setImageWidth(imgRef.current?.width ?? 0);
      setImageHeight(imgRef.current?.height ?? 0);
      imgURL && setIsImageUploaded(true);
    }, 10);
  }, [imgRefState, imgURL]);

  return (
    <DefaultLayout className={css.annotationsWrapper}>
      <ImageUploader setImgURL={setImgURL} isNotUploaded={isNotUploaded} />
      {imgURL && (
        <div className={css.imageBlock}>
          <img ref={(ref) => setImgRefState(ref)} src={imgURL} onClick={handleImadeClick} />
          {isImageUploaded &&
            state.annotations?.map((item: Annotation) => (
              <AnnotationInfo
                key={item.id}
                annotation={item}
                calculateLeft={calculateLeft}
                calculateTop={calculateTop}
                dispatch={dispatch}
                imageWidth={imageWidth}
              />
            ))}

          {showInput && (
            <AnnotationInputContainer
              dispatch={dispatch}
              hideInput={hideInput}
              left={calculateLeft(posX.current)}
              top={calculateTop(posY.current)}
              posX={posX.current}
              posY={posY.current}
              imageWidth={imageWidth}
            />
          )}
        </div>
      )}
    </DefaultLayout>
  );
};
