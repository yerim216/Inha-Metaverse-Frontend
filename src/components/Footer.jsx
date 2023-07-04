import React from "react";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footerContents} maxWidth`}>
        <div className={styles.rights}>
          <img src="/public_assets/icons/archifree.svg" alt="archifree" />
          ©2022 Archifree, Inc. All Rights Reserved
        </div>
        <div className={styles.contact}>
          <img src="/public_assets/icons/mail.svg" alt="mail" />
          <img src="/public_assets/icons/phone.svg" alt="phone" />
          <img src="/public_assets/icons/facebook.svg" alt="facebook" />
        </div>
        <div>
          <p className={styles.companyName}>스타트업 아키프리</p>
          <p className={styles.companyAddress}>
            인천광역시 미추홀구 경인남길 102번길 14
          </p>
        </div>
      </div>
    </footer>
  );
}
