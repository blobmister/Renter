import { useState } from 'react'
import TopBar from './topBar.jsx'
import SideBar from './sideBar.jsx'
import Conversations from './conversations.jsx'
import ListedItems from './listedItems.jsx'
import SavedItems from './savedItems.jsx'
import './styles/dashboard.css'

function Dashboard() {
    const [expandedComponent, setExpandedComponent] = useState(null);

    return (
        <div className="dashboard-container">
            <TopBar />
            <div className="dashboard-content">
                <SideBar />
                <div className="lists-container">
                    <Conversations
                     isExpanded={expandedComponent === 'conversations'}
                     onExpand={() => setExpandedComponent('conversations')}
                     onCollapse={() => setExpandedComponent(null)}
                    />
                    {/* {expandedComponent === 'conversations' && (
                        <>
                        <SavedItems 
                                isExpanded={expandedComponent === 'savedItems'}
                                onExpand={() => setExpandedComponent('savedItems')}
                                onCollapse={() => setExpandedComponent(null)}
                            />
                            <ListedItems 
                                isExpanded={expandedComponent === 'listedItems'}
                                onExpand={() => setExpandedComponent('listedItems')}
                                onCollapse={() => setExpandedComponent(null)}
                            />
                        </>
                    )} */}
                    {/* {expandedComponent === 'savedItems' && (
                        <ListedItems 
                            isExpanded={false}
                            onExpand={() => setExpandedComponent('listedItems')}
                            onCollapse={() => setExpandedComponent(null)}
                        />
                    )} */}
                    <SavedItems 
                        isExpanded={expandedComponent === 'savedItems'}
                        onExpand={() => setExpandedComponent('savedItems')}
                        onCollapse={() => setExpandedComponent(null)}
                    />
                    <ListedItems 
                        isExpanded={expandedComponent === 'listedItems'}
                        onExpand={() => setExpandedComponent('listedItems')}
                        onCollapse={() => setExpandedComponent(null)}
                    />
                </div>

            </div>
        </div>
    )
}

export default Dashboard