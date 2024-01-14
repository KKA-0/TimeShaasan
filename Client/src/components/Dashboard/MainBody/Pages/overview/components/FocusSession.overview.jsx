import React, { useState, useEffect } from 'react'
import dashboard from './../../../../Dashboard.module.css'
import useFocusSession from '../../../../../../hooks/useFocusSession';
import { useSelector } from 'react-redux';

const FocusSession = () => {
  const [sessionsLimit, setsessionsLimit] = useState(0)
  const [startTimestamp, setstartTimestamp] = useState(0)
  
  const Session = useSelector((state) => state.user.session)
  useEffect(() => {
    setsessionsLimit(Session.sessionsLimit)
    setstartTimestamp(Session.startTimestamp)
  }, [Session])
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