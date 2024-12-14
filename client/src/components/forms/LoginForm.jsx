import {Component} from "react";
import {Navigate} from "react-router";
import '../../style.css'; // Import the CSS

class LoginForm extends Component {
    constructor(props) {
        super(props);
        let name = "";
        let nameIsValid = this.validatename(name);
        let password = "";
        let passwordIsValid = this.validatePassword(password);
        this.state = {
            name: name,
            password: password,
            nameValid: nameIsValid,
            passwordValid: passwordIsValid,

            redirectToProfile: false,
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    validatePassword(password){
        return password.length > 3;
    }
    validatename(name){
        return name.length > 2;
    }
    onPasswordChange(e) {
        const val = e.target.value;
        const valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    }
    onNameChange(e) {
        const val = e.target.value;
        const valid = this.validatename(val);
        this.setState({name: val, nameValid: valid});
    }

    handleGoogleLogin() {
        window.location.href = 'http://localhost:3000/auth/google';
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.nameValid ===true && this.state.passwordValid===true){
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: this.state.name,
                    password: this.state.password,
                })
            });
            const data = await response.json();
            if (response.ok) {
                const {setUser} = this.props;
                setUser(data.user);
                this.setState({redirectToProfile: true});
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } else {
            alert(`Ошибка: Поля заполнены неверно`);
        }
    }

    render() {
        if (this.state.redirectToProfile) {
            return <Navigate to="/profile" />;
        }

        let nameColor = this.state.nameValid===true?"green":"red";
        let passwordColor = this.state.passwordValid===true?"green":"red";

        return (
            <div className="auth-container">
                <div className="auth-box">
                    <h1 className="auth-title">Log In</h1>
                    <form onSubmit={this.handleSubmit} className="auth-form">
                        <input
                        type="text"
                        placeholder="name"
                        className="auth-input"
                        required
                        onChange={this.onNameChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            required
                            onChange={this.onPasswordChange}
                        />
                        <button type="submit" className="auth-button">
                        Log In
                        </button>
                    </form>
                    <div className="auth-options">
                        <p>Or log in with:</p>
                        <div className="social-buttons">
                        <button
                            className="social-button google-button"
                            onClick={this.handleGoogleLogin}
                        >
                            Log in with Google
                        </button>
                        <button
                            className="social-button facebook-button"
                            onClick={this.handleFacebookLogin}
                        >
                            Log in with Facebook
                        </button>
                        </div>
                    </div>
                    <div className="auth-options">
                        <p>Don't have an account? <a href="/register" className="auth-link">Register</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;