import React from 'react'

import Title from '../../components/Parts/Title'

const Using = () => {
    const steps = [
        {icon : 'uil uil-user-plus', explain:'إنشاء حساب إن لم يكن لديك'},
        {icon : 'uil uil-signin', explain:'تسجيل الدخول'},
        {icon : 'uil uil-search', explain:'البحث عن الصالة الرياضية'},
        {icon : 'uil uil-thumbs-up', explain:'متابعة الصالة إن أعجبتك'}
    ]
return (
    <section className="bg-gray-50" id='using'>
        <Title title='إستخدام الموقع' />
        <div className="container flex flex-wrap justify-center items-center gap-4">
            {
                steps.map((step,index) => 
                    <div className="step bg-white relative w-64" key={index}>
                        <i className={step.icon}></i>
                        <div className="stepExplain text-center text-lg">
                            {step.explain}
                        </div>
                        <div className="numStep relative">
                            <span>الخطوة</span>
                        </div>
                    </div>
                )
            }
        </div>
    </section>
)
}

export default Using