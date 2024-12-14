import LoginForm from "./forms/LoginForm.jsx";
import {useAuth} from "../../context/AuthorizationContext.jsx";

const Login = () => {
    const {setUser} = useAuth();
    return (
        <div className="login">
            <LoginForm setUser={setUser}/>
        </div>
    );
};

export default Login;