import { Link } from "react-router-dom";
import "./AccountForm.css"

export default function Login() {
    const login = () => {
        console.log("post")
    }

    return (
        <div className="container">
            <div className="inputBlock">
                <h1>RentOut</h1>
                <p>Login to start Renting or Lending!</p>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />

                <button onClick={login}>Login</button>

                <p>Don't have an account? <Link to="/register">Register Now!</Link></p>
            </div>
        </div>
    );
}