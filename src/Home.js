import React, { useState } from 'react';
import {
    Navbar,
    Container,
    Row,
    Col,
    Nav
} from 'react-bootstrap';
import ProductCard from './components/productcard';
import './styles/Home.css';
import { products } from './products/products';

function ProductView({products, category}) {
    if (category === "all") {
        return products.map(product =>
            (
                <Col xs={6} sm={4} md={3} className="product-card" key={product.id}>
                    <ProductCard product={product} />
                </Col>
            ));
    } else {
        return products.map(product => {
            if (product.category === category) {
                return (
                    <Col xs={6} sm={4} md={3} className="product-card" key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                )
            }
            return ""
        });
    }
}

function Home() {
    const [category, setCategory] = useState("all");
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    }
    
    return (
        <Container>
            <Navbar>
                <Navbar.Brand>Online Shop</Navbar.Brand>
                <div className="navbar-menus">
                    <button>Cart</button>
                    <button>Login</button>
                </div>
            </Navbar>
            <Row>
                <Col sm={3} className="category-pane">
                    <Nav variant="pills" defaultActiveKey="all" className="flex-sm-column">
                        <Nav.Link onSelect={() => handleCategoryChange('all')} eventKey="all">All</Nav.Link>
                        <Nav.Link onSelect={() => handleCategoryChange('electronic')} eventKey="electronics">Electronics</Nav.Link>
                        <Nav.Link onSelect={() => handleCategoryChange('fashion')} eventKey="fashion">Fashion</Nav.Link>
                        <Nav.Link onSelect={() => handleCategoryChange('food')} eventKey="food">Food</Nav.Link>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Row>
                        <ProductView products={products} category={category} />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Home