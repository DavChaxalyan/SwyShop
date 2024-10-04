import React from 'react';
import Slider from 'react-slick';
import './ImagesCategoriesSlider.css'; 
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
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slide">
                        <img src={image.url} alt={`Slide ${index + 1}`} style={{maxHeight: '200px'}}/>
                        <div className="slide-text">{image.text}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
