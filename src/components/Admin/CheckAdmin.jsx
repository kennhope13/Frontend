import { useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
const useCheckAdmin = () => {
    const navigate = useNavigate();
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
                    // console.log("dataaaaaa", res.data.result);
                    if (res.data.result === 1) {
                        navigate('/admin')
                    } else{
                        navigate('/')
                    }
                    
                } catch (error) {
                    if (error.response) {
                        console.error('Lỗi khi kiểm tra quyền admin:', error.response.data);
                        navigate('/login')
                    } else if (error.request) {
                        console.error('Không nhận được phản hồi từ server:', error.request);
                        navigate('/login')
                    } else {
                        console.error('Lỗi khi thiết lập yêu cầu:', error.message);
                        navigate('/login')
                    }
                }
            }
        };
        fetchToken();
    }, [navigate]);
};

export default useCheckAdmin;
