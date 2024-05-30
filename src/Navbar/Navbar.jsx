import { Link } from 'react-router-dom';
import "./navbar.css";
const Navbar = () => {
    return (
        <>

            <nav className="navbarr">
                <div className="logo"></div>
                <Link to="/">Home</Link>
                <Link to="/dogs">Dogs</Link>
                <Link to="/checkout">Cart</Link>
                <Link to="/login">Login</Link>
            </nav>
        </>
    );
}
export default Navbar