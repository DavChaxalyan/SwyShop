import React from 'react';
import Slider from 'react-slick';
import styles from './ImagesCategoriesSlider.module.css'; 
import products2 from "../../../assets/images/products2.png"
import sale from "../../../assets/images/sale.jpg"
import product from "../../../assets/images/product.jpg"

const images = [
    {
        url: products2,
        text: 'CH360',
    },
    {
        url: product,
        text: 'GOOD PRODUCTS',
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
                        <img src={image.url} alt={`Slide ${index + 1}`} style={{height: '200px'}}/>
                        <div className={styles.slideText}>{image.text}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
