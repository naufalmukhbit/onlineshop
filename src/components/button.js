import styles from "./styles/button.module.css";
export default function Button({
	value,
	onClick,
	type = "button",
	className = "",
}) {
	return (
		<button
			className={`${styles.button} ${className}`}
			onClick={onClick}
			type={type}
		>
			{value}
		</button>
	);
}
