import React, {useState, useRef, useEffect} from 'react';
// import { io } from "socket.io-client";
import Pages from './../Pages/Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'
import useFocusSession  from '../../../../hooks/useFocusSession';
import { useDispatch, useSelector } from 'react-redux';
import { updateFocusSession } from './../../../../features/userSlice'

import { MdOutlineMotionPhotosPause } from "react-icons/md";
import { RxResume } from "react-icons/rx";
import { Tooltip } from 'react-tooltip'

import useFocusSession_redux from '../../../../hooks/useFocusSession.redux';

const FocusSession = () => {
  const dispatch = useDispatch()
  const [sessionsLimit, setsessionsLimit] = useState(0)
  const [startTimestamp, setstartTimestamp] = useState(0)
  const [stopTimeremain, setstopTimeremain] = useState(0)
  const [ToggleTimer, setToggleTimer] = useState(false)
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
      const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      setsessionsLimit(Startvalue.current.value)
      setstartTimestamp(currentUnixTimeInSeconds)
      dispatch(updateFocusSession({startTimestamp: currentUnixTimeInSeconds, sessionsLimit: Startvalue.current.value, remainingTime: 0, ToggleTimer: false, id: id}))
    }
    const { remainingTime, formatTime } = useFocusSession(sessionsLimit, startTimestamp, stopTimeremain);
    
    const StopTimer = () => {
      if(ToggleTimer === false){
        const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const elapsedTime = currentUnixTimeInSeconds - startTimestamp;
        const remainingTime = sessionsLimit - elapsedTime;
        setstopTimeremain(remainingTime)
        setToggleTimer(true)
        dispatch(updateFocusSession({startTimestamp: currentUnixTimeInSeconds, sessionsLimit: Startvalue.current.value, remainingTime: remainingTime, ToggleTimer: true, id: id}))
      }else{
        const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        setstartTimestamp(currentUnixTimeInSeconds)
        setsessionsLimit(stopTimeremain)
        setstopTimeremain(0)
        setToggleTimer(false)
      }
    }

    useFocusSession_redux()
    
    // If Session Exists in Redux
    const id = useSelector((state) => state.user.id)
    const Session = useSelector((state) => state.user.session)
    useEffect(() => {
        setsessionsLimit(Session.sessionsLimit)
        setstartTimestamp(Session.startTimestamp)
        setstopTimeremain(Session.remainingTime)
        setToggleTimer(Session.ToggleTimer)
    }, [Session])
        
  return (
      <div className={Pages.mainBody}>
          <div className={Pages.focusSessions}>
            <div className={Pages.timerDiv}>
              <span className={Pages.timer}>{formatTime(remainingTime)}</span>
              <span className={Pages.remaining} style={(ToggleTimer) ? {color: "red"} : {color: "white"}}>Remaining</span>
            </div>
            <div className={Pages.FocusSessionSettings}>
            
              <div onClick={() => StartTimer()}>
                <RxResume size='3em' data-tooltip-id="iconsResume" data-tooltip-content="Start/Reset Timer" data-tooltip-place="top" className={Pages.iconsResume} style={{ margin: '5px', cursor: 'pointer' }}/>
                <Tooltip id="iconsResume" />
              </div>
            
              <div onClick={() => StopTimer()}>
                <MdOutlineMotionPhotosPause size='3em' data-tooltip-id="iconsPause" data-tooltip-content={(ToggleTimer) ? "Resume Timer" : "Pause Timer"} data-tooltip-place="top" className={Pages.iconsPause} style={{ margin: '5px', cursor: 'pointer' }}/>
                <Tooltip id="iconsPause" />
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