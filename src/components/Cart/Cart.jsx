import { useEffect, useState } from "react";
import "./Cart.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
const Cart = () => {
    let tongTien = 0;
    const [allDogsCart, setAllDogsCart] = useState([]);
    const navigate = useNavigate();
    const handleCheckOut = async () => {
        const token = Cookies.get('TOKEN');
        if (!token) {
            navigate("/login");
        } else {
            const res = await axios.get(`/checkout`);
            console.log(res.data);
            if(res.data.data===null){
                alert("Bạn vẫn chưa chọn sản phẩm nào để mua.");
            }else{
                window.location.reload();
            }
            return res;
        }
    }
    const handleHome = () => {
        navigate("/");
    }
    allDogsCart.forEach((items) => {
        tongTien = tongTien + items.price
    })
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