import styles from './styles/button.module.css'
export default function Button({ value, onClick, type="button", className="", active }) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick} type={type} active>
            {value}
        </button>
    )
}