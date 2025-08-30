import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./AccountForm.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const [name, setName ] = useState("");
    const [location, setLocation ] = useState("");

    let navigate = useNavigate();

    const createAccount = async () => {
        console.log(email, password, name, location)
        const payload = {name, email, password, location}

        try {
            const response = await fetch("https://renter-production-faad.up.railway.app/api/auth/register", {
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
                <p>Register an account to start Renting or Lending!</p>

                <form onSubmit={createAccount}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                
                    <button type="submit">Register</button>
                </form>

                <p>Already have an account? <Link to="/login">Login Now!</Link></p>
            </div>
        </div>
    );
}