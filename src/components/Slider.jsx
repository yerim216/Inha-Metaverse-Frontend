import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/Slider.module.css";
import "../styles/Slider.css";

export default function Slider() {
  const settings = {
    // borderToShow: false,
    variableWidth: true,
    dots: true, // 개수 표시 점
    infinite: true, // 무한 캐러셀
    speed: 500, // 다음 컨텐츠 까지의 속도
    slidesToShow: 3, // 화면에 보이는 컨텐츠 수
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    centerMode: true, // 현재 컨텐츠 가운데 정렬
    centerPadding: "10px", // 중앙 컨텐츠 padding 값
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    draggable: false, // 드래그
    fade: false, // 사라졌다 나타나는 효과
    arrows: true, // 좌,우 버튼
    vertical: false, // 세로 캐러셀
    initialSlide: 1, // 첫 컨텐츠 번호
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
    responsive: [
      // 반응형 옵션
      {
        breakpoint: 768, // (숫자)px 이하일 경우
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };
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
