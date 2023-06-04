import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const AdminContext = createContext();

export const AdminContextProvider = ({children}) => {

    const [admin,setAdmin] = useState({});

    useEffect(()=>{

        if(localStorage.getItem('token')) {
            const getAdminInfo = async () => {
                const storedUser = localStorage.getItem('userId');
                try {
                    const response = await axios.get(`http://localhost:4000/getUser/${storedUser}`);
                    setAdmin(response.data.userFound);
                } catch (error) {
                    console.error(error);
                }
            };
            getAdminInfo();
        }
    })

  return (
    <AdminContext.Provider value={admin}>
        {children}
    </AdminContext.Provider>
  )
}