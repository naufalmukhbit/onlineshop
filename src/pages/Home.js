import React, { useState } from 'react';
import {
    Row,
    Col,
    Navbar,
    Nav
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";

import { selectProducts } from '../features/products/productSlice'
import ProductCard from '../components/productcard';
import Button from '../components/button';
import Layout from '../components/layout'

import './styles/Home.css';
import logo from '../assets/logo.png';

function ProductView({products, category}) {
    if (category === "all") {
        return products.map(product =>
            (
                <Col xs={6} sm={4} md={3} className="product-card" key={product.id}>
                    <ProductCard action="normal" product={product} />
                </Col>
            ));
    } else {
        return products.map(product => {
            if (product.category === category) {
                return (
                    <Col xs={6} sm={4} md={3} className="product-card" key={product.id}>
                        <ProductCard action="normal" product={product} />
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
        <Layout>
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
                    {/* <Button value={<FontAwesomeIcon icon={faThLarge} />} active/>
                    <Button value={<FontAwesomeIcon icon={faThList} />}/> */}
                    <Row>
                        <ProductView products={products} category={category} />
                    </Row>
                </Col>
            </Row>
        </Layout>
    )
}

export default Home