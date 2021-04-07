import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectProducts } from './features/products/productSlice'
import ProductCard from './components/productcard';
import Header from './components/header';

import './styles/Home.css';
import logo from './assets/logo.png';

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
    const products = useSelector(selectProducts);
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    }
    
    return (
        <Container>
            <Header />
            <div className="image-container">
                <img src={logo} alt="OnlineShop Logo"/>
            </div>
            <Row>
                <Col sm={3} className="category-pane">
                    <Navbar sticky="top">
                        <Nav variant="pills" defaultActiveKey="all" className="flex-sm-column">
                            <h6>Category</h6>
                            <br />
                            <Nav.Link onSelect={() => handleCategoryChange('all')} eventKey="all">All</Nav.Link>
                            <Nav.Link onSelect={() => handleCategoryChange('electronic')} eventKey="electronics">Electronics</Nav.Link>
                            <Nav.Link onSelect={() => handleCategoryChange('fashion')} eventKey="fashion">Fashion</Nav.Link>
                            <Nav.Link onSelect={() => handleCategoryChange('food')} eventKey="food">Food</Nav.Link>
                        </Nav>
                    </Navbar>
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