import TopBar from './topBar.jsx'
import SideBar from './sideBar.jsx'
import './styles/dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard-container">
            <TopBar />
            <SideBar />
        </div>
    )
}

export default Dashboard