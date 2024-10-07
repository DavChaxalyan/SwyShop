import React from 'react';
import Slider from 'react-slick';
import styles from './ImagesCategoriesSlider.module.css'; 
import shoos from "../../../assets/images/shoos.jpg"
import drinks from "../../../assets/images/napitki.jpeg"
import sale from "../../../assets/images/sale.jpg"

const images = [
    {
        url: shoos,
        text: 'SHOOS',
    },
    {
        url: drinks,
        text: 'GOOD DRINKS',
    },
    {
        url: sale,
        text: 'BIG SALES',
    },
];

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className={styles.slide}>
                        <img src={image.url} alt={`Slide ${index + 1}`} style={{maxHeight: '200px'}}/>
                        <div className={styles.slideText}>{image.text}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
