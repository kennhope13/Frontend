import { useState } from "react";
import "./Dogs.css";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
const DogCart = (props) => {
    const { name, breed, decription, price, imageUrl } = props;
    const [isAdded, setAdded] = useState(false);
    const navigate = useNavigate();
    const handleClick = async () => {
        const token = Cookies.get("TOKEN");
        if (!token) {
            navigate("/login");
        } else {
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

            const res = await axios.post('http://localhost:3001/dogs-cart', newItems);
        }


        // console.log("Data dog: ", res);
    }
    return (
        <>
            <section className="dogs">
                <div className="dogs-info">
                    <p><b>Tên: {name}</b></p>
                    <p><b>Giống: {breed}</b></p>
                </div>
                <div className="dogs-img-container">
                    <img className="dog-img" src={`upload/${imageUrl}`} alt="error" />
                </div>
                <div className="dogs-desc">Mô tả: {decription}</div>
                <div className="dogs-price">Giá: {price}$</div>
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