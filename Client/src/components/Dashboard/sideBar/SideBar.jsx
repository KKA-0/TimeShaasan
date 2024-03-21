import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { BsKanban } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { CgTimer } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import sidebar from './sidebar.module.scss'
const SideBar = () => {
  return (
    <>
        <div className={sidebar.sidebarDiv}>
        <div className={sidebar.kanbanOption}>
          <Link className={sidebar.a} to="/overview"><MdSpaceDashboard color="white" size="2em" className={sidebar.icon}/> <span className={sidebar.siderbarOption}>Overview</span></Link>
        </div>
        <div draggable='true' className={sidebar.kanbanOption}>
          <Link className={sidebar.a} to="/kanbanboard"><BsKanban color="white" size="2em" className={sidebar.icon}/><span className={sidebar.siderbarOption}>Kanban Board</span></Link>
        </div>
        <div draggable='true' className={sidebar.kanbanOption}>
          <Link className={sidebar.a} to="/checklist"><GoChecklist  color="white" size="2em" className={sidebar.icon}/><span className={sidebar.siderbarOption}>Check List</span></Link>
        </div>
        <div draggable='true' className={sidebar.kanbanOption}>
          <Link className={sidebar.a} to="/focus-session"><CgTimer  color="white" size="2em" className={sidebar.icon}/><span className={sidebar.siderbarOption}>Focus Session</span></Link>
        </div>
        <div className={sidebar.settingoption}>
          <Link className={sidebar.a} to="/settings"><IoMdSettings  color="white" size="2em" className={sidebar.icon}/><span className={sidebar.siderbarOption}>Settings</span></Link>
        </div>
      </div>
    </>
  )
}

export default SideBar