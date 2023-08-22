import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from "../styles/ImgSelectModal.module.css";
import 
{ getUserInfo,
  putUserImg,
} 
from "../APIs/userinfo";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";

const ImageSelector = (userProfileIdx) => {
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
    rerendering();
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

  const rerendering = () => {
    getUserInfo(userIdx)
      .then(function (res) {
        userProfileIdx = res.data[0].user_img_index;
        })
        .catch(function (error) {
          console.log(error);
        });
    };

  const profileImgCss = {
    margin: 'auto',
    width: "150px",
    height: "150px",
    borderRadius: "30px",
    objectFit: "cover", // 이미지를 너비와 높이에 맞게 크롭하여 채우기
    cursor: "pointer"
  };
 
  const wrap = {
    display: "flex",
    flexDirection: "row"
  };

  const customModalStyles = {
    content: {
      backgroundColor: '#1C1D1E',
      width: '70%', // 모달의 너비
      height: '60%', // 모달의 높이
      top: '50%', // 모달이 화면의 중앙에 위치하도록 설정
      left: '50%', // 모달이 화면의 중앙에 위치하도록 설정
      transform: 'translate(-50%, -50%)', // 모달이 정확한 중앙에 위치하도록 설정
      borderRadius: '40px'
    },
  };

  const title = {
    marginTop: '20px',
    marginLeft: '20px',
    marginBottom: '50px',
    color:'white',
    fontSize: '50px',
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 'normal',
  }

  const close = {
    color:'white',
    float:'right',
    marginRight: '20px',
    marginTop: '70px',
    marginBottom: '50px',
    fontSize: '20px',
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
  }
  return (
    <div>
      <button className={styles.imgtxt} onClick={openModal}>이미지 교체하기</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles}>
        <h2 style={title}>이미지 선택하기</h2>
        <div style = {wrap}>
          {images.map((image, index) => (
            <img
              key={index}
              src={`/public_assets/profileImg/profileImg_${image}.png`}              
              alt={`Image ${index}`}
              onClick={() => closeModal(image)}
              style ={profileImgCss} 
            />
          ))}
        </div>
        <button style={close} onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};

export default ImageSelector;
