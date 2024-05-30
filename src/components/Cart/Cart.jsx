import { useContext } from "react";
import "./Cart.css"
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const { myCart, total,addToCart,setTotal } = useContext(CartContext);
    const navigate = useNavigate();
    const handleCheckOut = ()=>{
        setTotal(0);
        addToCart([{}]);
    }
    const handleHome =()=>{
        navigate("/");
    }
    return (
        <>
            <section className="cart-container">
                <div className="cart-header">CHECKOUT: </div>
                <div className="cart-items">
                    {myCart.slice(1).map((items) => {
                        return (
                            <div className="cart-item">
                                <img src={items.imageUrl} className="cart-item-img" alt="" />
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