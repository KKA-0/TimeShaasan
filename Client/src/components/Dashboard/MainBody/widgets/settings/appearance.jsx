import React, {useState, useRef} from 'react'
import widget from './../widget.module.scss'
import Pages from './../../Pages/Pages.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { editSettings } from './../../../../../features/settingSlice'

const Appearance = () => {
  const usedispatch = useDispatch()
  const user_id = useSelector((state) => state.user.id)
  const bg = useSelector((state) => state.settings.bg)
  const newBG = useRef()
  const [BG, setBG] = useState(bg)
  
  const handleSubmitChanges = (e) => {
    e.preventDefault()
    const Changes = {
      user_id: user_id,
      Background: newBG.current.value
    }
    usedispatch(editSettings(Changes))
  }
  return (
    <div className={widget.container_basicinfo}>
        <span className={widget.title_}>Appearance</span>
        <div className={widget.line}></div>

        <div className={widget.div_basicinfo}>
          <span className={widget.title_bg}>Background</span>
          <div>
            <img height={100} width={200} src={BG} alt='BackGround Preview'/>
            <form class={widget.formField}>
              <input ref={newBG} value={BG} type="text" onChange={(e) => setBG(e.target.value)} className={widget.inputfield} />
              <span className={widget.spanText}>Background Link</span>
            </form>
            
          </div>
          <span className={widget.title_bg}>Accent</span>
          <div className={widget.accentSelector}>
            <label className={widget.accentOption}>
              <input type="radio" name="accent-color" value="red" />
              <span className={`${widget.colorSelector} ${widget.red}`}></span>
            </label>
            <label className={widget.accentOption}>
              <input type="radio" name="accent-color" value="blue" />
              <span className={`${widget.colorSelector} ${widget.blue}`}></span>
            </label>
            <label className={widget.accentOption}>
              <input type="radio" name="accent-color" value="green" />
              <span className={`${widget.colorSelector} ${widget.green}`}></span>
            </label>
          </div>
          

          <span className={widget.title_bg}>Font</span>
          <span className={widget.title_bg}>Positions</span>
          <div className="positionDiv">
            <span className={widget.title_bg} style={{margin: "0px 10px"}}>Pomodoro</span>
            <select style={{margin: "0px 10px"}} className={Pages.SessionsLimit}>
              <option>Center</option>
              <option>Top-Right</option>
              <option>Top-Left</option>
              <option>Bottom-Right</option>
              <option>Botton-Left</option>
            </select>
          </div>
          <button className={widget.customButton} onClick={handleSubmitChanges}>
                  <div className={widget.customSvgWrapper1}>
                    <div className={widget.customSvgWrapper}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className={widget.customSvg}
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span className={widget.customSpan}>Submit</span>
                </button>
        </div>
    </div>
  )
}

export default Appearance