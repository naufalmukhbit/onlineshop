import { Modal, Form } from "react-bootstrap";
import Button from './button'

function ProductForm({ product }) {
    if (product === null) {
        product = {id:"", name:'', category:'',price:''}
    }
	return (
		<Form>
			<Form.Group controlId="productId">
				<Form.Label>ID</Form.Label>
				<Form.Control type="text" value={product.id} readOnly />
			</Form.Group>
			<Form.Group controlId="productName">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={product.name} />
			</Form.Group>
			<Form.Group controlId="productCategory">
				<Form.Label>Category</Form.Label>
				<Form.Control as="select">
					<option disabled>--- Select Category ---</option>
					<option>Electronic</option>
					<option>Fashion</option>
					<option>Food</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="productPrice">
				<Form.Label>Price</Form.Label>
				<Form.Control type="text" value={product.price} />
			</Form.Group>
		</Form>
	);
}

export default function ProductModal({ product=null, edit, show, toggle }) {
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
