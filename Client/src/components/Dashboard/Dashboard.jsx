import React, {useState} from 'react'
import dashboard from './Dashboard.module.css'
import Navbar from '../navbar/navbar'
import SideBar from './sideBar/SideBar'
import FocusSession from './MainBody/Pages/FocusSession'
import Auth from './MainBody/Pages/auth'
import Overview from './MainBody/Pages/overview/overview'
import KanbanBoard from './MainBody/Pages/KanbanBoard'
import CheckList from './MainBody/Pages/CheckList.jsx'
import Settings from './MainBody/widgets/Settings.jsx'
import MusicWidget from './MainBody/widgets/musicWidget.jsx'
import Pages from './MainBody/Pages/Pages.module.css'
import { SettingsData } from './../../features/settingSlice.js'
import { useDispatch } from "react-redux"
import { MdLibraryMusic } from "react-icons/md";
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const usedispatch = useDispatch()
  usedispatch(SettingsData())
  const user = useSelector((state) => state.user.username)
  const BG = useSelector((state) => state.settings.bg)
  const [Music, setMusic] = useState(0)
  
  const MusicToggle = () => {
     if(Music === 0) setMusic(1) 
     else setMusic(0)
  }

  return (
    <div className={dashboard.mainDiv}>
      <Navbar/>
      <img className={dashboard.bg_image} alt='bg_image' src={(!BG) ? "" : BG} />
      {(user) ? "" : <Navigate to="/auth"/>}
      {(user) ? <SideBar/> : ""}
      {(user) ?  <div onClick={MusicToggle} className={dashboard.MusicToggle}> <MdLibraryMusic color='white' size="2em" /> </div> : ""}
      {(user) ? <MusicWidget MusicToggle={Music}/> : ""}
          <Routes>
            <Route path='/' element={<FocusSession/>} />
            <Route path='/auth' element={<Auth/>} />
            <Route path='/overview' element={<div className={dashboard.mainBody}><Overview/></div>} />
            <Route path='/focus-session' element={<div className={Pages.mainBody}><FocusSession/></div>} />
            <Route path='/KanbanBoard' element={<div className={Pages.mainBody}><KanbanBoard/></div>} />
            <Route path='/checklist' element={<div className={Pages.mainBody}><CheckList/></div>}/>
            <Route path='/settings' element={<div className={Pages.mainBody}><Settings/></div>}/>
          </Routes>
    </div>
  )
}

export default Dashboard