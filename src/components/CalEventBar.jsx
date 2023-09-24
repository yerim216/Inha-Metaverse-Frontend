import React,{useState} from "react";
import styles from "../styles/CalEventBar.module.css";

function CalEventBar(props) {
  // const a = JSON.stringify(props.data);
  // console.log(a);
  let display= '';
  let top=0;
  if(props.top>3){
    display= 'none';
  }else{
    top = props.top*15;
  }
  const eventBarSet = {
    // width: '100px',
    marginLeft: '0.4vw',
    width: `${props.width}vw`,
    display: `${display}`
   }
  return (
    <div style = {eventBarSet} className={styles.eventBar}>
      {props.title}
    </div>
    
  );
}

export default CalEventBar;
