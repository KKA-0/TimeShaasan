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

  // States for Storing Values
  const dispatch = useDispatch()

  // State for Session Limit
  const [sessionsLimit, setsessionsLimit] = useState(0)

  // State for Start Timestamp
  const [startTimestamp, setstartTimestamp] = useState(0)

  // State for Remaining Time
  const [stopTimeremain, setstopTimeremain] = useState(0)

  // State for Toggle Timer [ true = pause, false = resume]
  const [ToggleTimer, setToggleTimer] = useState(true)

  // Ref for Getting the Value of Session Limit
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

    // Fn to Start Timer by updating states, redux and API call
    const StartTimer = () => {
      const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
      setsessionsLimit(Startvalue.current.value)
      setstartTimestamp(currentUnixTimeInSeconds)
      setToggleTimer(false)
      dispatch(updateFocusSession({startTimestamp: currentUnixTimeInSeconds, sessionsLimit: Startvalue.current.value, remainingTime: 0, ToggleTimer: false, id: id}))
    }
    // Custom hook for updating and Runnig Timer
    const { remainingTime, formatTime } = useFocusSession(sessionsLimit, startTimestamp, stopTimeremain);

    // Fn for Stopping Timer and Resumeing Timer when ToogleTimer
    const StopTimer = () => {
      if(ToggleTimer === false){
        // Stopping Timer From Running state
        const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const elapsedTime = currentUnixTimeInSeconds - startTimestamp;
        const remainingTime = sessionsLimit - elapsedTime;
        setstopTimeremain(remainingTime)
        setToggleTimer(true)
        dispatch(updateFocusSession({startTimestamp: currentUnixTimeInSeconds, sessionsLimit: Startvalue.current.value, remainingTime: remainingTime, ToggleTimer: true, id: id}))
      }else{
        // Resuming Timer From Stopped state
        const currentUnixTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        setstartTimestamp(currentUnixTimeInSeconds)
        setsessionsLimit(stopTimeremain)
        dispatch(updateFocusSession({startTimestamp: currentUnixTimeInSeconds, sessionsLimit: stopTimeremain, remainingTime: 0, ToggleTimer: false, id: id}))
        setstopTimeremain(0)
        setToggleTimer(false)
      }
    }

    const _useFocusSession_redux = useFocusSession_redux()
    
    // If Session Exists in Redux
    const id = useSelector((state) => state.user.id)
    const Session = useSelector((state) => state.user.session)
    useEffect(() => {
        setsessionsLimit(Session.sessionsLimit)
        setstartTimestamp(Session.startTimestamp)
        setstopTimeremain(Session.remainingTime)
        setToggleTimer(Session.ToggleTimer)
        // console.log('Session Redux Thunk')
    }, [Session, _useFocusSession_redux])

  return (
    <>
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
    </>
  )
}

export default RequireAuth(FocusSession)