import React from 'react';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const { src, alt, largeImageURL, handleClick } = this.props;
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
}

export default ImageGalleryItem;
