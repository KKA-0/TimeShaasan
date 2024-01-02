import React, {useState} from 'react'
import dashboard from './Dashboard.module.css'
import Navbar from '../navbar/navbar'
import SideBar from './sideBar/SideBar'
import FocusSession from './MainBody/Pages/FocusSession'
import Auth from './MainBody/Pages/auth'
import Overview from './MainBody/Pages/overview/overview'
import KarbanBoard from './MainBody/Pages/KarbanBoard'
import CheckList from './MainBody/Pages/CheckList.jsx'
import Settings from './MainBody/widgets/Settings.jsx'
import MusicWidget from './MainBody/widgets/musicWidget.jsx'

import { MdLibraryMusic } from "react-icons/md";
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state.user.username)
  const bg_image = "https://i.makeagif.com/media/4-18-2021/U5UZ9W.gif"
  const [Music, setMusic] = useState(0)
  
  const MusicToggle = () => {
     if(Music === 0) setMusic(1) 
     else setMusic(0)
  }

  return (
    <div className={dashboard.mainDiv}>
      <Navbar/>
      <img className={dashboard.bg_image} alt='bg_image' src={bg_image} />
      {(user) ? "" : <Navigate to="/auth"/>}
      {(user) ? <SideBar/> : ""}
      {(user) ?  <div onClick={MusicToggle} className={dashboard.MusicToggle}> <MdLibraryMusic color='white' size="2em" /> </div> : ""}
      {(user) ? <MusicWidget MusicToggle={Music}/> : ""}
      
        <Routes>
          <Route path='/' element={<FocusSession/>} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/overview' element={<Overview/>} />
          <Route path='/focus-session' element={<FocusSession/>} />
          <Route path='/karbanboard' element={<KarbanBoard/>} />
          <Route path='/checklist' element={<CheckList/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
    </div>
  )
}

export default Dashboard