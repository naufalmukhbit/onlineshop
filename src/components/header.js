import { Navbar } from 'react-bootstrap';
import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Navbar>
            <Navbar.Brand>Online Shop</Navbar.Brand>
            <div className={styles.navbarMenus}>
                <Link to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </Link>
                <Link to="/login">
                    <button className={styles.loginButton}>Login</button>
                </Link>
            </div>
        </Navbar>
    )
}