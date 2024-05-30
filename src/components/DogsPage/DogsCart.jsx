import { useContext, useState } from "react";
import "./Dogs.css";
import { CartContext } from "../../Context/CartContext";
const DogCart = (props) => {
    const {  name, breed, decription, price, imageUrl } = props;
    const { addToCart, setTotal } = useContext(CartContext);
    const [isAdded, setAdded] = useState(false);
    const handleClick = () => {
        setAdded(true);
        const newItems = {
            name: name,
            price: price,
            imageUrl: imageUrl,
        }
        addToCart((item) => [...item, newItems]);
        setTotal((total) => (total += Number(price)))
    }
    return (
        <>
            <section className="dogs">
                <div className="dogs-info">
                    <p>{name}</p>
                    <p>{breed}</p>
                </div>
                <div className="dogs-img-container">
                    <img className="dog-img" src={imageUrl} alt="error" />
                </div>
                <div className="dogs-desc">{decription}</div>
                <div className="dogs-price">{price}$</div>
                {isAdded ? (
                    <button disabled className="dogs-btn-disabled" onClick={handleClick}>ADDED</button>
                ) : (
                    <button className="dogs-btn" onClick={handleClick}>ADD TO CART</button>
                )}

            </section>
        </>
    );
}
export default DogCart