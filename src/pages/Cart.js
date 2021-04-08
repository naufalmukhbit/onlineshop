import Layout from '../components/layout'
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    selectCartContents,
    selectTotalQuantity,
    selectTotalPrice
} from '../features/cart/cartSlice'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductCard from '../components/productcard'
import './styles/Cart.css';

function CartSummary({product, quantity}) {
    return (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{quantity}</td>
        </tr>
    )
}

function Cart() {
    const contents = useSelector(selectCartContents);
    const totalQuantity = useSelector(selectTotalQuantity);
    const totalPrice = useSelector(selectTotalPrice);

    const prodList = contents.map(item => (
        <ProductCard action="cart" product={item.product} key={item.product.id} list/>
    ))
    const prodSummary = contents.map(item => (
        <CartSummary product={item.product} quantity={item.quantity} />
    ))

    return (
        <Layout>
            <Link to="/home">
                Back to home
            </Link>
            <h3>Cart</h3>
            <Row>
                <Col sm={8}>
                    {prodList}
                </Col>
                <Col sm={4} className="total-pane">
                    <table className="summary">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prodSummary}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total items</th>
                                <th>{totalQuantity}</th>
                            </tr>
                        </tfoot>
                    </table>
                </Col>
            </Row>
        </Layout>
    )
}

export default Cart