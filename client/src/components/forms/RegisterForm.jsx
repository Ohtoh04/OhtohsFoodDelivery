import {Component} from "react";
import {Navigate} from "react-router";
import '../../style.css'; // Import the CSS

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email,
            password: props.password,
            password_repeat: props.password_repeat,


            nameValid: true,
            emailValid: true,
            passwordValid: true,
            passwordRepeatValid: true,

            redirectToLogin: false
        };

        this.onnameChange = this.onnameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordRepeatChange = this.onPasswordRepeatChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validatename(name){
        return name.length > 2;
    }
    validateEmail(email){
        var regex = /.+@(gmail.com|yandex.ru)$/;
        return regex.test(email);
    }
    validatePassword(password){
        return password.length > 3;
    }
    validatePasswordRepeat(password_repeat){
        return password_repeat === this.state.password;
    }

    onnameChange(e) {
        var val = e.target.value;
        var valid = this.validatename(val);
        this.setState({name: val, nameValid: valid});
    }
    onEmailChange(e) {
        var val = e.target.value;
        var valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    }
    onPasswordChange(e) {
        var val = e.target.value;
        var valid = this.validatePassword(val);
        var valid_repeat_password = this.state.password_repeat === val;
        this.setState({password: val, passwordValid: valid, passwordRepeatValid: valid_repeat_password});
    }
    onPasswordRepeatChange(e) {
        var val = e.target.value;
        var valid = this.validatePasswordRepeat(val);
        this.setState({password_repeat: val, passwordRepeatValid: valid});
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.nameValid &&
            this.state.emailValid &&
            this.state.passwordValid &&
            this.state.passwordRepeatValid) {
            
            console.log("check successful");

            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    password_repeat: this.state.password_repeat,
                })
            });
            const data = await response.json();
            if (response.ok) {
                this.setState({redirectToLogin: true});
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } else {
            alert(`Ошибка: некоторые поля заполнены неверно!`);
        }
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" />;
        }

        return (
            <div className="auth-container">
                <div className="auth-box">
                    <h1 className="auth-title">Register</h1>
                    <form onSubmit={this.handleSubmit} className="auth-form">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="auth-input"
                        required
                        onChange={this.onnameChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="auth-input"
                        required
                        onChange={this.onEmailChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        required
                        onChange={this.onPasswordChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="auth-input"
                        required
                        onChange={this.onPasswordRepeatChange}
                    />
                    <button type="submit" className="auth-button">
                        Register
                    </button>
                    </form>
                    <div className="auth-options">
                    <p>Already have an account? <a href="/login" className="auth-link">Log In</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterForm.defaultProps = {name: 'Client3',
    email: 'client3@gmail.com',
    password: '1234',
    password_repeat: '1234',}

export default RegisterForm;