import React, { useState } from "react";
import View from "../components/View";
import Dot from "../components/Dot";
import styles from "../styles/Top.module.css";
import Slider from "../components/Slider";

function ExamplePage() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <section>
      <div>
        <nav className={styles.navbar}>
          <span className={styles.navLink}>Contact</span>
          <button className={styles.loginButton}>
            <span>Login</span>
            <Dot />
          </button>
          <span className={styles.navLink}>Profile</span>
        </nav>

        <img
          src="https://via.placeholder.com/1536x864.jpg"
          alt="Example Image"
          className={styles.exampleImg}
        />
      </div>

      <div className={styles.container}>
        <img
          className={styles.image}
          src="https://via.placeholder.com/783x600.jpg"
          alt="예시 이미지"
        />
        <div className={styles.wrapper} onClick={handleClick}>
          <Dot />
          <p className={styles.tHot}>Today Hot</p>
          <p className={styles.hotName}>Ping Pong Track</p>
          <View />
          <hr />
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/public_assets/vector.png`}
          className={styles.vector}
          alt="Views"
        />
      </div>
      <section>
        <div className={styles.projectTitle}>
          <Dot />
          <h3>Map</h3>
        </div>
        <Slider />
      </section>
    </section>
  );
}

export default ExamplePage;
