import styles from './styles/button.module.css'
export default function Button({ value, onClick, className="" }) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {value}
        </button>
    )
}