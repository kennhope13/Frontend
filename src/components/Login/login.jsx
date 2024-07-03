import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../public/lib.js';
import { setCookie } from "../../public/lib.js";
import checkAdmin from "../Admin/CheckAdmin.jsx"

const Login = () => {
    checkAdmin();
    const navigate = useNavigate();
    const handleSignin = () => {
        navigate("/signin");
    }

    const [formDataLogin, setFormDataLogin] = useState({
        Email: '',
        Password: ''
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormDataLogin((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        console.log();
    }

    const handleLogin = async (e) => {

        try {
            const response = await axios.post("http://localhost:3001/login", formDataLogin);
            //console.log("dataLogin: ", response.data);
            if (response.data.result === 1 && response.data.data && response.data.data.Token) {
                setCookie("TOKEN", response.data.data.Token);
                setCookie("USERID", response.data.data.UserID);
                alert("Đăng nhập tài khoản thành công.");

                window.location.reload();
                //navigate("/");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            alert("Đăng nhập thất bại. Vui lòng thử lại.");
        }
    }
    return (
        <>
            <section className="user-login">
                <div><h4>ĐĂNG NHẬP</h4></div>
                <div>
                    <h3>Email: </h3>
                    <input type="text" id="email-user" name="Email" value={formDataLogin.Email} onChange={handleInput} />
                </div>
                <div>
                    <h3>Password: </h3>
                    <input type="password" id="password-user" name="Password" value={formDataLogin.Password} onChange={handleInput} />
                </div>
                <button className="btn-sigin" onClick={handleSignin}>Đăng ký</button>
                <button className="btn-login" onClick={handleLogin} >Đăng nhập</button>

            </section>
        </>
    )
}
export default Login