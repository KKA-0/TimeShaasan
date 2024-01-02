import React, { useState, useEffect } from 'react'
import Pages from './../Pages/Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'

import { MdOutlineMotionPhotosPause } from "react-icons/md";
import { LuTimerReset } from "react-icons/lu";
import { RxResume } from "react-icons/rx";

const FocusSession = () => {

    const [Minute, setMinute] = useState(0)
    const [Second, setSecond] = useState(0)

    useEffect(() => {
      const stopTimer = setInterval(() => {
        if(Minute === 0 && Second === 0){
            clearInterval(stopTimer)
        }
        else if(Second === 0){
            setMinute(Minute-1)
            setSecond(60)
            console.log("Minute")
        }else{
            setSecond(Second-1)
            console.log("Second")
        }
      }, 1000)
    }, [Second])
    
    const StartTimer = () => {
        setMinute(9)
        setSecond(59)
    }

    const StopTimer = () => {
      
    }

    const ResetTimer = () => {
      setMinute(45)
      setSecond(59)
    }
  return (
    <div className={Pages.mainBody}>
      <div className={Pages.mainBody}>
          <div className={Pages.focusSessions}>
            <div className={Pages.timerDiv}>
              <span className={Pages.timer}>{Minute}:{Second}</span>
              <span className={Pages.day}>Remaining</span>
            </div>
            <div className={Pages.FocusSessionSettings}>
              <RxResume onClick={StartTimer} size='3em' color='white' style={{ margin: '5px', cursor: 'pointer' }}/>
              <MdOutlineMotionPhotosPause onClick={StopTimer} size='3em' color='white' style={{ margin: '5px', cursor: 'pointer' }}/>
              <LuTimerReset size='3em' color='white' style={{ margin: '5px', cursor: 'pointer' }}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RequireAuth(FocusSession)