import { Link } from 'react-router-dom';
import "./navbar.css";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
const Navbar = () => {
    const [imageUrl, setImageUrl] = useState('');
    const auth = Cookies.get('TOKEN');
    const navigate = useNavigate();

    //đăng xuất
    const logout = async () => {
        const token = Cookies.get('TOKEN');
        if (!token) {
            //alert("Không có token")
            //console.log("Không có token");
            navigate("/login");
        } else {
            try {
                const res = await axios.get("http://localhost:3001/logout", {
                    withCredentials: true,
                });
                //console.log("đăng xuất: ", res.data);
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
                //console.log("Không có token");
                //navigate("/login");
            } else {
                try {
                    const res = await axios.get("http://localhost:3001/", {
                        withCredentials: true,
                    });
                    setImageUrl(res.data.data.data.Image);
                    //console.log("oke: ", res.data.data.data.Image);

                } catch (error) {
                    console.error("Lỗi Token: ", error);
                }
            }
        };

        load();
    }, []);

    //search

    const [searchString1, setsearchString] = useState({ name: '' });
    const [itemsSearch, setitemsSearch] = useState([]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setsearchString((p) => ({
            ...p,
            [name]: value
        }))
    }
    // const Search  = async (e)=>{
    //     console.log("name:",searchString1);
    //     const res =  await axios.post(`./search`,searchString1)
    //     console.log(res.data);
    // }
    const callSearch = useCallback(
        debounce(
            async (searchData) => {
                const res = await axios.post(`./search`, searchData)

                if (res.data.data === null) {
                    console.log("Không có dữ liệu.");
                } else {
                    console.log(res.data.data);
                    setitemsSearch(res.data.data);
                }
            }
        ), []
    )
    useEffect(() => {
        if (searchString1.name) {
            callSearch(searchString1);
        }
    }, [searchString1, callSearch])


    return (
        <>
            <nav className="navbarr">
                <div className='logo1'><Link to='/'><div className="logo"></div></Link></div>
                <div><nav >
                    <div class="container-fluid">
                        <form class="d-flex">
                            <input name='name' class="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" onChange={handleInput} value={searchString1.searchString} />
                            <i class="fa fa-search btn btn-outline-success" aria-hidden="true" ></i>
                        </form>
                    </div>
                    {itemsSearch.map((items) => {
                        return (
                            <div className="cart-item cart-item-searchItems" key={items.id} data-id={items.id}>
                                <img src={`upload/${items.imageUrl}`} className="cart-item-img" alt="" />
                                <div>{items.name} {items.price}$</div>
                            </div>
                        )
                    })}
                </nav></div>
                <Link to="/">Trang chủ</Link>
                <Link to="/dogs">Danh sách chó</Link>
                <Link to="/checkout">Giỏ hàng</Link>
                <Link to={auth ? "/admin" : "/login"} >{auth ? <div class="btn-group">
                    <span class="visually-hidde" ><img src={`upload/${imageUrl}`} style={{ width: '30px', height: '30px', borderRadius: '40px' }} /></span>
                    <ul class="dropdown-menu">
                        <li><i class="fa fa-user" aria-hidden="true"></i> <Link to="/profile">&nbsp;Thông tin cá nhân</Link></li>
                        <li><i class="fa fa-key" aria-hidden="true"></i><Link to="">&nbsp;Đổi mật Khẩu</Link></li>
                        <li><i class="fa fa-caret-square-o-right" aria-hidden="true"></i><Link to="/detail-cart">&nbsp;Đơn hàng</Link></li>
                        <li><hr class="dropdown-divider"></hr></li>
                        <li onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Đăng xuất</li>
                    </ul>
                </div> : 'Đăng nhập'} </Link>

            </nav>
        </>
    );
}
export default Navbar