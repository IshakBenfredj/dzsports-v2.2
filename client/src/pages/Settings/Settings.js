import React, { useEffect } from 'react'
import SettingsForm from './SettingsForm'

const Settings = () => {

  useEffect(()=>{
    document.title = 'الإعدادات'
  })

  return (
    <div className=' bg-[#fafafa]'>
      <div className='settings formsPage'>
        <div className="formIntro">
          <h1 className='relative text-white my-3 mx-auto w-full text-4xl'>الإعدادات</h1>
        </div>
        <div className="formsSettings flex align-top justify-center gap-3 flex-wrap">
          <SettingsForm />
        </div>
      </div>
    </div>
  )
}

export default Settings