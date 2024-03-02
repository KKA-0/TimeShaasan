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

import { MdLibraryMusic } from "react-icons/md";
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {

  const user = useSelector((state) => state.user.username)
  const bg_image = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/618395ed-3302-4408-bcd8-4ce51cc8b364/devuvri-72d83bb8-2c95-4c1e-8e80-408a5fc90c63.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYxODM5NWVkLTMzMDItNDQwOC1iY2Q4LTRjZTUxY2M4YjM2NFwvZGV2dXZyaS03MmQ4M2JiOC0yYzk1LTRjMWUtOGU4MC00MDhhNWZjOTBjNjMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FXQlzRsSZOJ1es_xcXulz8ZHGBBlButmhRuklrhLKbY"
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