import React from "react";

export default function Mycalendar() {

    var monthNames=["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    let a = new Date();
    console.log(a);
    let month = a.getMonth();
    let year = a.getFullYear();

    let currentMonth = monthNames[month];
    console.log(year);

  return (<>
    <div>
        {currentMonth} {year}
    </div>
  </>);
}