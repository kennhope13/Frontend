import { Link } from 'react-router-dom';
import "./navbar.css";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Navbar = () => {
    const [imageUrl, setImageUrl] = useState('');
    const auth = Cookies.get('TOKEN');

    //đăng xuất
    const logout = async () => {
        const token = Cookies.get('TOKEN');
        if (!token) {
            //alert("Không có token")
            console.log("Không có token");
        } else {
            try {
                const res = await axios.get("http://localhost:3001/logout", {
                    withCredentials: true,
                });
                console.log("đăng xuất: ", res.data);
                if (res.data.result === 1) {
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

    //hiện ảnh người dùng
    useEffect(() => {
        const load = async () => {
            const token = Cookies.get('TOKEN');
            if (!token) {
                // alert("Không có token")
                console.log("Không có token");
            } else {
                try {
                    const res = await axios.get("http://localhost:3001/", {
                        withCredentials: true,
                    });
                    setImageUrl(res.data.data.data.Image);
                    //console.log("oke: ", res.data.data.data.Image);
                    
                } catch (error) {
                    console.error("Lỗi đăng xuất: ", error);
                }
            }
        };

        load();
    }, []);

    
    return (
        <>

            <nav className="navbarr">
                <div className="logo"></div>
                <Link to="/">Trang chủ</Link>
                <Link to="/dogs">Danh sách chó</Link>
                <Link to="/checkout">Giỏ hàng</Link>
                <Link to={auth ? "/" : "/login"} >{auth ? <div class="btn-group">
                    <span class="visually-hidde" ><img src={`upload/${imageUrl}`} style={{ width: '30px', height: '30px', borderRadius:'40px'}}/></span>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Hồ sơ của bạn</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li><a class="dropdown-item" onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Đăng xuất</a></li>
                    </ul>
                </div> : 'Đăng nhập'} </Link>
            </nav>
        </>
    );
}
export default Navbar