import "./Admin.css";
import NavbarAdmin from "../../Navbar/NavbarAdmin.jsx";
import React, { useEffect, useState } from 'react';
import checkAdmin from "../Admin/CheckAdmin.jsx"
import axios from "axios";
const Admin = (props) => {
    checkAdmin();
    const { allUsers } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const toggleVisibility =  () => {
        setIsVisible(!isVisible);
        setEditMode(false);
        setProfileImg(""); // Reset profile image
    };
    const handleChange = (e)=>{
        handleInput(e);
        onFileChange(e);
    }
    //UPLOAD FILE
    const onFileChange = (e)=>{
        setProfileImg(e.target.files[0]);
    }
    const onUpload = (e)=>{
         e.preventDefault();
        const formDataUpLoad = new FormData();
        formDataUpLoad.append('avatar',profileImg);
        //console.log("ádfasdf",formDataUpLoad);
        axios
            .post("http://localhost:3001/xuly",formDataUpLoad,{})
            .then((res)=>{
                console.log(res);
                setProfileImg(res.data.filename); // Đường dẫn URL của file đã upload
                setIsFileUploaded(true);
            })
    }
    
    // thêm người dùng
    const [formDataUser, setFormDataUser] = useState({
        Name: '',
        Email: '',
        Image:'',
        Password: ''
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormDataUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    
    // THÊM NGƯỜI DÙNG
    const handleAddUser = async (e) => {
        e.preventDefault();
        const userData = {
            ...formDataUser,
            Image: profileImg // Sử dụng URL đã upload
        };
        console.log("useradata",userData);
        if(editMode){
            const res = await axios.post(`http://localhost:3001/update/${userData._id}`, userData);
            console.log(res.data);
            console.log(userData._id);
            if (res.data.result === 1) {
                alert("CẬP NHẬT NGƯỜI DÙNG THÀNH CÔNG.");
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        }else{
            const res = await axios.post('http://localhost:3001/register', userData)
            console.log(res.data.data.Image);
            try{
                if (res.data.result === 1) {
                    alert("THÊM NGƯỜI DÙNG THÀNH CÔNG.");
                    window.location.reload();
                } else {
                    alert(res.data.message);
                    //console.log(res.data.message);
                }
            }catch(err){
                alert(res.data.message);
            }
        }
    

    }
    // XÓA NGƯỜI DÙNG
    const handleDeleteCLick = async(e)=>{
        e.preventDefault();
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa người dùng này không?");
        if (!isConfirmed) {
            return;
        }
        const userId = e.target.closest('tr').getAttribute('data-id');
        const res = await axios.get(`/delete-user/${userId}`)
        console.log(res.data);
        if(res.data.result===1){
            alert("Xóa thành công.");
            window.location.reload();
        }else{
            alert(res.data.message);
        }
    }
    // SỬA NGƯỜI DÙNG
    const handleUpdateClick = async (e)=>{
        e.preventDefault();
        const userId = e.target.closest('tr').getAttribute('data-id');
        const res = await axios.get(`/update-user/${userId}`)
        //console.log("1",userId);
        console.log(res.data);
        setFormDataUser(res.data.data);
        setIsVisible(!isVisible);
        setEditMode(true);
    }

    
    return (
        <>
            <NavbarAdmin></NavbarAdmin>
            <button className="btn-plus"><i class="fa fa-plus-square-o" aria-hidden="true" onClick={toggleVisibility}></i>
            </button>
            <div className={`container ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="row">
                    <form onSubmit={handleAddUser}>
                        <div id="content">
                            <div className="add-dogs">
                                <div className="mb-3">
                                    <label htmlFor="Name" className="form-label">TÊN</label>
                                    <input value={formDataUser.Name} onChange={handleInput} className="form-control" name="Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Email" className="form-label">EMAIL</label>
                                    <input value={formDataUser.Email} onChange={handleInput} className="form-control" name="Email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Password" className="form-label">PASSWORD</label>
                                    <input value={formDataUser.Password} onChange={handleInput} className="form-control" name="Password" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">HÌNH ẢNH</label>
                                    
                                <div className="mb-3">
                                    <input type="file" className="form-control" onChange={handleChange}  name="Image"/>
                                </div>
                                <div>
                                <button className="btn btn-success" type="button " onClick={onUpload}>
                                    Upload
                                </button>
                                </div>
                           
                                </div>
                                <div>
                                <button type="submit" className="btn btn-secondary btn-add">{editMode ? 'CẬP NHẬT' : 'THÊM'}</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </form>
                </div>
            </div>
            <div className="container tb-admin">
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">TÊN</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">THAO TÁC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user, i) => {
                                return (
                                    <tr key={user._id} data-id={user._id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{user.Email}</td>
                                        <td>{user.Name}</td>
                                        <td><img src={`upload/${user.Image}`} alt={user.Name} style={{ width: '50px', height: '50px' }} /></td>
                                        <td><a href=""><i class="fa fa-pencil-square-o" aria-hidden="true" onClick={handleUpdateClick}></i></a>
                                            &nbsp; <a href=""><i class="fa fa-trash-o" aria-hidden="true" onClick={handleDeleteCLick}></i></a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
export default Admin


