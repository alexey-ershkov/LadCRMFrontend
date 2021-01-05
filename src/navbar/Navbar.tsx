import React, {useState} from "react";
import {Link} from "react-router-dom";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Navbar.scss';

function Navbar(): JSX.Element {
    const [mobileIsOpen, handleMobileButtonClick] = useState(false)


    let button = !mobileIsOpen ? 'Open' : 'Close';
    let visibleClass = mobileIsOpen ? 'visible' : 'hidden';
    let navbarActiveClass = mobileIsOpen ? 'active' : ''
    let handleButtonClick = () => handleMobileButtonClick(!mobileIsOpen)

    return (
        <div className={`Navbar ${navbarActiveClass}`}>
            <Link to={'/'} className={"MainLabel"}>Ладъ CRM</Link>
            <div className={`Links ${visibleClass}`}>
                <Link className={'Link'} to={'/archive'} onClick={handleButtonClick}> Архив </Link>
                <Link className={'Link'} to={'/settings'} onClick={handleButtonClick}> Настройки </Link>
            </div>

            <div className={'MenuButton'} onClick={() => handleMobileButtonClick(!mobileIsOpen)}>
                {button}
            </div>
            {/*<FontAwesomeIcon icon={'sliders-h'}/>*/}
        </div>
    );
}

export default Navbar;
