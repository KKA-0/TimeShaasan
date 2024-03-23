import React, {useState} from 'react'
import widget from './../widget.module.scss'
const Appearance = () => {

  const [BG, setBG] = useState("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/618395ed-3302-4408-bcd8-4ce51cc8b364/devuvri-72d83bb8-2c95-4c1e-8e80-408a5fc90c63.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYxODM5NWVkLTMzMDItNDQwOC1iY2Q4LTRjZTUxY2M4YjM2NFwvZGV2dXZyaS03MmQ4M2JiOC0yYzk1LTRjMWUtOGU4MC00MDhhNWZjOTBjNjMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FXQlzRsSZOJ1es_xcXulz8ZHGBBlButmhRuklrhLKbY")

  return (
    <div className={widget.container_basicinfo}>
        <span className={widget.title_}>Appearance</span>
        <div className={widget.line}></div>

        <div className={widget.div_basicinfo}>
          <span className={widget.title_bg}>Background</span>
{/* 
          <div>
            <input type="radio"/>
            <span >Focus Mode</span>
            <input type="radio"/>
            <span >Custom Background</span>
          </div>
          <div>
            <img height={100} width={200} src={BG}/>
            <input type="text" disabled value={BG}/>
            <button>Change</button>
          </div> */}
          <span className={widget.title_bg}>Accent</span>
          <span className={widget.title_bg}>Font</span>
          <span className={widget.title_bg}>Positions</span>
        </div>
    </div>
  )
}

export default Appearance