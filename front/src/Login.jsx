import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "./UserContext";
import "./AccountForm.css"

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");

    const {user, userLogin, logout} = useUser();

    let navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        console.log(email, password)
        const payload = {email, password}

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
            <div className="container">
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