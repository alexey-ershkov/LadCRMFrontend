import React, {useState} from "react";
import {Link} from "react-router-dom";
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Navbar.scss';

function Navbar(): JSX.Element {
    const [mobileIsOpen, handleMobileButtonClick] = useState(false)


    let button = !mobileIsOpen ?  <FontAwesomeIcon icon={faBars}/> : <FontAwesomeIcon icon={faTimes}/>;
    let visibleClass = mobileIsOpen ? 'visible' : 'hidden';
    let navbarActiveClass = mobileIsOpen ? 'active' : ''
    let handleButtonClick = () => handleMobileButtonClick(false)

    return (
        <div className={`Navbar ${navbarActiveClass}`}>
            <Link to={'/'} className={"MainLabel"} onClick={handleButtonClick}>Ладъ CRM</Link>
            <div className={`Links ${visibleClass}`}>
                <Link className={'Link'} to={'/journal'} onClick={handleButtonClick}> Журнал посещений </Link>
                <Link className={'Link'} to={'/archive'} onClick={handleButtonClick}> Архив </Link>
                <Link className={'Link'} to={'/settings'} onClick={handleButtonClick}> Настройки </Link>
            </div>

            <div className={'MenuButton'} onClick={() => handleMobileButtonClick(!mobileIsOpen)}>
                {button}
            </div>
        </div>
    );
}

export default Navbar;
