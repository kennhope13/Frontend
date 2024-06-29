import { Link } from 'react-router-dom';
import "./navbar.css";
const NavbarAdmin = ()=>{
    return(
        <>
        <nav className="navbarr">
            
            <Link to="/admin"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;Người dùng</Link>
            <Link to="/admin-dogs"><i class="fa fa-paw" aria-hidden="true"></i>&nbsp;Chó</Link>
        </nav>
        </>
    )
}
export default NavbarAdmin