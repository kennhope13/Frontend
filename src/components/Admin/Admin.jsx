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
    const toggleVisibility =  () => {
        setIsVisible(!isVisible);
        setEditMode(false);
    };
    // thêm người dùng
    const [formDataUser, setFormDataUser] = useState({
        Name: '',
        Email: '',
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
        if(editMode){
            const res = await axios.post(`http://localhost:3001/update/${formDataUser._id}`, formDataUser);
            console.log(res.data);
            console.log(formDataUser._id);
            if (res.data.result === 1) {
                alert("CẬP NHẬT NGƯỜI DÙNG THÀNH CÔNG.");
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        }else{
            const res = await axios.post('http://localhost:3001/register', formDataUser)
            //console.log(res.data);
            if (res.data.result === 1) {
                alert("THÊM NGƯỜI DÙNG THÀNH CÔNG.");
                window.location.reload();
            } else {
                alert(res.data.message);
                //console.log(res.data.message);
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
        console.log("1",userId);
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

                                </div>
                                <button type="submit" className="btn btn-secondary btn-add">{editMode ? 'CẬP NHẬT' : 'THÊM'}</button>
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
                                        <td><img src={user.Image} alt={user.Name} style={{ width: '50px', height: '50px' }} /></td>
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

// import "./Admin.css";
// import NavbarAdmin from "../../Navbar/NavbarAdmin.jsx";
// import React, { useState } from 'react';
// import axios from "axios";

// const Admin = (props) => {
//     const { allUsers } = props;
//     const [isVisible, setIsVisible] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [formDataUser, setFormDataUser] = useState({
//         Name: '',
//         Email: '',
//         Password: '',
//         Image: ''
//     });

//     const toggleVisibility = () => {
//         setIsVisible(!isVisible);
//         if (!isVisible) {
//             setFormDataUser({ Name: '', Email: '', Password: '', Image: '' });
//             setEditMode(false);
//         }
//     };

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setFormDataUser((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleAddUser = async (e) => {
//         e.preventDefault();
//         if (editMode) {
//             // Update user
//             const res = await axios.put(`http://localhost:3001/update-user/${formDataUser._id}`, formDataUser);
//             if (res.data.result === 1) {
//                 alert("CẬP NHẬT NGƯỜI DÙNG THÀNH CÔNG.");
//                 window.location.reload();
//             } else {
//                 alert(res.data.message);
//             }
//         } else {
//             // Add new user
//             const res = await axios.post('http://localhost:3001/register', formDataUser);
//             if (res.data.result === 1) {
//                 alert("THÊM NGƯỜI DÙNG THÀNH CÔNG.");
//                 window.location.reload();
//             } else {
//                 alert(res.data.message);
//             }
//         }
//     };

//     const handleDeleteClick = async (e) => {
//         e.preventDefault();
//         const isConfirmed = window.confirm("Bạn có chắc muốn xóa người dùng này không?");
//         if (!isConfirmed) return;
        
//         const userId = e.target.closest('tr').getAttribute('data-id');
//         const res = await axios.get(`/delete-user/${userId}`);
//         if (res.data.result === 1) {
//             alert("Xóa thành công.");
//             window.location.reload();
//         } else {
//             alert(res.data.message);
//         }
//     };

//     const handleUpdateClick = async (e) => {
//         e.preventDefault();
//         const userId = e.target.closest('tr').getAttribute('data-id');
//         const res = await axios.get(`/update-user/${userId}`);
//         setFormDataUser(res.data.data);
//         setIsVisible(true);
//         setEditMode(true);
//     };

//     return (
//         <>
//             <NavbarAdmin />
//             <button className="btn-plus" onClick={toggleVisibility}>
//                 <i className="fa fa-plus-square-o" aria-hidden="true"></i>
//             </button>
//             <div className={`container ${isVisible ? 'visible' : 'hidden'}`}>
//                 <div className="row">
//                     <form onSubmit={handleAddUser}>
//                         <div id="content">
//                             <div className="add-dogs">
//                                 <div className="mb-3">
//                                     <label htmlFor="Name" className="form-label">TÊN</label>
//                                     <input
//                                         value={formDataUser.Name}
//                                         onChange={handleInput}
//                                         className="form-control"
//                                         name="Name"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="Email" className="form-label">EMAIL</label>
//                                     <input
//                                         value={formDataUser.Email}
//                                         onChange={handleInput}
//                                         className="form-control"
//                                         name="Email"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="Password" className="form-label">PASSWORD</label>
//                                     <input
//                                         value={formDataUser.Password}
//                                         onChange={handleInput}
//                                         className="form-control"
//                                         name="Password"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">HÌNH ẢNH</label>
//                                     <input
//                                         value={formDataUser.Image}
//                                         onChange={handleInput}
//                                         className="form-control"
//                                         name="Image"
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-secondary btn-add">
//                                     {editMode ? 'CẬP NHẬT' : 'THÊM'}
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <div className="container tb-admin">
//                 <div className="row">
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">EMAIL</th>
//                                 <th scope="col">TÊN</th>
//                                 <th scope="col">HÌNH ẢNH</th>
//                                 <th scope="col">THAO TÁC</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {allUsers.map((user, i) => (
//                                 <tr key={user._id} data-id={user._id}>
//                                     <th scope="row">{i + 1}</th>
//                                     <td>{user.Email}</td>
//                                     <td>{user.Name}</td>
//                                     <td>
//                                         <img src={user.Image} alt={user.Name} style={{ width: '50px', height: '50px' }} />
//                                     </td>
//                                     <td>
//                                         <a href="#" onClick={handleUpdateClick}>
//                                             <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
//                                         </a>
//                                         &nbsp;
//                                         <a href="#" onClick={handleDeleteClick}>
//                                             <i className="fa fa-trash-o" aria-hidden="true"></i>
//                                         </a>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Admin;
