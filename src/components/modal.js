import { useState } from 'react';
import { Modal, Form } from "react-bootstrap";
import Button from './button'

function ProductForm({ product={name:'', category:'', price:0} }) {
	const [name, setName] = useState(product.name);
	const [category, setCategory] = useState(product.category);
	const [price, setPrice] = useState(product.price);

	const handleNameChange = (event) => {
		setName(event.target.value);
	} 

	const handleCategoryChange = (event) => {
		setCategory(event.target.value)
	}

	const handlePriceChange = (event) => {
		setPrice(event.target.value.parseInt())
	}

	return (
		<Form>
			<Form.Group controlId="productName">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={product.name} onChange={handleNameChange}/>
			</Form.Group>
			<Form.Group controlId="productCategory">
				<Form.Label>Category</Form.Label>
				<Form.Control as="select" onChange={handleCategoryChange}>
					<option disabled selected>--- Select Category ---</option>
					<option value="electronic">Electronic</option>
					<option value="fashion">Fashion</option>
					<option value="food">Food</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="productPrice">
				<Form.Label>Price</Form.Label>
				<Form.Control type="text" value={product.price} onChange={handlePriceChange} />
			</Form.Group>
		</Form>
	);
}

export default function ProductModal({ product=null, edit, show, toggle }) {
	const handleAdd = () => {
		
	}
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
				<Button value="Cancel" onClick={toggle}/>
                <Button value={edit ? "Save" : "Add"} onClick={toggle}/>
			</Modal.Footer>
		</Modal>
	);
}
