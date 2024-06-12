import { useContext, useState } from "react";
import "./Dogs.css";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import Cookies from 'js-cookie';
const DogCart = (props) => {
    const { name, breed, decription, price, imageUrl } = props;
    const { addToCart, setTotal } = useContext(CartContext);
    const [isAdded, setAdded] = useState(false);
    const handleClick = async () => {

        setAdded(true);
        const newItems = {
            dog_items: {
                name: name,
                price: price,
                imageUrl: imageUrl
            },
            userId: Cookies.get('USERID'),
            // imageUrl: imageUrl,
        }
        addToCart((item) => [...item, newItems]);
        setTotal((total) => (total += Number(price)));
        const res = await axios.post('http://localhost:3001/dogs-cart', newItems);
        
        console.log("Data dog: ", res);
    }
    return (
        <>
            <section className="dogs">
                <div className="dogs-info">
                    <p>{name}</p>
                    <p>{breed}</p>
                </div>
                <div className="dogs-img-container">
                    <img className="dog-img" src={`upload/${imageUrl}`} alt="error" />
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