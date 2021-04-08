import { useState } from "react";
import Layout from "../components/layout";
import Button from "../components/button";
import ProductModal from "../components/modal";
import "./styles/Admin.css";
import { selectProducts } from "../features/products/productSlice";
import { useSelector } from "react-redux";
import ProductCard from "../components/productcard";

function Admin() {
	const [showModal, setShowModal] = useState(false);

	const handleModal = () => {
		setShowModal(!showModal);
	};

	const products = useSelector(selectProducts);
	const prodList = products.map((item) => (
		<ProductCard action="admin" product={item} key={item.id} list />
	));
	return (
		<Layout>
			<h3>Products</h3>
			<Button
				value="Add new product"
				onClick={handleModal}
				className="add-new-button"
			/>
			{prodList}
			<ProductModal show={showModal} toggle={handleModal} />
		</Layout>
	);
}

export default Admin;
