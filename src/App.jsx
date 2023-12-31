import { useState } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};
export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [formDataError, setFormDataError] = useState({
		emailError: null,
		passwordError: null,
		repeatPasswordError: null,
		registrarionError: null,
	});
	const onSubmit = (event) => {
		event.preventDefault();
		let emailError = null;
		let passwordError = null;
		let repeatPasswordError = null;
		if (!formData.email) {
			emailError = 'Поле обязательно для заполнения';
		}
		if (!formData.password) {
			passwordError = 'Поле обязательно для заполнения';
		}
		if (!formData.repeatPassword) {
			repeatPasswordError = 'Поле обязательно для заполнения';
		}

		setFormDataError({
			...formDataError,
			passwordError,
			emailError,
			repeatPasswordError,
		});
		sendFormData({ formData });
	};
	const { email, password, repeatPassword } = formData;

	const handleEmailChange = ({ target }) => {
		setFormData({ ...formData, email: target.value });
		let newError = null;

		if (!/\S+@\S+\.\S+/.test(target.value)) {
			newError = 'Неверный почтовый адрес';
		}

		setFormDataError({ ...formDataError, emailError: newError });
	};

	const handlePasswordChange = ({ target }) => {
		setFormData({ ...formData, password: target.value });

		let newError = null;

		if (
			!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
				target.value,
			)
		) {
			newError =
				' Пароль должен содержать символы, буквы и цифры разного регистра. Минимум одна из букв должна быть заглавной. Длина пароля  не менее 6 символов';
		}
		if (repeatPassword && repeatPassword !== target.value) {
			newError = ' Пароли должны совпадать';
		}

		setFormDataError({ ...formDataError, passwordError: newError });
	};

	const handleRepeatPasswordChange = ({ target }) => {
		setFormData({ ...formData, repeatPassword: target.value });
		let newError = null;
		if (password !== target.value) {
			newError = ' Пароли должны совпадать';
		}

		setFormDataError({
			...formDataError,
			repeatPasswordError: newError,
		});
	};

	return (
		<div className={styles.App}>
			<form onSubmit={onSubmit} className={styles.Form}>
				<div>Почта</div>
				<input
					name="email"
					type="email"
					placeholder="Введите email"
					value={email}
					onChange={handleEmailChange}
					className="styles.input"
				/>
				{formDataError.emailError && <p>{formDataError.emailError}</p>}
				<div>Пароль</div>
				<input
					name="password"
					type="password"
					placeholder="Введите пароль"
					value={password}
					onChange={handlePasswordChange}
				/>
				{formDataError.passwordError && <p>{formDataError.passwordError}</p>}
				<div>Повторите пароль</div>
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatPassword}
					onChange={handleRepeatPasswordChange}
				/>
				{formDataError.repeatPasswordError && (
					<p>{formDataError.repeatPasswordError}</p>
				)}
				<button
					type="submit"
					disabled={
						!!formDataError.passwordError ||
						!!formDataError.repeatPasswordError ||
						!!formDataError.emailError
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
