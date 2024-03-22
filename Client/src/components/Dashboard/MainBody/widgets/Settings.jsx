import { useState } from 'react'
import widget from './widget.module.scss'

import BasicInfo from './settings/basicInfo'
import Plans from './settings/plans'
import Appearance from './settings/appearance'
import Notification from './settings/notification'
import Integrations from './settings/integrations'

const Settings = () => {

  const [ToggleSettings, setToggleSettings] = useState(1)
  const active_Style = {
    color: "white",
    borderBottom: "2px solid",
  }

  return (
    <div className={widget.Setting_Container}>
      <div className={widget.settings_title}>
        <span className={widget.settings_span}>WorkSpace Settings</span>
      </div>
      <div className={widget.settings_nav}>
        <span className={widget.basic_settings} onClick={() => setToggleSettings(1)} style={(ToggleSettings === 1) ? active_Style : null}> Basic Info </span>
        <span className={widget.plan_settings} onClick={() => setToggleSettings(2)} style={(ToggleSettings === 2) ? active_Style : null}> Plans & Billings </span>
        <span className={widget.appearance_settings} onClick={() => setToggleSettings(3)} style={(ToggleSettings === 3) ? active_Style : null}> Appearance </span>
        <span className={widget.notify_settings} onClick={() => setToggleSettings(4)} style={(ToggleSettings === 4) ? active_Style : null}> Notification </span>
        <span className={widget.integration_settings} onClick={() => setToggleSettings(5)} style={(ToggleSettings === 5) ? active_Style : null}> Integrations </span>
      </div>
      <hr></hr>
      <div className={widget.container}>
        {ToggleSettings === 1 && <BasicInfo />}
        {ToggleSettings === 2 && <Plans />}
        {ToggleSettings === 3 && <Appearance />}
        {ToggleSettings === 4 && <Notification />}
        {ToggleSettings === 5 && <Integrations />}
      </div>

    </div>
  )
}

export default Settings;
