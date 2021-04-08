import styles from './styles/productcard.module.css';
import imagePlaceholder from '../assets/product_placeholder.png';

import {
    addItem,
    selectItemInCart
} from '../features/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux';

import CardButton from'./cardbutton'

export default function ProductCard({action, product, list}) {
    const price = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(product.price);
    const inCart = useSelector(selectItemInCart);
    const dispatch = useDispatch();

    const handleImageNotFound = (event) => {
        event.target.src = imagePlaceholder;
    }
    const handleAddToCart = (product) => {
        dispatch(addItem(product))
    }

    return (
        <div className={`${styles.cardBg} ${list ? styles.list : ""}`}>
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
                <h6 className={styles.productPrice}>{price}</h6>
            </div>
            {/* Consists of 3 actions:
            - Normal card (add to cart / quantity modifier)
            - Cart (quantity modifier, item remover)
            - Admin (item modifier, item remover) */}
            <CardButton
                action={action}
                inCart={inCart}
                id={product.id}
                addToCart={() => handleAddToCart(product)}
            />
        </div>
    )
}