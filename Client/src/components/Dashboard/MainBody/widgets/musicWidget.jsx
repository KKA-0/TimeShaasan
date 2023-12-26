import React from 'react';
import widget  from './widget.module.scss';

const MusicWidget = (props) => {
    console.log(props.MusicToggle)
    const MusicToggle = () => {
        if(props.MusicToggle === 0){
            return {display: "none"}
        }else{
            return {display: "initial"}
        }
    }
  return (
    <div className={widget.musicWidgetDiv} style={MusicToggle()}>
         <iframe title='music' className={widget.musicDiv} src='https://freefy.app/search/lofi/playlists'></iframe>
    </div>
  )
}

export default MusicWidget