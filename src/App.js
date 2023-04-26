// import logo from './logo.svg';
// import './App.css';


// function App() {
//   const style = { 
//     position: "absolute",
//     width: "1536px",
//     height: "64px",
//     left: "0px",
//     top: "0px",
//     backgroundColor: "#F2EDED",
//   }
//   const btn = {
//     position: "absolute",
//     width: "85px",
//     height: "39px",

//     top: "10px",
    
//     background: "rgba(255, 255, 255, 0.2)",
//     borderRadius: "35.5px",
//     margin: "auto",
   
//   }
//   const cont1={
//     // position: "absolute",
//     width: "70px",
//     height: "25px",
//     left: "calc(50% - 70px/2 - 562px)",
//     top: "calc(50% - 25px/2 - 3412px)",

//     fontFamily: "Avenir",
//     fontStyle: "normal",
//     fontWeight: "500",
//     fontSize: "18px",
//     lineHeight: "25px",

//     letterSpacing: "0.04em",

//     color: "#7090B0",
//   }

//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight
//   });

//   return (
//     <div className="App">
//       <div style={styles}>
//         <header>
//           <nav>
//             <a href='#' style = {cont1}> Contact </a>
//             <button style ={btn}>Login</button>
//             <a href='#'> Profile </a>
//           </nav>
//         </header>
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     }

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <div>
//       <img
//         src="https://via.placeholder.com/500x500"
//         alt="placeholder"
//         style={{ maxWidth: '100%', height: 'auto' }}
//       />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './index.css';


function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      
      <img
        src="https://via.placeholder.com/500x500"
        alt="placeholder"
        style={{ height: '100vh', width: '100vw' }}
      />
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <img id = "forum"
      />
      <div id = "hot">
        <p className ="t"> Today's Hot</p>
        <h4 className = "title">Ping Pong</h4>

      </div>

    </div>
  );
}

export default App;
