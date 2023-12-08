import React from 'react'
import dashboard from './Dashboard.module.css'
import Navbar from './../navbar/navbar'
import SideBar from './sideBar/SideBar'
import FocusSession from './MainBody/FocusSession'
const Dashboard = () => {

  const bg_image = "https://i.makeagif.com/media/4-18-2021/U5UZ9W.gif"

  return (
    <div className={dashboard.mainDiv}>
    <Navbar/>
      <img className={dashboard.bg_image} alt='bg_image' src={bg_image} />
      <SideBar/>
      <div className={dashboard.mainBody}>
        <div className={dashboard.kanbanBoarddiv}></div>
        <FocusSession/>
        <div className={dashboard.checklistDiv}></div>
          <iframe title='music' className={dashboard.musicDiv} src='https://freefy.app/search/lofi/playlists'></iframe>
      </div>
    </div>
  )
}

export default Dashboard