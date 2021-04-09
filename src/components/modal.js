import { Modal, Form } from "react-bootstrap";
import Button from "./button";
import { useSelector, useDispatch } from "react-redux";
import {
	addProducts,
	editProducts,
	setName,
	setCategory,
	setPrice,
	resetForm,
	selectProductForm,
} from "../features/products/productSlice";

function ProductForm({ product }) {
	const dispatch = useDispatch();

	if (!product) {
		product = { name: "", category: "default", price: "" };
	}

	const handleNameChange = (event) => {
		dispatch(setName(event.target.value));
	};

	const handleCategoryChange = (event) => {
		dispatch(setCategory(event.target.value));
	};

	const handlePriceChange = (event) => {
		dispatch(setPrice(parseInt(event.target.value)));
	};

	return (
		<Form>
			<Form.Group controlId="productName">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					defaultValue={product.name}
					onChange={handleNameChange}
				/>
			</Form.Group>
			<Form.Group controlId="productCategory">
				<Form.Label>Category</Form.Label>
				<Form.Control
					as="select"
					defaultValue={product.category}
					onChange={handleCategoryChange}
				>
					<option value="default" disabled>
						--- Select Category ---
					</option>
					<option value="electronic">Electronic</option>
					<option value="fashion">Fashion</option>
					<option value="food">Food</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="productPrice">
				<Form.Label>Price</Form.Label>
				<Form.Control
					type="text"
					defaultValue={product.price}
					onChange={handlePriceChange}
				/>
			</Form.Group>
		</Form>
	);
}

export default function ProductModal({ product, show, toggle, edit }) {
	const dispatch = useDispatch();
	const productForm = useSelector(selectProductForm);
	const handleAdd = () => {
		dispatch(addProducts(productForm));
		dispatch(resetForm());
		toggle();
	};
	const handleEdit = () => {
		dispatch(
			editProducts({
				id: product.id,
				name: productForm.name === "" ? product.name : productForm.name,
				category:
					productForm.category === ""
						? product.category
						: productForm.category,
				price:
					productForm.price === ""
						? product.price
						: productForm.price,
			})
		);
		dispatch(resetForm());
		toggle();
	};
	return (
		<Modal show={show} onHide={toggle}>
			<Modal.Header closeButton>
				{edit ? (
					<Modal.Title>Edit Product Detail</Modal.Title>
				) : (
					<Modal.Title>Add New Product</Modal.Title>
				)}
			</Modal.Header>
			<Modal.Body>
				<ProductForm product={product} />
			</Modal.Body>
			<Modal.Footer>
				<Button value="Cancel" onClick={toggle} />
				<Button
					value={edit ? "Save" : "Add"}
					onClick={edit ? handleEdit : handleAdd}
				/>
			</Modal.Footer>
		</Modal>
	);
}
