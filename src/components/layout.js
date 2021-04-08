import { Container } from "react-bootstrap";
import styles from "./styles/layout.module.css";
import Header from "./header";
export default function Layout({ children }) {
	return (
		<>
			<Header />
			<Container className={styles.container}>{children}</Container>
			<footer className={styles.footer}>OnlineShop &copy; 2021</footer>
		</>
	);
}
