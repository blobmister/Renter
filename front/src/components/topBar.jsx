import App from '../App.jsx';
import { useNavigate } from 'react-router-dom'; 

function TopBar() {
    const navigate = useNavigate();

    return (
        <div style={{ width: "100%", height: "90px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #989898", top: "0", left: "0", margin: "0", padding: "0"}}>
            <img 
                onClick={() => navigate('/')}
                src="/src/assets/output-onlinegiftools.gif"
                alt="Logo"
                style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    objectFit: 'cover'
                }}
            />
        </div>
    )
}

export default TopBar;