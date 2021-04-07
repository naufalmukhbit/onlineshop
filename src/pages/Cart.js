import Header from '../components/header'
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    selectCartContents,
    selectTotalQuantity
} from '../features/cart/cartSlice'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductCard from '../components/productcard'
import './styles/Cart.css';

function Cart() {
    const contents = useSelector(selectCartContents);
    const totalQuantity = useSelector(selectTotalQuantity);
    console.log(totalQuantity);
    // const dispatch = useDispatch();

    const prodList = contents.map(item => (
        <ProductCard product={item.product} type="list" key={item.product.id}/>
    ))
    return (
        <Container>
            <Header />
            <Link to="/home">
                Back to home
            </Link>
            <h3>Cart</h3>
            <Row>
                <Col sm={8}>
                    {prodList}
                </Col>
                <Col sm={4} className="total-pane">
                    Total items = {totalQuantity}
                </Col>
            </Row>
        </Container>
    )
}

export default Cart