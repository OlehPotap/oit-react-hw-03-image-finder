import React from 'react';
import s from '../ImageGallery/imagegallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends React.Component {
  render() {
    const imgCreator = this.props.imageArr.map(el => {
      return (
        <ImageGalleryItem
          key={el.id}
          src={el.webformatURL}
          alt={el.tags}
          largeImageURL={el.largeImageURL}
          handleClick={this.props.handleClick}
        />
      );
    });
    return <ul className={s.ImageGallery}>{imgCreator}</ul>;
  }
}

export default ImageGallery;
