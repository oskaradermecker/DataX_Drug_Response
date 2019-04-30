import React, { Component } from 'react';

export default class SignUpContainer extends Component {
	render() {
		return (
			<div id='signUpContainer'>
				// <SignUpHeader title="SomethingCo" />
				<SignUpForm />
			</div>
		);
	}
}

const styles = EStyleSheet.create({
  mixin shadow-raised {
	@include box-shadow(
		0 4px 10px 1px rgba(0, 0, 0, .2)
	);

	&:before, &:after {
		content: none;
	}
}

body {
	margin: 0;
	padding: 0;
	font-family: 'Open Sans';
}

#signUpContainer {
	width: 300px;
	margin: 50px auto;
	background-color: #FFFFFF;
	border-radius: 8px;
	@include shadow-raised();
}

#signUpHeader {
	height: 60px;
	background-color: #7DB4B5;
	border-radius: 8px 8px 0 0;
	box-shadow: inset 0px -5px 0px 0px rgba(224,239,241, 0.75);
  -webkit-transition: border 0.2s linear, box-shadow 0.2s linear, background-color .35s ease;
}

#signUpHeaderTitle {
	text-align: center;
	padding-top: 13px;
	font-size: 28px;
	font-family: 'Damion';
	color: #FFFFFF;
}

#signUpFormContainer {
	padding: 20px 10px;
	position: relative;
}

#signUpForm {
	width: 90%;
	margin: 0px auto;
}

.signUpRow {
	margin: 15px 0;
	text-align: center;
}

.signUpRow {
	input[type=text], input[type=password] {
		width: 100%;
		height: 35px;
		box-sizing: border-box;
		border: none;
		font-size: 18px;
		padding-left: 2px;
		color: #7DB4B5;
		box-shadow: inset 0px -3px 0px 0px rgba(224,239,241, 0.75);
  -webkit-transition: border 0.2s linear, box-shadow 0.2s linear, background-color .35s ease;
		&:focus {
			box-shadow: inset 0px -3px 0px 0px rgba(125,180,181, 1);
  -webkit-transition: border 0.2s linear, box-shadow 0.2s linear, background-color .35s ease;
			outline: none;
		}
	}
}

.signUpRow input[type=checkbox] {
	display: none;
}

.signUpRow input[type=checkbox] + label::before {
	content: '';
  display: block;
  position: absolute;
	top: 0;
	left: 1px;
  height: 15px;
  width: 15px;
  border: 3px solid rgba(125,180,181, .85);
  border-radius: 5px;
  transition: background-color .2s;
}

.signUpRow input[type=checkbox]:checked + label::before {
	content: '\2713';
	font-size: 15px;
	line-height: 15px;
	color: rgba(125,180,181, .85);
}

.signUpRow input[type=checkbox] + label {
	font-size: 12px;
	position: relative;
	padding: 3px 0 0 30px;
	cursor: pointer;
}

.signUpRow button {
	width: 70%;
	height: 40px;
	border: 1px solid rgba(224,239,241, 0.75);
	border-radius: 3px 3px 0 0;
	box-shadow: inset 0px -3px 0px 0px rgba(224,239,241, 0.75);
  -webkit-transition: border 0.2s linear, box-shadow 0.2s linear, background-color .35s ease;
	background-color: #7DB4B5;
	font-size: 18px;
	color: #FFFFFF;
	cursor: pointer;
	&:hover {
		background-color: rgba(125,180,181, .85);
	}
}
});


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
