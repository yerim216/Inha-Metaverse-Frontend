import React from "react";
import Dot from "../components/Dot";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <section>
        <div className={styles.projectTitle}>
          <Dot />
          <h3>Map</h3>
        </div>
        <div className={styles.navBar}>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div>모집중</div>
          </div>
        </div>
      </section>
    </>
  );
}
