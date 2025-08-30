import App from '../App.jsx';
import { useNavigate } from 'react-router-dom'; 

function TopBar() {
    const navigate = useNavigate();

    return (
        <div style={{ width: "100%", height: "90px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #989898", top: "0", left: "0", margin: "0", padding: "0"}}>
            <span 
                onClick={() => navigate('/')}
                style={{
                height: '40px',
                width: '40px',
                backgroundColor: '#bbb',
                borderRadius: '50%',
                display: 'inline-block',
                padding: '0.5em'
            }}></span>
        </div>
    )
}

export default TopBar;