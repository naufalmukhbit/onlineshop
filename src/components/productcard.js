import styles from './productcard.module.css';
import imagePlaceholder from '../assets/product_placeholder.png';
import { InputGroup, FormControl } from 'react-bootstrap';

import {
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    selectItemQuantity,
    selectItemInCart
} from '../features/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux';

import Button from './button'

function QuantityButtons({id}) {
    const quantity = useSelector(selectItemQuantity);
    const dispatch = useDispatch();
    return (
        <InputGroup className={styles.quantityButtonContainer}>
            <InputGroup.Prepend>
                <Button value="-" className={styles.quantityButtons} onClick={() => 
                    quantity[id] === 1 ?
                    dispatch(removeItem(id)) :
                    dispatch(decreaseQuantity(id))
                } />
            </InputGroup.Prepend>
            <FormControl value={quantity[id]} className={styles.quantity} disabled />
            <InputGroup.Append>
                <Button value="+" className={styles.quantityButtons} onClick={() => dispatch(increaseQuantity(id))} />
            </InputGroup.Append>
        </InputGroup>
    )
}

function CardButton({ inCart, id, addToCart }) {
    if (inCart(id)) {
        return (
            <QuantityButtons id={id}/>
        )
    } else {
        return (
            <Button value="Add to Cart" className={styles.cartButton} onClick={addToCart} />
        )
    }
}

export default function ProductCard({product, type='grid'}) {
    const price = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(product.price);
    const inCart = useSelector(selectItemInCart);
    // const inCart = true ;
    const dispatch = useDispatch();
    const handleImageNotFound = (event) => {
        event.target.src = imagePlaceholder;
    }
    const handleAddToCart = (product) => {
        dispatch(addItem(product))
    }

    return (
        <div className={type === 'grid' ? styles.cardBg : styles.cardListBg}>
            <img
                src={`../images/${product.category}/${product.id}.jpg`}
                className={styles.productImage}
                alt={product.name}
                onError={handleImageNotFound}
            />
            <div className={styles.productDetail}>
                <p className={styles.productName}>{
                    product.name.length > 50 ? product.name.substring(0,50) + '...' : product.name
                }</p>
                <h6 className={styles.price}>{price}</h6>
                <br />
                <CardButton inCart={inCart} id={product.id} addToCart={() => handleAddToCart(product)} />
            </div>
        </div>
    )
}