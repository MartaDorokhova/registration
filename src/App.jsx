import { useState } from 'react';
import './App.css';

const sendFormData = (formData) => {
	console.log(formData);
};
export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ formData });
	};
	const { email, password, repeatPassword } = formData;
	return (
		<div className="styles.app">
			<form onSubmit={onSubmit}>
				<div>Имя</div>
				<input
					name="email"
					type="email"
					placeholder="Введите email"
					value={email}
					onChange={({ target }) =>
						setFormData({ ...formData, email: target.value })
					}
				/>
				<div>Пароль</div>
				<input
					name="password"
					type="password"
					placeholder="Введите пароль"
					value={password}
					onChange={({ target }) =>
						setFormData({ ...formData, password: target.value })
					}
				/>
				<div>Повторите пароль</div>
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatPassword}
					onChange={({ target }) =>
						setFormData({ ...formData, repeatPassword: target.value })
					}
				/>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
