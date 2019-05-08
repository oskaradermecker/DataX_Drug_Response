import React, { Component } from 'react';

// tried to import from https://codepen.io/jarredwitt/pen/epEbZK?editors=0110
// import './styles.scss';

export default class SignUpContainer extends Component {
	render() {
		return (
			<div id='signUpContainer'>
				<SignUpHeader title="SomethingCo" />
				<SignUpForm />
			</div>
		);
	}
}

const SignUpHeader = props => (
	<div id='signUpHeader'>
		<div id='signUpHeaderTitle'>
			{props.title}
		</div>
	</div>
);

const FormInput = props => (
	<div className='signUpRow'>
		<input type={props.type} placeholder={props.placeholder} />
	</div>
);

const FormCheckBox = props => (
	<div className='signUpRow'>
		<input id={props.id} type='checkbox' />
		<label htmlFor={props.id}>{props.label}</label>
	</div>
);

const FormButton = props => (
	<div className='signUpRow'>
		<button type='button'>{props.title}</button>
	</div>
);

const SignUpForm = props => (
	<div id='signUpFormContainer'>
		<form id="signUpForm">
			<FormInput type="text" placeholder="email" />
				<FormInput type="password" placeholder="password" />
				<FormInput type="password" placeholder="confirm" />
				<FormCheckBox id="terms" label="I agree to the terms and conditions" />
				<FormButton title="Sign Up" />
		</form>
	</div>
);
