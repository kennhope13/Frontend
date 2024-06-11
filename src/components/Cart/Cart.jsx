import { useContext, useEffect, useState } from "react";
import "./Cart.css"
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
        async function getDataDog(e) {
           // const userId = e.target.closest('tr').getAttribute('data-id');
            const res = await axios.get(`./cart`);
            console.log("dogs: ", res.data);
            return res;
        }
        getDataDog().then((res) => setAllDogsCart(res.data.data));
        getDataDog().catch((err) => console.log("Err", err));
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