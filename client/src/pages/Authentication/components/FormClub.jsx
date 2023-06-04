import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getPlace from '../../../components/functions/GetPlace';
import { hostUrl } from '../../../helper';

const FormClub = (props) => {
        const [user, setUser] = useState({
                name:'',
                email:'',
                password:'',
                checkPassword:'',
                phone:'',
                birthday:'',
                wilaya: '',
                daira: '',
                baladia:'',
                sport:'',
                typeOfUser:'club',
                gender:'mix'
        });
        // const [checkPassword,setCkeckPassword] = useState('')
        const [errors,setErrors] = useState([]);
        const [error,setError] = useState('');
        const [jsonMessage,setJsonMessage] = useState('');

        const handleChange = (e) => {
                setUser({...user,[e.target.name]:e.target.value})
        }

        const Signup = async (event) => {
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
                getPlace('wilayaSelect1','dairaSelect1','baladiaSelect1');
        })
        return (
        <form onSubmit={Signup} className={props.activeForm === 'club' ? 'active p-4' : 'hidden'}>
        <div className="parts flex">
                <div className="part flex flex-col gap-4">
                <div className="input flex flex-col">
                        <label htmlFor="name1">إسم النادي الرياضي</label>
                        <input type="text" id='name1' name='name' className={errors.includes('nameError') ? 'red-border':null} onChange={handleChange}  />
                        <small className={errors.includes('nameError') ? ' text-red-700':'hidden'}>يجب أن يكون الإسم أطول من 6 أحرف</small>
                </div>
                <div className="input flex flex-col">
                        <label htmlFor="email1">البريد الإلكتروني</label>
                        <input type="email" id='email1' name='email' onChange={handleChange}/>
                </div>
                <div className="input flex flex-col">
                        <label htmlFor="phone1">رقم الهاتف</label>
                        <input type="number" id='phone1' name='phone' className={errors.includes('phoneError') || errors.includes('phoneExist')  ? 'red-border' :null} onChange={handleChange}  />
                        <small className={errors.includes('phoneError') || errors.includes('phoneExist')  ? ' text-red-700' : 'hidden'} >رقم هاتف غير صالح</small>
                </div>
                <div className="input flex flex-col">
                        <label htmlFor="password1">كلمة السر</label>
                        <input type="password" id='password1' className={errors.includes('passwordError') ? 'red-border' :null} onChange={handleChange} name='password'  />
                        <small className={errors.includes('passwordError') ? ' text-red-700':'hidden'}>يجب أن تكون كلمة السر أطول من 8 أحرف</small>
                </div>
                <div className="input flex flex-col">
                        <label htmlFor="confirmPassword1">تأكيد كلمة السر</label>
                        <input type="password" id='confirmPassword1' name='checkPassword' className={errors.includes('checkPasswordError') ? 'red-border' :null} onChange={handleChange}  />
                        <small className={errors.includes('checkPasswordError') ? ' text-red-700':'hidden'}>كلمتي السر غير متطابقتين</small>
                </div>
        </div>
        <div className="part flex flex-col gap-4">
                <div className="input flex flex-col">
                        <label htmlFor="birthday1">تاريخ تأسيس النادي</label>
                        <input type="date" id='birthday1' name='birthday' className={errors.includes('birthdayError') ? 'red-border' :null} onChange={handleChange} />
                        <small className={errors.includes('birthdayError') ? ' text-red-700':'hidden'}>هذا الحقل اجباري</small>
                </div>
                <div className="input flex flex-col">
                        <label>موقع النادي</label>
                        <div className="places flex flex-col gap-2">
                                <div className="wilaya">
                                        <label htmlFor="wilaya1" className=' ml-1' >الولاية</label>
                                        <select name="wilaya" id="wilaya1" className={`wilayaSelect1 ${errors.includes('wilayaError') ? 'red-border' : null} `} defaultValue={user.wilaya} onChange={handleChange}>
                                                <option selected>إختر ولاية</option>
                                        </select>
                                        <small className={errors.includes('wilayaError') ? 'block text-red-700':'hidden'}>هذا الحقل اجباري</small>
                                </div>
                                <div className="daira1">
                                        <label htmlFor="daira" className=' ml-1' >الدائرة</label>
                                        <select name="daira" id="daira1" className={`dairaSelect1 ${errors.includes('dairaError') ? 'red-border' : null} `} defaultValue={user.daira} onChange={handleChange}>
                                                <option selected>إختر دائرة</option>
                                        </select>
                                        <small className={errors.includes('dairaError') ? 'block text-red-700':'hidden'}>هذا الحقل اجباري</small>
                                </div>
                                <div className="baladia">
                                        <label htmlFor="baladia1" className=' ml-1' >البلدية</label>
                                        <select name="baladia" id="baladia1" className={`baladiaSelect1 ${errors.includes('baladiaError') ? 'red-border' : null} `}  defaultValue={user.baladia} onChange={handleChange}>
                                                <option selected>إختر بلدية</option>
                                        </select>
                                        <small className={errors.includes('baladiaError') ? 'block text-red-700':'hidden'}>هذا الحقل اجباري</small>
                                </div>
                        </div>
                </div>
                <div className="input flex flex-col">
                        <label htmlFor="sport1">رياضة النادي</label>
                        <input type="text" name="sport" id="sport1" onChange={handleChange} className={errors.includes('sportError') ? 'red-border' : null} />
                        <small className={errors.includes('sportError') ? ' text-red-700':'hidden'}>هذه الخانة اجبارية</small>
                </div>
        </div>
        </div>
        {jsonMessage && <div className="jsonMessage text-center mt-6 p-2 w-fit mx-auto mb-4">{jsonMessage}</div>}
        {error && <div className="error text-center mt-6 p-2 w-fit mx-auto mb-4">{error}</div>}
        <input type="submit" value="إنشاء حساب" className=' cursor-pointer'/>
        </form>
        )
}

export default FormClub