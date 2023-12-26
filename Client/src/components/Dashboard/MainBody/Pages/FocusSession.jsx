import React, { useState, useEffect } from 'react'
import Pages from './../Pages/Pages.module.css'
import RequireAuth from '../../../RequireAuth/RequireAuth'

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
              <button onClick={StartTimer}>Start</button>
              <button onClick={StopTimer}>Stop</button>
              <button onClick={ResetTimer}>Reset</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default RequireAuth(FocusSession)