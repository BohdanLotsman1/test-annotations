import React, { ChangeEvent, memo } from 'react';
import css from '../annotations.module.scss';

interface Props {
  setImgURL: (value: React.SetStateAction<string>) => void;
  isNotUploaded: () => void;
}

export const ImageUploader = memo(({ setImgURL, isNotUploaded }: Props) => {
  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      isNotUploaded();
      setImgURL(URL.createObjectURL(files[0]));
    } else {
      console.log('abort');
    }
  };

  return (
    <label className={css.uploadButton}>
      <input
        accept="image/*"
        className={css.fileInput}
        type="file"
        onChange={handleUploadImage}
      />
      Upload image
    </label>
  );
});
