import React, { useState } from "react";
import styles from "../styles/View.module.css";

export default function View() {

  return (
    <span className={styles.views}>
      <img
        src={`${process.env.PUBLIC_URL}/public_assets/eye.png`}
        className={styles.images}
        alt='Views'
      />
      <span className={styles.viewsData}> 1234 </span>
    </span>

    )
}