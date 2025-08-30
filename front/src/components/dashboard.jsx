import TopBar from './topBar.jsx'
import SideBar from './sideBar.jsx'
import Conversations from './conversations.jsx'
import './styles/dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard-container">
            <TopBar />
            <div className="dashboard-content">
                <SideBar />
                <Conversations />
            </div>
        </div>
    )
}

export default Dashboard