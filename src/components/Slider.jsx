import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Slider.module.css";
import "../styles/Slider.css";

export default function Slider() {
  return (
    <div className="wrapper">
      <Carousel showThumbs={false}>
        <span>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image1.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
        </span>

        <span>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image1.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
        </span>
        <span>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image1.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              width: "30%",
              margin: "15px",
              paddingBottom: "50px",
            }}
          />
        </span>
      </Carousel>
    </div>
  );
}
