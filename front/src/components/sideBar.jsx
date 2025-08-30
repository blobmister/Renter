// import ProfilePicture from './profilePicture.jsx'
// import UserName from './userName.jsx'
// import Location from './location.jsx'
// import RateIn from './rateIn.jsx'
// import RateOut from './rateOut.jsx'
// import NumListed from './numListed.jsx'
// import NumRented from './numRented.jsx'
import './styles/sidebar.css'

function SideBar() {
    return (
        <div className="sidebar-container">
            <div className="pic-name-container">
            <span style={{
                height: '10em',
                width: '10em',
                backgroundColor: '#bbb',
                borderRadius: '50%',
                display: 'inline-block',
            }}></span>
            <div style={{margin: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <p className="user-name">Firstname Lastname</p>
                <p style={{ fontSize: '0.8em', color: '#bbb' , fontWeight: 'italic'}}>
                    Sydney, NSW, Australia
                </p>
            </div>
            </div>
            
            <div style={{margin: '0.5em'}}>
                <p className='text-body' style={{fontWeight: 'bold', textAlign: 'justify'}}>about me</p>
                <p className='text-body' style={{textAlign: 'justify'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.
                </p>
            </div>

            <div style={{margin: '0.5em', marginTop: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
                <div style={{marginRight: '2em'}}>
                    <p className='text-body' style={{fontWeight: 'bold'}}>lender rating</p>
                    <p>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                </div>

                <div>
                    <p className='text-body' style={{fontWeight: 'bold'}}>renter rating</p>
                    <p>&#9733; &#9733; &#9733; &#9733;</p>
                </div>
            </div>
            
            <div style={{margin: '0.5em', marginTop: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
                <div style={{marginRight: '2em'}}>
                    <p className='text-body' style={{fontWeight: 'bold'}}>items listed</p>
                    <p style={{fontSize: '1.8em'}}>5</p>
                </div>

                <div>
                    <p className='text-body' style={{fontWeight: 'bold'}}>items used</p>
                    <p style={{fontSize: '1.8em'}}>10</p>
                </div>
            </div>

            <div style={{display: 'flex', alignSelf: 'center', marginTop: '1em'}}>
                <button style={{backgroundColor: '#ffffffff', color: '#000000'}}>Edit Profile</button>
            </div>

        </div>
    )
}

export default SideBar
