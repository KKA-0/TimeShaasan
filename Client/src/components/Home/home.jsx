import React from 'react'
import Nav from './../navbar/navbar'
import HomeScss from './home.module.scss'
import homeSVG from './../images/home.svg'
import consistentSVG from './../images/consistent.svg'
import clockSVG from './../images/clock.svg'
import targetSVG from './../images/target.svg'
import "animate.css/animate.compat.css"
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from "react-router-dom";
import { LuPlayCircle } from "react-icons/lu";

const Home = () => {
  return (
  <>
    <Nav/>
    <div className={HomeScss.section1}>
        <div className={HomeScss.titleDiv}>
            <img className={HomeScss.mobileHOMESVG} src={homeSVG} alt="homeSVG" width="100%"/>
            <span className={HomeScss.title}>Your Rulebook for Time Management</span>
            <div className={HomeScss.startDiv}>
            <Link to="/overview" style={{textDecoration: "none", color: 'white'}}>
                <ScrollAnimation animateIn="fadeIn">
                <span>Get Started</span>
                </ScrollAnimation>
            </Link>
            </div>
            <span className={HomeScss.videoWatch}> <u>Watch Video <LuPlayCircle /></u></span>
        </div>
        <div className={HomeScss.bgImage}>
            <img src={homeSVG} alt="homeSVG" width="100%"/>
        </div>
    </div>
    <section className={HomeScss.section2}>
        <div className={HomeScss.section2_block1}>
            <ScrollAnimation animateIn="fadeIn">
            <div className={HomeScss.section2_block1_text}>
                Be Consistent.
            </div>
            </ScrollAnimation>
            <img src={consistentSVG} className={HomeScss.consistentSVG} alt="consistentSVG"/>
        </div>
        <div className={HomeScss.section2_block2}>
            <div className={HomeScss.section2_block2_minBlock1}>
                <ScrollAnimation animateIn="fadeIn">
                <div className={HomeScss.section2_block1_text}>Be on Time.</div>
                </ScrollAnimation>
                <img src={clockSVG} className={HomeScss.clockSVG} alt="clockSVG"/>
            </div>
            <div className={HomeScss.section2_block2_minBlock1}>
                <ScrollAnimation animateIn="fadeIn">
                <div className={HomeScss.section2_block1_text}>Be Focused.</div>
                </ScrollAnimation>
                <img src={targetSVG} className={HomeScss.targetSVG} alt="targetSVG"/>
            </div>
        </div>
    </section>
    <section>

    </section>
    </>
  )
}

export default Home