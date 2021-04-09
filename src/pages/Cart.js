import Layout from "../components/layout";
import { Row, Col } from "react-bootstrap";
import {
	selectCartContents,
	selectTotalQuantity,
	selectTotalPrice,
} from "../features/cart/cartSlice";
import { useSelector } from "react-redux";

import ProductCard from "../components/productcard";
import "./styles/Cart.css";

function CartSummary({ product, quantity }) {
	return (
		<tr key={product.id}>
			<td className="product-name" key={`name${product.id}`}>
				{product.name}
			</td>
			<td className="quantity-column" key={`qty${product.id}`}>
				{quantity}
			</td>
		</tr>
	);
}

function Cart() {
	const contents = useSelector(selectCartContents);
	const totalQuantity = useSelector(selectTotalQuantity);
	const totalPrice = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(useSelector(selectTotalPrice));

	const prodList = contents.map((item) => (
		<ProductCard
			action="cart"
			product={item.product}
			key={item.product.id}
			list
		/>
	));
	const prodSummary = contents.map((item) => (
		<CartSummary product={item.product} quantity={item.quantity} />
	));

	return (
		<Layout>
			<Row>
				<Col sm={8}>
					<h3>Cart</h3>
					{prodList.length > 0 ? prodList : "Cart is empty!"}
				</Col>
				<Col sm={4} className="total-pane">
					<div className="total-container">
						<div className="summary-container">
							<table className="summary">
								<thead>
									<tr>
										<th>Items</th>
										<th className="quantity-column">
											Quantity
										</th>
									</tr>
								</thead>
								<tbody>{prodSummary}</tbody>
							</table>
						</div>

						<table className="total">
							<tbody>
								<tr className="total-items" key="tq-row">
									<td key="tq-title">Total items</td>
									<td
										className="quantity-column"
										key="tq-content"
									>
										{totalQuantity}
									</td>
								</tr>
								<tr key="tp-row">
									<td key="tp-title">Total</td>
									<td
										className="quantity-column total-price"
										key="tp-content"
									>
										{totalPrice}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Col>
			</Row>
		</Layout>
	);
}

export default Cart;
