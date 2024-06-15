import React from 'react'
import Nav from './../navbar/navbar'
import HomeScss from './home.module.scss'
import homeSVG from './../images/home.svg'
import consistentSVG from './../images/consistent.svg'
import clockSVG from './../images/clock.svg'
import targetSVG from './../images/target.svg'

import { Link } from "react-router-dom";
import { LuPlayCircle } from "react-icons/lu";

const Home = () => {
  return (
  <>
    <Nav/>
    <div className={HomeScss.section1}>
        <div className={HomeScss.titleDiv}>
            <span className={HomeScss.title}>Your Rulebook for Time Management</span>
            <Link to="/overview"><div className={HomeScss.startDiv}>
                <span>Get Started</span>
            </div></Link>
            <span className={HomeScss.videoWatch}> <u>Watch Video <LuPlayCircle /></u></span>
        </div>
        <div className={HomeScss.bgImage}>
            <img src={homeSVG} alt="homeSVG" width="100%"/>
        </div>
    </div>
    <section className={HomeScss.section2}>
        <div className={HomeScss.section2_block1}>
            <div className={HomeScss.section2_block1_text}>
                Be Consistent.
            </div>
            <img src={consistentSVG} alt="consistentSVG" style={{margin: "0 50px", height: "80%"}}/>
        </div>
        <div className={HomeScss.section2_block2}>
            <div className={HomeScss.section2_block2_minBlock1}>
                <div className={HomeScss.section2_block1_text}>Be on Time.</div>
                <img src={clockSVG} alt="clockSVG" style={{margin: "0 50px", height: "80%"}}/>
            </div>
            <div className={HomeScss.section2_block2_minBlock1}>
                <div className={HomeScss.section2_block1_text}>Be Focused.</div>
                <img src={targetSVG} alt="targetSVG" style={{margin: "0 50px", height: "80%"}}/>
            </div>
        </div>
    </section>
    <section>

    </section>
    </>
  )
}

export default Home