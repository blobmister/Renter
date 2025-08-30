import { Link } from "react-router-dom";
import "./Login.css"

export default function Login() {
    const createAccount = () => {
        console.log("post")
    }

    return (
        <div className="container">
            <div className="inputBlock">
                <h1>RentOut</h1>
                <p>Login to start Renting or Lending!</p>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />

                <button onClick={createAccount}>Login</button>

                <p>Don't have an account? Register Now!</p>
            </div>
        </div>
    );
}