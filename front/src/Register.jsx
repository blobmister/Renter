import { Link } from "react-router-dom";
import "./AccountForm.css"

export default function Register() {
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
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Location" />


                <button onClick={createAccount}>Register</button>

                <p>Already have an account? <Link to="/login">Login Now!</Link></p>
            </div>
        </div>
    );
}