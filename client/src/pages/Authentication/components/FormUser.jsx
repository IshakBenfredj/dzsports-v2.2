import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getPlace from '../../../components/functions/GetPlace';
import { hostUrl } from '../../../helper';

const FormUser = (props) => {
    
    const [user, setUser] = useState({
        typeOfUser:'user',
        name:'',
        email:'',
        password:'',
        checkPassword:'',
        phone:'',
        birthday:'',
        wilaya:'',
        daira:'',
        baladia:'',
        sport:'',
        gender:'ذكر'
    });
    const [errors,setErrors] = useState([]);
    const [jsonMessage,setJsonMessage] = useState('');
    const [error,setError] = useState('');

    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const Login = async (event) => {
        event.preventDefault();
        console.log(user);
        setJsonMessage('')
        const response = await axios.post(`${hostUrl}signup`,user)
        console.log(errors);
        if (response.data.errors) {
                setErrors(response.data.errors);
                setError('يجب أن تكون جميع العلومات مملوئة بشكل صحيح')
        } else if (response.data.err) {
                setError(response.data.err)
                errors.push("phoneExist")
                console.log(errors);
        } else {
                setError('')
                setErrors([])
                setJsonMessage(response.data.message)
        }
    };
    useEffect(()=>{
        getPlace('wilayaSelect0','dairaSelect0','baladiaSelect0');
    })
    return (
        <form action="" method='get' className={props.activeForm === 'client' ? 'active p-4' : 'hidden'} onSubmit={Login}>
            <div className="parts flex">
            <div className="part flex flex-col gap-4">
                <div className="input flex flex-col">
                    <label htmlFor="name">الإسم الكامل</label>
                    <input type="text" id='name' name='name' className={errors.includes('nameError') ? 'red-border':null} onChange={handleChange}  />
                    <small className={errors.includes('nameError') ? ' text-red-700':'hidden'}>يجب أن يكون الإسم أطول من 6 أحرف</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="email">البريد الإلكتروني</label>
                    <input type="email" id='email' name='email' onChange={handleChange}  />
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="phone">رقم الهاتف</label>
                    <input type="number" id='phone' name='phone'  className={errors.includes('phoneError') || errors.includes('phoneExist')  ? 'red-border' :null} onChange={handleChange} />
                    <small className={errors.includes('phoneError') || errors.includes('phoneExist') ? ' text-red-700' : 'hidden'} >رقم هاتف غير صالح</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="password">كلمة السر</label>
                    <input type="password" id='password' name='password' className={errors.includes('passwordError') ? 'red-border' :null} onChange={handleChange}  />
                    <small className={errors.includes('passwordError') ? ' text-red-700':'hidden'}>يجب أن تكون كلمة السر أطول من 8 أحرف</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="confirmPassword">تأكيد كلمة السر</label>
                    <input type="password" id='confirmPassword' name='checkPassword' className={errors.includes('checkPasswordError') ? 'red-border' :null} onChange={handleChange}  />
                    <small className={errors.includes('checkPasswordError') ? ' text-red-700':'hidden'}>كلمتي السر غير متطابقتين</small>
                </div>
            </div>
            <div className="part flex flex-col gap-4">
                <div className="input flex flex-col">
                    <label htmlFor="birthday">تاريخ الميلاد</label>
                    <input type="date" id='birthday' name='birthday'  className={errors.includes('birthdayError') ? ' red-border': null } onChange={handleChange}  />
                    <small className={errors.includes('birthdayError') ? ' text-red-700':'hidden'}>هذا الحقل اجباري</small>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="address">مكان السكن</label>
                    <div className="places flex flex-col gap-2">
                        <div className="wilaya">
                            <label htmlFor="wilaya" className=' ml-1' >الولاية</label>
                            <select name="wilaya" id="wilaya" className={`wilayaSelect0 ${errors.includes('wilayaError') ? 'red-border' : null} `} defaultValue={document.querySelectorAll('#wilaya option')[0]} onChange={handleChange}  >
                                <option disabled selected>إختر ولاية</option>
                            </select>
                            <small className={errors.includes('wilayaError') ? 'block text-red-700':'hidden'}>هذا الحقل اجباري</small>
                        </div>
                        <div className="daira">
                            <label htmlFor="daira" className=' ml-0'>الدائرة</label>
                            <select name="daira" id="daira" className={`dairaSelect0 ${errors.includes('dairaError') ? 'red-border' : null} `} defaultValue={document.querySelectorAll('#daira option')[0]} onChange={handleChange} >
                                <option disabled>إختر دائرة</option>
                            </select>
                            <small className={errors.includes('dairaError') ? 'block text-red-700':'hidden'}>هذا الحقل اجباري</small>
                        </div>
                        <div className="baladia">
                            <label htmlFor="baladia" className=' ml-1' >البلدية</label>
                            <select name="baladia" id="baladia" className={`baladiaSelect0 ${errors.includes('baladiaError') ? 'red-border' : null} `} defaultValue={document.querySelectorAll('#baladia option')[0]} onChange={handleChange}>
                                <option disabled>إختر بلدية</option>
                            </select>
                            <small className={errors.includes('baladiaError') ? 'block text-red-700':'hidden'}>هذا الحقل اجباري</small>
                        </div>
                    </div>
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="sport">رياضتك المفضلة</label>
                    <input type="text" name="sport" id="sport" onChange={handleChange}  />
                </div>
                <div className="input flex flex-col">
                    <label htmlFor="gender">الجنس</label>
                    <select name="gender" id="gender" className={errors.includes('genderError') ? 'red-border':null} defaultValue={'ذكر'} onChange={handleChange} >
                        <option value="ذكر" selected>ذكر</option>
                        <option value="انثى">انثى</option>
                    </select>
                    <small className={errors.includes('genderError') ? 'text-red-700':'hidden'}>هذا الحقل اجباري</small>
                </div>
            </div>
            </div>
                {jsonMessage && <div className="jsonMessage text-center mt-6 p-2 w-fit mx-auto mb-4">{jsonMessage}</div>}
                {error && <div className="error text-center mt-6 p-2 w-fit mx-auto mb-4">{error}</div>}
            <input type="submit" value="إنشاء حساب" className=' cursor-pointer'/>
        </form>
    )
}

export default FormUser