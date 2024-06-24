import { Link } from 'react-router-dom';
import "./navbar.css";
import Cookies from 'js-cookie';
import axios from 'axios';
const Navbar = () => {
    const auth = Cookies.get('TOKEN');
    const toggleVisibility = async () => {
        const token = Cookies.get('TOKEN');
        if (!token) {
            //alert("Không có token")
            console.log("Không có token");
        } else {
            try {
                const res = await axios.get("http://localhost:3001/logout",{   
                        withCredentials: true,
                });
                console.log("đăng xuất: ",res.data);
                if(res.data.result===1){
                    alert("Đăng xuất thành công");
                    Cookies.remove('TOKEN');
                    Cookies.remove('USERID')
                    window.location.reload();
                }
            } catch (error) {
                console.error("Lỗi đăng xuất: ", error);
            }
        }

    }
    return (
        <>

            <nav className="navbarr">
                <div className="logo"></div>
                <Link to="/">Home</Link>
                <Link to="/dogs">Dogs</Link>
                <Link to="/checkout">Cart</Link>
                <Link to={auth ? "/":"/login"} onClick={toggleVisibility}>{auth ? 'Logout' : 'Login'} </Link>
            </nav>
        </>
    );
}
export default Navbar