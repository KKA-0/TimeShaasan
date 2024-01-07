import React, {useState, useRef} from 'react';
import Pages from './../Pages/Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import useFocusSession  from '../../../../hooks/useFocusSession';

import { MdOutlineMotionPhotosPause } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { RxResume } from "react-icons/rx";
import { Tooltip } from 'react-tooltip'
// import { io } from "socket.io-client";

const FocusSession = () => {
  const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
  const [sessionsLimit, setsessionsLimit] = useState(0)
  const [startTimestamp, setstartTimestamp] = useState(0)
  const Startvalue = useRef(0)
  // const socket = io("http://localhost:4000");
  
  //   useEffect(() => {
    //     socket.on("connect", () => {
  //     });
  //   }, [])
    
  //   const engine = socket.io.engine;
  //   engine.on("packet", ({ type, data }) => {
    //     console.log(type, data);
    //   });
    
    const StartTimer = () => {
      setsessionsLimit(Startvalue.current.value)
      setstartTimestamp(currentUnixTimeInSeconds)
    }
    const { remainingTime, formatTime } = useFocusSession(sessionsLimit, startTimestamp);
    
    // const StopTimer = () => {
      
    // }
      
    // const ResetTimer = () => {
    //   setMinute(45)
    //   setSecond(59)
    // }
        
        
  return (
      <div className={Pages.mainBody}>
          <div className={Pages.focusSessions}>
            <div className={Pages.timerDiv}>
              <span className={Pages.timer}>{formatTime(remainingTime)}</span>
              <span className={Pages.remaining}>Remaining</span>
            </div>
            <div className={Pages.FocusSessionSettings}>
              <div onClick={() => StartTimer("hello1")}>
                <RxResume size='3em' data-tooltip-id="iconsResume" data-tooltip-content="Resume Timer" data-tooltip-place="top" className={Pages.iconsResume} style={{ margin: '5px', cursor: 'pointer' }}/>
                <Tooltip id="iconsResume" />
              </div>
              <div>
                <MdOutlineMotionPhotosPause size='3em' data-tooltip-id="iconsPause" data-tooltip-content="Pause Timer" data-tooltip-place="top" className={Pages.iconsPause} style={{ margin: '5px', cursor: 'pointer' }}/>
                <Tooltip id="iconsPause" />
              </div>
              <div>
                <LuTimerReset size='3em' data-tooltip-id="iconsReset" data-tooltip-content="Reset Timer" data-tooltip-place="top" className={Pages.iconsReset} style={{ margin: '5px', cursor: 'pointer' }}/>
                <Tooltip id="iconsReset" />
              </div>
            </div>
            <div className={Pages.FocusOptions}>
              <select ref={Startvalue} className={Pages.SessionsLimit}>
                <option value='900'>15 Mins</option>
                <option value='1800'>30 Mins</option>
                <option value='2700' selected>45 Mins</option>
                <option value='3600'>1 Hour</option>
                <option value='5400'>1.5 Hours</option>
                <option value='7200'>2 Hours</option>
              </select>
              <div className={Pages.Sessions}>
                <span>0/3</span>
              </div>
            </div>
          </div>
      </div>
  )
}

export default RequireAuth(FocusSession)