import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "./button";
import { logout, selectLoggedIn } from "../features/user/userSlice";

import styles from "./styles/header.module.css";
import logo from "../assets/logo.png";

export default function Header() {
	const loggedIn = useSelector(selectLoggedIn);
	const dispatch = useDispatch();
	return (
		<Navbar sticky="top">
			<Navbar.Brand className={styles.headerBrand}>
				<Link to="/">
					<img
						src={logo}
						alt="OnlineShop Logo"
						className={styles.headerLogo}
					/>
				</Link>
			</Navbar.Brand>
			<div className={styles.headerMenu}>
				<Link to="/cart" className={styles.cartButton}>
					<FontAwesomeIcon icon={faShoppingCart} />
				</Link>
				{loggedIn ? (
					<Button value="Logout" className={styles.loginButton} onClick={() => dispatch(logout)}/>
				) : (
					<Link to="/login">
						<Button value="Login" className={styles.loginButton} />
					</Link>
				)}
			</div>
		</Navbar>
	);
}
