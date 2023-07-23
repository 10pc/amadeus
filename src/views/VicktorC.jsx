import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style/App.module.css";
import logoImg from "../assets/viktorChondriaLogo.png";
import image1 from "../assets/Viktor_Chondria_University.webp";
import image2 from "../assets/Viktorchondria_intern.webp";
import image3 from "../assets/amadeus_presentation.jpg";

function ViktorC() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: image1, text: "Text 1" },
    { src: image2, text: "Text 2" },
    { src: image3, text: "Text 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div>
      <nav className={styles.navbar}>
        <section className={styles.logoContainer}>
          <img className={styles.logo} src={logoImg} alt="Logo" />
        </section>
        <section className={styles.linksContainer}>
            <Link to="/loading" className={styles.link}>Amadeus</Link>
          <a href="#link2" className={styles.link}>Tutorial</a>
          <a href="#link3" className={styles.link}>Youtube</a>
          <a href="#link3" className={styles.link}>Discord</a>
        </section>
      </nav>
      <section className={styles.slider}>
        <button className={styles.prevButton} onClick={() => setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length)}>Prev</button>
        <div className={styles.imageContainer}>
          <img src={images[currentImage].src} alt={images[currentImage].text} />
          <p>{images[currentImage].text}</p>
        </div>
        <button className={styles.nextButton} onClick={() => setCurrentImage((prevIndex) => (prevIndex + 1) % images.length)}>Next</button>
      </section>
      <section className={styles.bottomText}>
        <p>
          This is not an official Amadeus Project, everything is made by me, Lokman, just a fellow fan with some free time at night.
        </p>
      </section>
    </div>
  );
}

export default ViktorC;
