import "./Login.css"

export default function Login() {
    const createAccount = () => {
        console.log("post")
    }

    return (
        <div className="container">
            <div>
                <input type="email" placeholder="Email" />
            </div>
            <div>
                <input type="password" placeholder="Password" />
            </div>

            <button onClick={createAccount}>Login</button>
        </div>
    );
}