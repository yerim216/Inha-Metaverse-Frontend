import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import styles from "../styles/Calendar2.module.css";
import "../styles/calendar2.css";
 
export default class DemoApp extends React.Component {
  render() {
    const events = [
        { title: 'Meeting1', start: new Date('2023-6-29') },
        { title: 'Meeting2', start: new Date('2023-6-29') },
        { title: 'Meeting3', start: new Date('2023-6-29') },
        { title: 'Meeting4', start: new Date('2023-6-29') },

        { title: 'Meeting1', start: new Date('2023-6-10'), end: new Date('2023-6-13') },

        { title: 'Meeting2', start: new Date('2023-3-30') }
      ]
    
    function mobile(){
    if(window.screen.width<800){
        return 500;
        }else{
        return 850;
        }
    }
    
    return (
    <div className={styles.wrapper}>
        <div className={styles.child}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView='dayGridMonth'
                events={events}
                expandRows ={true}
                navLinks ={true}
                editable={true}
                eventLimit ={2}
                dayMaxEvents ={true}
                height = {"90vh"}

/>
        </div>
        
     </div>
        
    )
  }
}