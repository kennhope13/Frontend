import { useContext, useEffect, useState } from "react";
import "./Cart.css"
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
const Cart = () => {
    const { myCart, total, addToCart, setTotal } = useContext(CartContext);
    const [allDogsCart, setAllDogsCart] = useState([]);
    const navigate = useNavigate();
    const handleCheckOut = () => {
        setTotal(0);
        addToCart([{}]);
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
                     console.log(res.data.data);
                    if ((res.data.data)) {
                        setAllDogsCart(res.data.data.dogItems);
                    }
                })
                .catch((err) => console.log("Err", err));
        } else {
            console.log("KHÔNG CÓ ID");
        }
    }, [])
    return (
        <>
            <section className="cart-container">
                <div className="cart-header">CHECKOUT: </div>
                <div className="cart-items">
                    {allDogsCart.map((items) => {
                        return (
                            <div className="cart-item" data-id={items.id}>
                                <img src={`upload/${items.imageUrl}`} className="cart-item-img" alt="" />
                                {items.name} {items.price}$
                            </div>
                        )
                    })}
                    <div className="cart-total">TOTAL: {total}$</div>
                </div>
                <button className="cart-checkout" onClick={handleCheckOut}>DONE</button>
                <button className="cart-gohome" onClick={handleHome}>RETURN HOME</button>
            </section>
        </>
    );
}
export default Cart