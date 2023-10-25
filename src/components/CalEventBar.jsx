import React,{useState} from "react";
import styles from "../styles/CalEventBar.module.css";

function CalEventBar(props) {
  let color ='#E9F0FE';
  if(props.color !== null){
    color = props.color;
  }

  const eventBarSet = {
    marginLeft: '0.4vw',
    width: `${props.width}vw`,
    backgroundColor:`${color}`,
   }
  return (
    <div style = {eventBarSet} className={styles.eventBar}>
      {props.title}
    </div>
    
  );
}

export default CalEventBar;
