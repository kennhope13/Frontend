import { Link } from 'react-router-dom';
import "./navbar.css";
const NavbarAdmin = ()=>{
    return(
        <>
        
        <nav className="navbarr">
            
            <Link to="/admin">User</Link>
            <Link to="/admin-dogs">Dogs</Link>
        </nav>
        </>
    )
}
export default NavbarAdmin