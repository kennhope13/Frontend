import "./signin.css";
import axios from "axios";
import {  useState } from 'react';
import { useNavigate } from "react-router-dom";
const Signin = () => {

    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
    })

    const handleInput = async (event) => {
        const { name, value } = event.target;
        // const { name, value } = e.target;
        // await setFormData({ ...formData, [event.target.name]: event.target.value })
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        //console.log(formData);
    }

    const navigate = useNavigate();
    const handleSignin = async (e) => {
        e.preventDefault();
        console.log("e", e);
        const response = await axios.post('http://localhost:3001/register', formData);
         console.log("data: ", formData);
         console.log(response.data);
        if(response.data.result===1){
            alert("Đăng ký tài khoản thành công.");
            navigate("/login");
        }else{
            alert("Đăng ký tài khoản không thành công.");
        }
        

    }

    // $("#btn-signinn").on('click',()=>{
    //     const email = $("#email-user").val();
    //     const name = $("#name-user").val();
    //     const password = $("#password-user").val();
    //     const dataUser = {Email:email,Name:name,Password:password};
    //     console.log(dataUser);
    // })
    return (
        <>
            <section className="user-signin">
                <div><h4>SIGN IN</h4></div>
                <form onSubmit={handleSignin}>
                    <div>
                        <h3>Email:  </h3>
                        <input value={formData.Email} type="text" id="email-user" name="Email" onChange={handleInput} />
                    </div>
                    {/* <div>
                        <h3>Name: </h3>
                        <input type="text" id="name-user" name="Name"  onChange={handleInput} value={name}/>
                    </div> */}
                    <div>
                        <h3>Password: </h3>
                        <input value={formData.Password} type="password" id="password-user" name="Password" onChange={handleInput} />
                    </div>
                    <button className="btn-sigin" id="btn-signinn" type="submit">Sign in</button>
                </form>


            </section>

        </>

    )

}

export default Signin