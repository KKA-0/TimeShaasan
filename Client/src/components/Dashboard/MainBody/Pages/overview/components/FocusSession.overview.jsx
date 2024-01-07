import React, { useState, useEffect } from 'react'
import dashboard from './../../../../Dashboard.module.css'
import useFocusSession from '../../../../../../hooks/useFocusSession';

const FocusSession = () => {

  const startTimestamp = 1704538064;
  const sessionsLimit = 2400;
  const { remainingTime, formatTime } = useFocusSession(sessionsLimit, startTimestamp);
  return (
    <>
        <div className={dashboard.focusSessions}>
          <div className={dashboard.timerDiv}>
            <span className={dashboard.timer}>{formatTime(remainingTime)}</span>
            <span className={dashboard.day}>Remaining</span>
          </div>
          <div className={dashboard.FocusSessionSettings}>
            <button >Start</button>
            <button >Stop</button>
            <button >Reset</button>
          </div>
        </div>
    </>
  )
}

export default FocusSession