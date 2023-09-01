import React,{useState} from "react";
import styles from "../styles/CalEventBar.module.css";

export default function CalEventBar(props) {

  const eventBarSet = {
    width: `${props.width}vw`,
    gridColumn: `${props.colStart}`,
    // gridColumnEnd: `${props.rowStart}`,
    gridRow: `${props.rowStart}`,
    // gridRowEnd: `${props.width}`
   }

  return (
    <div style = {eventBarSet} className={styles.eventBar}>
      {props.title}
    </div>
    
  );
}
