import React from 'react';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, largeImageURL, handleClick })=> {
    return (
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={src}
          alt={alt}
          onClick={() => handleClick(largeImageURL)}
        />
      </li>
    );
}

export default ImageGalleryItem;
