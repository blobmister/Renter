import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./AccountForm.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");

    let navigate = useNavigate();

    const login = async () => {
        console.log(email, password)
        const payload = {email, password}

        try {
            const response = await fetch("https://renter-production-faad.up.railway.app/api/auth/login", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate("/")
            }
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <div className="container">
            <div className="inputBlock">
                <h1>RentOut</h1>
                <p>Login to start Renting or Lending!</p>

                <form onSubmit={login}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                    <button type="submit">Login</button>
                </form>

                <p>Don't have an account? <Link to="/register">Register Now!</Link></p>
            </div>
        </div>
    );
}