import React from 'react';
import s from '../ImageGallery/imagegallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({imageArr, handleClick}) => {

    const imgCreator = imageArr.map(el => {
      return (
        <ImageGalleryItem
          key={el.id}
          src={el.webformatURL}
          alt={el.tags}
          largeImageURL={el.largeImageURL}
          handleClick={handleClick}
        />
      );
    });
    return <ul className={s.ImageGallery}>{imgCreator}</ul>;
}

export default ImageGallery;
