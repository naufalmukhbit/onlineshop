import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import {
	removeItem,
	increaseQuantity,
	decreaseQuantity,
	selectItemQuantity,
} from "../features/cart/cartSlice";
import {
	editProducts,
	removeProducts,
	selectProductDetail,
} from "../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles/cardbutton.module.css";
import Button from "./button";
import ProductModal from "./modal";

function QuantityButtons({ id }) {
	const quantity = useSelector(selectItemQuantity);
	const dispatch = useDispatch();
	return (
		<InputGroup className={styles.quantityButtonContainer}>
			<InputGroup.Prepend>
				<Button
					value="-"
					className={styles.quantityButtons}
					onClick={() =>
						quantity[id] === 1
							? dispatch(removeItem(id))
							: dispatch(decreaseQuantity(id))
					}
				/>
			</InputGroup.Prepend>
			<FormControl
				value={quantity[id]}
				className={styles.quantity}
				disabled
			/>
			<InputGroup.Append>
				<Button
					value="+"
					className={styles.quantityButtons}
					onClick={() => dispatch(increaseQuantity(id))}
				/>
			</InputGroup.Append>
		</InputGroup>
	);
}

export default function CardButton({ action, inCart, id, addToCart, list }) {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	// const product = useSelector(selectProductDetail(id));

	// const handleToggle = () => {
	// 	setShow(!show)
	// }

	const normalButton = inCart(id) ? (
		<QuantityButtons id={id} />
	) : (
		<Button
			value="Add to Cart"
			className={styles.cartButton}
			onClick={addToCart}
		/>
	);
	const editButton = (
		<Button
			value={<FontAwesomeIcon icon={faEdit} />}
			className={styles.quantityButtons}
			onClick={() => dispatch(editProducts(id))}
		/>
	);
	const removeButton = (
		<Button
			value={<FontAwesomeIcon icon={faTrash} />}
			className={styles.quantityButtons}
			onClick={
				action === "admin"
					? () => dispatch(removeProducts(id))
					: () => dispatch(removeItem(id))
			}
		/>
	);
	return (
		<div className={`${styles.actions} ${list ? styles.list : ""}`}>
			{action !== "admin" ? normalButton : ""}
			{action === "admin" ? editButton : ""}
			{action !== "normal" ? removeButton : ""}
			{/* <ProductModal show={show} toggle={handleToggle} product={product}/> */}
		</div>
	);
}
