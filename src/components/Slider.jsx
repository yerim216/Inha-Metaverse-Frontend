import React from "react";

import styles from "../styles/Slider.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slider() {
  return (
    <div className={styles.wrapper}>
      <Carousel showThumbs={false}>
        <span className={styles.im}>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image1.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
        </span>

        <span className={styles.im}>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image1.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
        </span>
        <span className={styles.im}>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image1.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/image2.png`}
            className={styles.images}
            alt="Views"
            style={{
              height: "400px",
              width: "30%",
              margin: "15px",
              paddingBottom: "90px",
            }}
          />
        </span>
      </Carousel>
    </div>
  );
}
