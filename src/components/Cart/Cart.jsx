import { useEffect, useState } from "react";
import "./Cart.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { TextField } from '@mui/material';
const Cart = () => {
    let tongTien = 0;
    const [allDogsCart, setAllDogsCart] = useState([]);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    allDogsCart.forEach((items) => {
        tongTien = tongTien + items.price
    })
    const handleCheckOut = async () => {
        const token = Cookies.get('TOKEN');
        if (!token) {
            navigate("/login");
        } else {
            const newItemsDetailCart = {
                dog_items: allDogsCart,
                Address: address,
                TotalPrice: tongTien,
                userId: Cookies.get('USERID'),
                RegisterDate: Date.now()
            }
            const res = await axios.post(`/detail`, newItemsDetailCart)
            if (res.data.result === 1) {
                const res1 = await axios.get(`/checkout`);
                //console.log(res.data);
                if (res.data.data === null) {
                    alert("Bạn vẫn chưa chọn sản phẩm nào để mua.");
                } else {
                    alert("Mua thành công.");
                    window.location.reload();
                }
                return res1;
            } else {
                alert(res.data.message);
            }
            //console.log("Data: ", res.data.data);
        }
    }
    const handleHome = () => {
        navigate("/");
    }

    useEffect(() => {
        async function getDataDog() {
            const res = await axios.get(`/cart`);
            return res;
        }
        if (Cookies.get('USERID')) {
            getDataDog()
                .then((res) => {
                    //  console.log(res.data.data);
                    if ((res.data.data)) {
                        setAllDogsCart(res.data.data.dogItems);
                    }
                })
                .catch((err) => console.log("Err", err));
        } else {
            //console.log("KHÔNG CÓ ID");
            navigate("/login");
        }

    }, [])

    return (
        <>
            <section className="cart-container">
                <div className="cart-header">GIỎ HÀNG: </div>
                <div className="cart-items">
                    {allDogsCart.map((items) => {
                        return (
                            <div className="cart-item" data-id={items.id}>
                                <img src={`upload/${items.imageUrl}`} className="cart-item-img" alt="" />
                                {items.name} {items.price}$
                            </div>
                        )
                    })}
                    <TextField
                        fullWidth
                        label="Địa chỉ nhận hàng"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ mb: 6 }}

                    />
                    <div className="cart-total">
                        Tổng thanh toán: {tongTien}$
                    </div>
                </div>
                <button className="cart-checkout" onClick={handleCheckOut}>Mua ngay</button>
                <button className="cart-gohome" onClick={handleHome}>RETURN HOME</button>
            </section>
        </>
    );
}
export default Cart