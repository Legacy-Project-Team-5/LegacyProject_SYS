import React from 'react';
import imageHome from '../img/home-img.jpg';
import Image from 'react-bootstrap/Image';

const Home = () => {
  return (
    <div className="home">
      <Image src={imageHome} width={'600px'} className="mt-4" />
      <h1>Welcome to SYS</h1>
    </div>
  );
};

export default Home;
