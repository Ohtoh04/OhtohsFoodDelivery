import LoginForm from "./forms/LoginForm.jsx";
import {useAuthorization} from "../../context/AuthorizationContext.jsx";

const Login = () => {
    const {setProfile} = useAuthorization();
    return (
        <div className="login">
            <LoginForm setProfile={setProfile}/>
        </div>
    );
};

export default Login;