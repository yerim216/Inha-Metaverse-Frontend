import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";
import FilteredItem from "../components/FilteredItem";
import ProjectLists from "../components/ProjectLists";
import Stories from "../components/Stories";
import { UserInfoContext } from "../contexts/UserInfoProvider";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { ThemeModeContext } from "../contexts/ThemeProvider";
import { theme } from "../theme/theme";
import TitleWithDescription from "../components/home/TitleWithDescription";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import StoryModal from "../components/StoryModal";
import { getUserInterested } from "../APIs/userinfo";
import ForMobile from "../components/common/ForMobile";

export default function Home() {
  const { userInfo, userInfoSet } = useContext(UserInfoContext);

  const [user, setUser] = useRecoilState(userState);

  // const [backgroundImgs, setBackgroundImgs] = useState({
  //   light: new Image("/public_assets/banner_light.jpeg"),
  //   dark: new Image("/public_assets/banner_dark.jpeg"),
  // });
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [tm, setTm] = useState(theme.lightTheme.home);
  // themeMode에 따라, theme.js에서 import해오는 요소를 바꿔줄 것.
  useEffect(() => {
    if (themeMode === "light") setTm(theme.lightTheme.home);
    else setTm(theme.darkTheme.home);
  }, [themeMode]);

  const navigate = useNavigate();
  const room = "forum";

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const openSignInModal = () => {
    setSignInModalOpen(true);
    blockScroll();
  };
  const closeSignInModal = () => {
    setSignInModalOpen(false);
    freeScroll();
  };

  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const openStoryModal = () => {
    setStoryModalOpen(true);
    blockScroll();
  };
  const closeStoryModal = () => {
    setStoryModalOpen(false);
    freeScroll();
  };

  const forumClick = () => {
    if (user) {
      // 이미 파일이 다운로드 되어있는지 확인.
      // 만약 다운로드되어있다면 바로 해당 파일 실행, 아니라면 다운로드 페이지로 이동.
      const confirm = window.confirm(
        "해당 공간으로 이동하기 위해서는 추가적인 파일 다운로드가 필요합니다. 다운로드 페이지로 이동하시겠어요?"
      );
      if (confirm) {
        navigate("/download");
      }

      // const url = `https://www.app.vpspace.net/?email=${encodeURIComponent(
      //   user.email
      // )}&&room=${encodeURIComponent(room)}`;
      // window.location.href = url;
    }
  };

  const blockScroll = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = "16px";
  };

  const freeScroll = () => {
    document.body.style.overflowY = "auto";
    document.body.style.paddingRight = "0px";
  };

  // 회원가입창 팝업 관리 state
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    blockScroll();
  };
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
    freeScroll();
  };

  // 우측 상단의 모집중 필터 버튼.
  const [recruitmentBtnActive, setRecruitmentBtnActive] = useState(true);

  // 필터링되지 않은(기획/개발/디자인/기타로 나뉘지 않은) 직무(관심분야) 데이터.
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    getUserInterested()
      .then((res) => {
        setFilters(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 화면에 보여줄 필터 : 기획 / 개발 / 디자인 / 기타로 나뉨.
  const [filter, setFilter] = useState([[], [], [], []]);

  // 필터링된 아이템을 관리하는 state.
  const [filteredItems, setFilteredItems] = useState([]);

  // 필터 버튼을 누르면 레이아웃의 변경이 필요함. 이를 관리하기 위한 state.
  const [filterMode, setFilterMode] = useState(false);

  // 주어진 string값을 통해 filters에서 해당 인덱스를 찾는 함수.
  const getFilterIndex = (fieldTitle) => {
    return filters.find((obj) => obj.field_title === fieldTitle);
  };

  const [selectedIndices, setSelectedIndices] = useState([]);

  // filteredItems가 변경될 때마다, 아래의 로직을 이용하여 실시간으로 필터링된 프로젝트를 불러 옴.
  useEffect(() => {
    if (!filters) return;
    let selectedFilterIndices = [];

    filteredItems.map((item) => {
      const found = getFilterIndex(item);
      selectedFilterIndices.push(found.field_index);
    });

    if (selectedFilterIndices.length !== 0) {
      setFilterMode(true);

      setSelectedIndices(selectedFilterIndices);
    } else {
      setFilterMode(false);
    }
  }, [filteredItems, filters]);

  useEffect(() => {
    if (!filters) return;

    let newArr = [[], [], [], []];
    filters.map((field) => {
      const fieldCategory = field.field_category;
      if (fieldCategory === "기획") {
        newArr[0].push(field);
      } else if (fieldCategory === "개발") {
        newArr[1].push(field);
      } else if (fieldCategory === "디자인") {
        newArr[2].push(field);
      } else {
        newArr[3].push(field);
      }
    });
    setFilter(newArr);
  }, [filters]);

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
    if (e.target.style.backgroundColor === tm.accentColor) {
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
        filter.style.backgroundColor = tm.accentColor;
      } else {
        filter.style.backgroundColor = tm.disabledBtnBgColor;
      }
    }
  }, [filter, filteredItems, filterNum]);

  return (
    <>
      <SignInModal
        open={signInModalOpen}
        close={closeSignInModal}
        openSignUpModal={openSignUpModal}
      ></SignInModal>
      <SignUpModal
        open={signUpModalOpen}
        close={closeSignUpModal}
      ></SignUpModal>
      <StoryModal opened={storyModalOpen} closeModal={closeStoryModal} />
      <header
        className="h-full w-full flex justify-center"
        style={{
          backgroundColor: tm.bannerBg,
        }}
      >
        <div className="relative">
          {themeMode === "light" ? (
            <img
              src="/public_assets/banner_light.jpeg"
              alt="banner"
              className="h-[100vh]"
            />
          ) : (
            <img
              src="/public_assets/banner_dark.jpeg"
              alt="banner"
              className="h-[100vh]"
            />
          )}

          {/* 버튼 : 하나의 이미지처럼 보이게끔, 위치 및 크기 요소를 동적으로 할당해 주었음. */}
          <button
            className="absolute left-[9%] bottom-[30%] font-bold text-[28px] flex items-center justify-center gap-4 px-[6%] py-[2%] rounded-md hover:scale-[102%]"
            style={{
              backgroundColor: tm.accentColor,
              color: tm.buttonText,
            }}
            onClick={() => {
              // 로그인 안돼있으면 로그인창 띄우기, 돼있으면 프로젝트 리스트로
              if (!user) openSignInModal();
              else navigate("/projectlists");
            }}
          >
            프로젝트 시작하기
            <span>&gt;</span>
          </button>
        </div>
      </header>
      <section className="maxWidth">
        <Nav isMainPage={true} />
        <TitleWithDescription
          title={"프로젝트"}
          description={"다양한 아이디어와 함께"}
        />
        <div
          className={styles.navBar}
          style={{
            borderColor: tm.borderColor,
          }}
        >
          <div className="flex justify-between items-center">
            <div className={styles.menus}>
              <div
                style={{
                  color: filterNum === 0 ? tm.mainTextColor : tm.hazyTextColor,
                }}
                className={`${styles.menu} ${
                  filterNum === 0 && tm.mainTextColor
                }`}
                onClick={() => {
                  handleFilterChange(0);
                }}
              >
                기획
              </div>
              <div
                style={{
                  color: filterNum === 1 ? tm.mainTextColor : tm.hazyTextColor,
                }}
                className={`${styles.menu} ${
                  filterNum === 1 && tm.mainTextColor
                }`}
                onClick={() => {
                  handleFilterChange(1);
                }}
              >
                개발
              </div>
              <div
                style={{
                  color: filterNum === 2 ? tm.mainTextColor : tm.hazyTextColor,
                }}
                className={`${styles.menu} ${
                  filterNum === 2 && tm.mainTextColor
                }`}
                onClick={() => {
                  handleFilterChange(2);
                }}
              >
                디자인
              </div>
              <div
                style={{
                  color: filterNum === 3 ? tm.mainTextColor : tm.hazyTextColor,
                }}
                className={`${styles.menu} ${
                  filterNum === 3 && tm.mainTextColor
                }`}
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
                style={{
                  backgroundColor: recruitmentBtnActive
                    ? tm.accentColor
                    : tm.disabledBtnBgColor,
                }}
                onClick={() => {
                  setRecruitmentBtnActive(!recruitmentBtnActive);
                }}
              >
                <div
                  className={`${styles.toggleDot} ${
                    recruitmentBtnActive && styles.active
                  }`}
                ></div>
              </div>
              <div
                style={{
                  color: tm.mainTextColor,
                }}
              >
                모집중
              </div>
            </div>
          </div>
          <div className={styles.filterFlex}>
            {filter &&
              filter[filterNum].map((item, idx) => (
                <div
                  onClick={handleFilterClick}
                  className="filters text-xl"
                  key={idx}
                  style={{
                    color: tm.buttonText,
                  }}
                >
                  {item.field_title}
                </div>
              ))}
          </div>
        </div>
        {/* 선택된 필터들 */}
        <div className={styles.filteredItems}>
          {filteredItems.length !== 0 && (
            <img src="/public_assets/icons/filter.svg" alt="필터아이콘" />
          )}
          {filteredItems.map((filteredItem, idx) => {
            return (
              <FilteredItem
                filterName={filteredItem}
                deleteFilterItems={deleteFilterItems}
                key={idx}
                color={tm.accentColor}
              />
            );
          })}
        </div>
        <ProjectLists
          recruitmentBtnActive={recruitmentBtnActive}
          filterMode={filterMode}
          selectedIndices={selectedIndices}
        />
      </section>
      <section className="mt-10 maxWidth relative">
        <div
          className={styles.projectTitle}
          style={{
            color: tm.mainTextColor,
          }}
        >
          <TitleWithDescription
            title={"스토리"}
            description={"새로운 소식은 여기에"}
          />
          <button
            className="absolute right-0 top-44 hover:scale-[103%]"
            onClick={() => {
              if (!user) {
                alert("먼저 로그인을 해주세요!");
                return;
              }

              openStoryModal();
            }}
          >
            <img
              src="public_assets/icons/plus_button_circle.svg"
              alt="plus_button_circle"
            />
          </button>
        </div>
        <Stories />
      </section>
      <Footer />
    </>
  );
}
