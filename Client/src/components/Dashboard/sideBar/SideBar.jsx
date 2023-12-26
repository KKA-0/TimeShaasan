import React from 'react'
import dashboard from '../Dashboard.module.css'
import { MdSpaceDashboard } from "react-icons/md";
import { BsKanban } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { CgTimer } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import sidebar from './sidebar.module.css'
const SideBar = () => {
  return (
    <>
        <div className={dashboard.sidebarDiv}>
        <div className={dashboard.kanbanOption}>
          <Link className={sidebar.a} to="/overview"><MdSpaceDashboard color="white" size="2em" className={dashboard.icon}/> <span className={dashboard.siderbarOption}>Overview</span></Link>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <Link className={sidebar.a} to="/karbanboard"><BsKanban color="white" size="2em" className={dashboard.icon}/><span className={dashboard.siderbarOption}>Kanban Board</span></Link>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <Link className={sidebar.a} to="/checklist"><GoChecklist  color="white" size="2em" className={dashboard.icon}/><span className={dashboard.siderbarOption}>Check List</span></Link>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <Link className={sidebar.a} to="/focus-session"><CgTimer  color="white" size="2em" className={dashboard.icon}/><span className={dashboard.siderbarOption}>Focus Session</span></Link>
        </div>
        <div draggable='true' className={dashboard.kanbanOption}>
          <Link className={sidebar.a} to="/settings"><IoMdSettings  color="white" size="2em" className={dashboard.icon}/><span className={dashboard.siderbarOption}>Settings</span></Link>
        </div>
      </div>
    </>
  )
}

export default SideBar