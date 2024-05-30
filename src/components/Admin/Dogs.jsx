import NavbarAdmin from "../../Navbar/NavbarAdmin.jsx";
import "../../font-awesome-4.7.0 (1)/font-awesome-4.7.0/css/font-awesome.min.css";
import "./Admin.css";
import React, { useState } from 'react';
import axios from "axios";
const Listdogs = (props) => {
    const { alldogss } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const toggleVisibility = async () => {
        setIsVisible(!isVisible);
        setEditMode(false);
    };
    //thêm chó
    const [formDataDog, setFormDataDog] = useState({
        name: '',
        breed: '',
        decription: '',
        price: '',
    })
    const handleInput = async (event) => {
        const { name, value } = event.target;
        setFormDataDog((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        //console.log(event);

    }
    const handleAddDog = async (e) => {
        e.preventDefault();
        if (editMode) {
            const res = await axios.post(`http://localhost:3001/updateDogs/${formDataDog._id}`, formDataDog)
            console.log("id-dogs: ",formDataDog._id);
            if (res.data.result === 1) {
                alert("CẬP NHẬT THÀNH CÔNG.");
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        } else {
            const res = await axios.post('http://localhost:3001/registerDog', formDataDog)
            // console.log("data: ", formDataDog);
            console.log(res.data);
            if (res.data.result === 1) {
                alert("Thêm thành công.");
                window.location.reload();
            } else {
                alert("Thêm thất bại.");
            }
        }
    }
    //xóa chó
    const handleDeleteCLick = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa người dùng này không?");
        if (!isConfirmed) {
            return;
        }
        const dogsId = e.target.closest('tr').getAttribute('id');
        const res = await axios.get(`/delete-dog/${dogsId}`)
        console.log(res.data);
        if (res.data.result === 1) {
            alert("Xóa thành công.");
            window.location.reload();
        } else {
            alert(res.data.message);
        }
    }
    const handleUpdateClick = async (e) => {
        e.preventDefault();
        const dogsId = e.target.closest("tr").getAttribute('id');
        const res = await axios.get(`/update-dog/${dogsId}`)
        console.log(res.data);
        setIsVisible(!isVisible);
        setFormDataDog(res.data.data);
        setEditMode(true);
    }
    return (
        <>
            <NavbarAdmin></NavbarAdmin>
            <button className="btn-plus"><i class="fa fa-plus-square-o" aria-hidden="true" onClick={toggleVisibility}></i>
            </button>
            <div className={`container ${isVisible ? 'visible' : 'hidden'}`}>
                <div className="row">
                    <form onSubmit={handleAddDog}>
                        <div id="content">
                            <div className="add-dogs">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">TÊN</label>
                                    <input value={formDataDog.name} onChange={handleInput} className="form-control" name="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="breed" className="form-label">GIỐNG</label>
                                    <input value={formDataDog.breed} onChange={handleInput} className="form-control" name="breed" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">MÔ TẢ</label>
                                    <input value={formDataDog.decription} onChange={handleInput} className="form-control" name="decription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">GIÁ</label>
                                    <input value={formDataDog.price} onChange={handleInput} className="form-control" name="price" />
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

            <div className="container tb-admin ">
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TÊN</th>
                                <th scope="col">GIỐNG</th>
                                <th scope="col">MÔ TẢ</th>
                                <th scope="col">GIÁ</th>
                                <th scope="col">ẢNH</th>
                                <th scope="col">THAO TÁC</th>

                            </tr>
                        </thead>
                        <tbody>
                            {alldogss.map((dog, i) => {
                                return (
                                    <tr key={dog._id} id={dog._id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{dog.name}</td>
                                        <td>{dog.breed}</td>
                                        <td>{dog.decription}</td>
                                        <td>{dog.price}</td>
                                        <td><img src={dog.Image} alt={dog.Name} style={{ width: '50px', height: '50px' }} /></td>
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
export default Listdogs