import React, { useEffect, useState } from "react";
import styles from "../styles/Myprofile.module.css";
import Gdot from "../components/Gdot";
import StarRating from "../components/StarRating";
import { useRecoilState } from "recoil";
import { userState } from "../recoil";
import project from "../db/project.json";
import user from "../db/user.json";
import member from "../db/member.json";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



export default function Profile() {
    useEffect(()=>{
        document.documentElement.classList.add("profileOnly");
        return ()=>{
        document.documentElement.classList.remove("profileOnly");
        }
      },[])
    
    const [userData, setUsers] = useState([]);
    const [userLogin, setUserLogin] = useRecoilState(userState);
    const [team,setTeam] = useState([]);
    const [interests,setInterest] = useState([]);

    const navigate = useNavigate(); 
    const userLoginString = userLogin.email.toString();
    
    const logout = () => {
      window.localStorage.clear();
      setUserLogin(null) 
      navigate('/')
    }
    
    useEffect(() => {
        axios.post('http://43.201.166.82:3000/userinfo', {
            "email": userLoginString
        })
  
        .then(function (res){
            const myArray = Object.values(res.data);
            console.log('myArray = '+ myArray);
            setUsers(myArray);
            console.log("성공");
        })
        .catch(function (error){
            console.log(error);
        })
    },[])

    useEffect(() => {
      axios.get('http://43.201.166.82:3000/userinfo/interested')
        .then(response => {
          setInterest(response.data);

          console.log('get 요청 = ' + response)
        })
        .catch(error => {
          // 요청 실패 시 처리할 코드
          console.error(error);
        });
    }, [])

  //   useEffect(() => {
  //     axios.post('http://43.201.166.82:3000/userinfo/interested', {
  //         "email": userLoginString
  //     })

  //     .then(function (res){
  //         const myArray = Object.values(res.data);
  //         console.log('interest_myArray = '+ myArray);
  //         setUsers(myArray);
  //         console.log("성공");
  //     })
  //     .catch(function (error){
  //         console.log(error);
  //     })
  // },[])

    useEffect(() => {
      axios.post('http://43.201.166.82:3000/team/emailtoteam', { //내가 속한 팀 불러오기 
          "email": userLoginString
      })

      .then(function (res){
          const teamArray = Object.values(res.data);
          console.log('Team myArray = '+ teamArray);
          setTeam(teamArray);
          console.log("성공");
      })
      .catch(function (error){
          console.log(error);
      })
  },[])

    // useEffect(() => {
    //   axios.get('http://43.201.166.82:3000/userinfo/skill')
    //     .then(response => {
    //       setData(response.data);

    //       console.log('get 요청 = ' + response)
    //     })
    //     .catch(error => {
    //       // 요청 실패 시 처리할 코드
    //       console.error(error);
    //     });
    // }, [])
      
  const part = {
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "25px",
    /* identical to box height */
    margin: "1%",
    display: "flex",
    letterSpacing: "0.04em",
    marginBottom: "20px",
    textAlign: "center",
    marginLeft: "40px",
    flexWrap: "nowrap",
  }
  const inpart = {
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "25px",
    /* identical to box height */
    margin: "1%",
    display: "flex",
    letterSpacing: "0.04em",
    marginBottom: "40px",
    marginTop:" 24px",
    textAlign: "center",
    marginLeft: "40px",
    flexWrap: "nowrap", 
  }
  const recruitList = {
    display:"inline-block",
    marginRight: "103px",
    fontFamily: 'Avenir',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '15px',
    lineHeight: '19px',
    alignItems: 'center',
    letterSpacing: '0.04em',

    color: '#000000',
  }

  const recruitContainer ={
    display:"flex",
    flexDirection: "column",
    marginLeft: "5px",
    paddingTop:'13px',

  }
  const recruitContainer2 ={
    marginLeft: "30px",
    display:"flex",
    flexDirection: "column",
    paddingTop:'13px',
    height: "98px",
    marginTop: '7px',
  }

  const pImage ={
    paddingTop:"23px",
    boxSizing: "border-box",
    width: "110px",
    height: "110px",
    borderRadius: "100px",
    marginLeft: "-50px",
  }
  const pIntro = {
    
    marginLeft: "90px",
    width: "348px",
    height: "160px",
    background: "#FFFFFF",
    boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.2)",
    borderRadius: "80px 40px 40px 80px",

  }
  
  const no = {
    paddingBottom: "0",
    marginBottom: "0",
  }

  const hahaha = {
    display: "flex",
    flexDirection: "row",
    gap: "9px",
    marginLeft: "-20px",
  }

  const dot ={
    marginTop: "7px",
    width: "8px",
    height: "8px",
    backgroundColor: "#00FF19",
    borderRadius: "100%",
  }

  const namee = {
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: "20px",
    lineHeight: "27px",
  }

  const con = {
    marginLeft: "100px",
    marginTop: "-75px",
    
  }

  const con2 = {
    fontSize: "12px",
    width: "240px",
    overflow: "hidden",
    whiteSpace: "normal",
    wordBreak: "break-word",
    marginTop: "-10px",
    height: "40px",
  }

  const parts={
    marginRight: "5px",
    width: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "19px",
    backgroundColor:"black",
    borderRadius: "60px",
    color: "white",
    fontSize: "11px",
    textAlign: "center", 
    paddingTop: "2px",
  }

  const lab = {
    display: "flex",
    gap: "5px",
    width: "180px",
    alignItems: "center",
  }

  const whole ={
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",

  }
  const more = {
    marginTop : "5px",
    marginLeft: "5px",
  }
  const projectInro ={
    paddingTop:"23px",
    boxSizing: "border-box",
    width: "110px",
    height: "110px",
    borderRadius: "100px",
    marginLeft: "-50px",
  }
  const projects = {
    marginTop: "70px",
    marginLeft: "90px",
    width: "593px",
    height: "160px",
    background: "#FFFFFF",
    boxShadow: "0px 20px 40px rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",

  }
  const progressP = {
    display: "flex",
    flexDirection: "row",
    gap: "9px",
    marginLeft : "-50px",
  }

  const namee2 = {
    marginTop: "-25px",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "44px",
    display: "flex",
    alignItems: "center",
    color: "#000000",
    marginLeft : "-50px",

  }
 
  const tools2={
    marginTop:"14px",
    marginLeft : "-50px",

  }
  const con3 = {

    marginLeft: "100px",
    marginTop: "-75px",

    
  }
  const parts2={
    marginRight: "5px",
    width: "auto",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "19px",
    backgroundColor:"#7090B0",
    borderRadius: "60px",
    color: "white",
    fontSize: "11px",
    textAlign: "center", 
    paddingTop: "2px",
  }
  const whole2 = {
    display: "inline-block",
    marginLeft: "200px",
    zIndex: '1',
    paddingBottom: "30px",

  }

  const wrappp = {
    display: "inline-block",
    marginTop: "30px",
    }

  const wrappp2 = {
    display: "inline-block",
    marginTop: "-200px",
    paddingBottom: "30px"
    }

  const con4 = {
    display: "inline-block",

    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    marginBottom:"5px",
    marginTop:"-35px",
  }

  const dot3 = {
    display: "inline-block",

    marginRight: "16px",
    backgroundColor: "#E1ECF6",
    borderRadius: "100px",
    width: "13.34px",
    height: "13.34px",
    display: "inline-block",

  }

  const eyes ={
    display: "inline-block",
    marginRight: "5px",
    width: "13.75px",
    height: "9.38px",
  }

  const viewss={
    display: "inline-block",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    marginLeft: "395px",
    zIndex: '2',
    marginTop: "-30px",
  }
  const data = {
    display: "absolute",
    fontFamily: "'Avenir'",
    fontStyle: "normal",
    fontWeight: "400",
    paddingTop:'7px',
  }
  const indata = {
    
    fontFamily: 'Avenir',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "22px",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    padding:'3.5px',
    paddingLeft: "17px",
    paddingRight: "17px",
    borderRadius: "50px",
    backgroundColor: "black",
    color: "white"
  }
  const contain = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  }

  const toolss = {
    marginTop:"19.17px",
    width: "180px",
    display:"flex",
    flexDirection: "row",
    gap: "31px",
  }
  const csss ={
    height: "46px",
    marginTop: '-5px',

  }
  const htmll ={
    marginLeft: '3px',
    height: "40px",
  }
  const vs ={
    height: "32px",
    marginTop:"3px",
  }
  const extool = {
    height: '40px',
  }

  const star ={
    display: 'inline-block',
    marginTop: '-88px',
    marginLeft: '10px',
  }

  return (
    <seciton>
      <div className={styles.wrap}>

      <div className={styles.navItems}>
        <div className={styles.logoContainer}>
        <Link to = '/'>
        <img
              src={`${process.env.PUBLIC_URL}/public_assets/logo.png`}
              className={styles.nav}
              alt="Logo"
              style={{
                height: "36px",
                width: "52px",
              }}
              onClick={() => window.location.href = "/"}
            />
        </Link>
       
        
        </div>
        <div className={styles.textContainer}>
          <a className={styles.navLink}>프로필</a>

          <a className={styles.navLink}>지원</a>
          
          {userLogin ? (
              <button className={styles.loginButton} onClick = {logout}>
              <span>로그아웃</span>
            </button>
            ) : (
              <button className={styles.loginButton}>
                <span>로그인</span>
              </button>
            )}
          
        </div>
      </div>
      <div className={styles.backgroundImage}></div>
      <img
        src={`${process.env.PUBLIC_URL}/public_assets/profile.PNG`}
        className={styles.profileImage}
        alt="profile"
        style={{
        }}
      />
      <div className={styles.nameContainer}>
          <Gdot />
          <p className={styles.name}>{userData[1]}</p>

      </div>
      <div className={styles.texts}>
          <p>Game / ENT</p>
          <p className={styles.limit}>{userData[3]}</p>
      
      </div>

      <div className ={styles.recruit}>
        {user.info.map(item => (
            
              <span key={item.id}>
                <div calssName={recruitContainer}>
                  <div style={part}>
                    <p className = {styles.part}>직무</p> <span style={data}>{item.part}</span>
                  </div>

                  <div style={part}>
                    <p className = {styles.careerpart}>경력</p>
                    <span style={data}>{userData[2]}년차</span>
                  </div>
                  <div style={part}>
                    <p className = {styles.mannerpart}>매너점수</p><span style={data}>{item.manners}</span>
                    
                    <span style={star}><StarRating /></span>
                  </div>
                  <div style={inpart}>
                    <p className = {styles.interestpart}>관심분야</p>
                    <span style = {contain}>
                        <span style={indata}>{item.interest}</span><span style={indata}>{item.interest}</span><span style={indata}>{item.interest}</span>
                    </span>
                  </div>
                  <div style={part}>
                    <p className = {styles.skillpart}>스킬</p>
                    <div style={recruitContainer2}>
                        <img
                        src={`${process.env.PUBLIC_URL}/public_assets/tool.png`}
                        style={extool}
                        alt="Views"
                        />
                        <div style={toolss}>
                        <img
                        src={`${process.env.PUBLIC_URL}/public_assets/html.png`}
                        style={htmll}

                        alt="Views"
                        />
                        <img
                        src={`${process.env.PUBLIC_URL}/public_assets/css.png`}
                        style={csss}
                        alt="Views"
                        />
                        <img
                        src={`${process.env.PUBLIC_URL}/public_assets/vscode.png`}
                        style={vs}
                        alt="Views"
                        />
                        </div>
                    </div>
                  </div>
                </div>
                
              </span>
          ))}
      </div>

      <div className={styles.memSearch}>
        <p className={styles.txt}> 🔍<span className={styles.userName}>{userData[1]} </span> 님이 진행하시는 프로젝트</p>
        <div className={styles.wrapp}>
          {project.progress.map(project => (
              
                <span key={project.id} style ={no}>

                  <div style={projects}>
                    
                    <div style={con3}>

                      <div style={wrappp}>
                        <div style={progressP}>
                          <div style = {parts2}>
                              {project.part}
                          </div>
                          <div style = {parts2}>
                              {project.part2}
                          </div>
                          <div style={whole2}>
                            <div style = {dot3}></div>
                            <div style = {con4}>
                              {project.recruit} ( 0 / {project.maxmem} )
                            </div>
                          </div>
                        </div>
                        <div style={namee2}>{project.title}</div>
                        
                        <div style={tools2}> {project.exp}</div>                      
                      </div>
                      
                     
                      

                    </div>
                  </div>
                  
                </span>

            ))}
        </div>
      </div>
      </div>

      <footer className={styles.footer}>
        <div className = {styles.lab}>
          <div className={styles.footerLogo}><img src={`${process.env.PUBLIC_URL}/public_assets/footerlogo.png`}/></div>
          <p className={styles.rights}>2022 Archifree, Inc. All Rights Reserved</p>
        </div>

        <div className = {styles.lab2}>
          <div className={styles.footerLogo2}><img src={`${process.env.PUBLIC_URL}/public_assets/mail.png`}/></div>
          <div className={styles.footerLogo3}><img src={`${process.env.PUBLIC_URL}/public_assets/call.png`}/></div>
          <div className={styles.footerLogo4}><img src={`${process.env.PUBLIC_URL}/public_assets/facebook.png`}/></div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <hr style={{opacity: "0.1",border: "2px solid rgba(255, 255, 255, 0.4)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginTop:"20px",width: "50%" }} />
        </div>
        
        <div className={styles.last3}>
        <h3 className={styles.last2}>스타트업 아키프리</h3>
        <p className={styles.last}>인천광역시 미추홀구 경인남길 102번길 14</p>
        </div>

             
        

      </footer>

    </seciton>
    

  );
}

