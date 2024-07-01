import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
const useCheckAdmin = () => {
    const navigate = useNavigate();
    const [isAdmin, setisAdmin] = useState(0);
    useEffect(() => {
        const fetchToken = async () => {
            const token = cookie.get('TOKEN');
            // console.log("Token", token);
            if (!token) {
                // console.log("Không có token");
                navigate('/login')
            } else {
                try {
                    const res = await axios.get('http://localhost:3001/checkadmin', {
                        withCredentials: true
                    })
                    //console.log("dataaaaaa", res.data.result);
                    if (res.data.result === 1) {
                        setisAdmin( res.data.result);
                        navigate('/admin');
                    } else{
                        navigate('/')
                    }
                    
                    
                } catch (error) {
                    if (error.response) {
                        console.error('Lỗi khi kiểm tra quyền admin:', error.response.data);
                         navigate('/login')
                        //setisAdmin(0);
                    } else if (error.request) {
                        console.error('Không nhận được phản hồi từ server:', error.request);
                         navigate('/login')
                        //setisAdmin(0);
                    } else {
                        console.error('Lỗi khi thiết lập yêu cầu:', error.message);
                         navigate('/login')
                        //setisAdmin(0);
                    }
                }
            }
        };
        fetchToken();
    }, [navigate]);
    //console.log("admin," ,isAdmin);
    return isAdmin;
};

export default useCheckAdmin;
