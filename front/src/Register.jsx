import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "./UserContext";
import "./AccountForm.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const [name, setName ] = useState("");
    const [location, setLocation ] = useState("");

    let navigate = useNavigate();
    const {userLogin} = useUser();

    const createAccount = async (e) => {
        e.preventDefault();

        console.log(email, password, name, location)
        const payload = {name, email, password, location}

        try {
            const response = await fetch("https://renter-production-faad.up.railway.app/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.user;
                console.log("Registered!", data);
            }
        } catch (err) {
            console.error(err);
        }

        //Login
        try {
            const response = await fetch("https://renter-production-faad.up.railway.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                const session = data.session;
                console.log("Logged in!", session);

                const token = session.access_token;
                localStorage.setItem("token", token);

                userLogin(session.user);

                navigate("/")
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <div className="inputBlock">
                <div
                    style={{
                        width: "100%",
                        height: "90px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        top: "0",
                        left: "0",
                        margin: "0",
                        padding: "0",
                        gap: "12px",
                    }}
                >
                <h1
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer", margin: 0 }}
                    >RentOut</h1>

                <img
                    onClick={() => navigate("/")}
                    src="/src/assets/output-onlinegiftools.gif"
                    alt="Logo"
                    style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                    }}
                />
                </div>
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