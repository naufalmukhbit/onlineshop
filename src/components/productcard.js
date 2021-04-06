import styles from './productcard.module.css';
// import ImageLoader from './imageloader';

export default function ProductCard({product}) {
    const price = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(product.price)
    return (
        <div className={styles.cardBg}>
            <img
                src={`../images/${product.category}/${product.id}.jpg`}
                className={styles.productImage}
                alt={product.name}
            />
            {/* <ImageLoader product={product} className={styles.productImage} /> */}
            <div className={styles.productDetail}>
                <p className={styles.productName}>{
                    product.name.length > 50 ? product.name.substring(0,50) + '...' : product.name
                }</p>
                <h6>{price}</h6>
                <button className={styles.cartButton}>Add to Cart</button>
            </div>
        </div>
    )
}