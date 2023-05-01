import React, { useEffect, useState } from "react";
import Dot from "../components/Dot";
import styles from "../styles/Home.module.css";
import FilteredItem from "../components/FilteredItem";
import ProjectLists from "../components/ProjectLists";
import Slider from "../components/Slider";

export default function Home() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  // 우측 상단의 모집중 필터 버튼.
  const [recruitmentBtnActive, setRecruitmentBtnActive] = useState(false);

  // 필터링된 아이템을 관리하는 state.
  const [filteredItems, setFilteredItems] = useState([]);

  // 기획/개발/디자인/기타 등,
  // 추후에 db에서 가져 옴. 현재는 임시로 설정해 둠.
  const [filter, setFilter] = useState([
    ["개발 기획", "서비스 기획", "프로덕트 기획", "영업 기획"],
    ["웹 개발", "모바일 개발", "게임 개발", "알고리즘 개발"],
    ["건축 디자인", "인테리어 디자인", "UX/UI 디자인"],
    ["일렉 기타", "어쿠스틱 기타", "클래식 기타"],
  ]);
  const [filterNum, setFilterNum] = useState(0);
  const handleFilterChange = (filterNumber) => {
    setFilterNum(filterNumber);
  };

  const deleteFilterItems = (text) => {
    setFilteredItems((arr) => arr.filter((data) => data !== text));
  };

  // 필터를 누르면
  // 1) 해당 필터가 이미 활성화(버튼의 색깔로 판단) => filteredItems에서 해당 필터 제거
  // 2) 해당 필터가 비활성화 => filteredItems에 해당 필터 추가
  function handleFilterClick(e) {
    if (e.target.style.backgroundColor === "rgb(112, 144, 176)") {
      deleteFilterItems(e.target.innerText);
    } else setFilteredItems((arr) => [...arr, e.target.innerText]);
  }
  // filteredItems가 변경되었을 때, 혹은 filterNum이 변경되어 보여지는 filter가 변경되었을 때
  // filter들의 색깔을 정해주기 위해 querySelector로 모두 가져온 후, filteredItems에 해당 필터가 존재한다면 버튼 색깔 활성화, 아니면 비활성화해 줌.
  useEffect(() => {
    const filters = document.querySelectorAll(".filters");
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filteredItems.includes(filter.innerText)) {
        filter.style.backgroundColor = "rgba(112, 144, 176, 1)";
      } else {
        filter.style.backgroundColor = "rgba(112, 144, 176, 0.25)";
      }
    }
  }, [filteredItems, filterNum]);

  return (
    <>
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
            <view />
            <hr />
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/public_assets/vector.png`}
            className={styles.vector}
            alt="Views"
          />
        </div>
        <section className="maxWidth">
          <div className={styles.projectTitle}>
            <Dot />
            <h3>Map</h3>
          </div>
          <Slider />
        </section>
      </section>
      <section className="maxWidth">
        <div className={styles.projectTitle}>
          <Dot />
          <h3>Project</h3>
        </div>
        <div className={styles.navBar}>
          <div className={styles.menus}>
            <div
              className={`${styles.menu} ${filterNum === 0 && "text-white"}`}
              onClick={() => {
                handleFilterChange(0);
              }}
            >
              기획
            </div>
            <div
              className={`${styles.menu} ${filterNum === 1 && "text-white"}`}
              onClick={() => {
                handleFilterChange(1);
              }}
            >
              개발
            </div>
            <div
              className={`${styles.menu} ${filterNum === 2 && "text-white"}`}
              onClick={() => {
                handleFilterChange(2);
              }}
            >
              디자인
            </div>
            <div
              className={`${styles.menu} ${filterNum === 3 && "text-white"}`}
              onClick={() => {
                handleFilterChange(3);
              }}
            >
              기타
            </div>
          </div>
          <div className={styles.isRecruiting}>
            <div
              className={`${styles.toggleBtn} ${
                recruitmentBtnActive && styles.active
              }`}
            >
              <div
                className={`${styles.toggleDot} ${
                  recruitmentBtnActive && styles.active
                }`}
                onClick={() => {
                  setRecruitmentBtnActive(!recruitmentBtnActive);
                }}
              ></div>
            </div>
            <div className={styles.mozipzoong}>모집중</div>
          </div>
        </div>

        {/* 필터 선택 탭 */}
        <div className={styles.filterBox}>
          <div className={styles.filterFlex}>
            {filter &&
              filter[filterNum].map((item) => (
                <div onClick={handleFilterClick} className="filters">
                  {item}
                </div>
              ))}
          </div>

          {/* 선택된 필터들 */}
          <div className={styles.filteredItems}>
            {filteredItems.length !== 0 && <img src="/Vector.png" alt="꼬깔" />}
            {filteredItems.map((filteredItem) => {
              return (
                <FilteredItem
                  filterName={filteredItem}
                  deleteFilterItems={deleteFilterItems}
                />
              );
            })}
          </div>
        </div>
        <ProjectLists recruitmentBtnActive={recruitmentBtnActive} />
      </section>
    </>
  );
}
