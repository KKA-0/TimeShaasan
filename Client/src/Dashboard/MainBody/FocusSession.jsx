import React, { useState, useEffect } from 'react'
import dashboard from './../Dashboard.module.css'

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
        }else{
            setSecond(Second-1)
        }
      }, 1000)
    }, [Second])
    
    const StartTimer = () => {
        setMinute(9)
        setSecond(59)
    }

  return (
    <>
        <div className={dashboard.focusSessions}>
          <div className={dashboard.timerDiv}>
            <span className={dashboard.timer}>{Minute}:{Second}</span>
            <span className={dashboard.day}>Remaining</span>
          </div>
          <div className={dashboard.FocusSessionSettings}>
            <button onClick={StartTimer}>Start</button>
          </div>
        </div>
    </>
  )
}

export default FocusSession