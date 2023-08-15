import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from "../styles/ImgSelectModal.module.css";
import { getUserInfo,putUserImg } from "../APIs/userinfo";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

const ImageSelector = (rerendering) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userLogin, setUserLogin] = useRecoilState(userState);
  const userIdx = userLogin.user_index;

  // const [userProfileIdx, setUserProfileIdx] = useState();

  const images = ['1','2','3','4','5'];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleImageChange = (userIdx,image) => {
    putUserImg(userIdx, image)
    .then(function () {
      console.log("유저 프로필 이미지 저장 성공");

    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const closeModal = (image) => {

    getUserInfo(userIdx)
      .then(function (res) {
        const myArray = res.data[0];
        console.log(res.data[0].user_img_index);
      })
      .catch(function (error) {
        console.log(error);
      });

      handleImageChange(userIdx,image);
    setModalIsOpen(false);
  };


  const profileImgCss = {
    margin: 'auto',
    width: "150px",
    height: "150px",
    borderRadius: "30px",
    objectFit: "cover", // 이미지를 너비와 높이에 맞게 크롭하여 채우기
    cursor: "pointer"
  }
 
  const wrap = {
    display: "flex",
    flexDirection: "row"
  }

  
  return (
    <div>
      <button className={styles.imgtxt} onClick={openModal}>이미지 교체하기</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>이미지 선택</h2>
        <div style = {wrap}>
          {images.map((image, index) => (
            <img
              key={index}
              src={`/public_assets/profileImg/profileImg_${image}.png`}              alt={`Image ${index}`}
              onClick={() => closeModal(image)}
              style ={profileImgCss} 
            />
          ))}
        </div>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};

export default ImageSelector;
