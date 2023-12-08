import React from 'react'
import dashboard from './../Dashboard.module.css'
const SideBar = () => {
  return (
    <>
        <div className={dashboard.sidebarDiv}>
        <div draggable='true' className={dashboard.kanbanOption}>
          <span>Kanban Board</span>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <span>Check List</span>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <span>Focus Session</span>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <span>Settings</span>
        </div>
      </div>
    </>
  )
}

export default SideBar