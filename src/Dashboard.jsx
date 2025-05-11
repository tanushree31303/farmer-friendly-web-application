import React, { Component } from 'react';
import './Dashboard.css';
import { callApi, getSession, setSession } from './api';
import Sell from './Sell';
import Buy from './Buy';
import MyProfile from './MyProfile';
import Cart from './Cart';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            activeComponent: <MyProfile />,
            menuItems: [],
            dropdownOpen: false
        };
        this.fullnameResponse = this.fullnameResponse.bind(this);
        this.loadComponents = this.loadComponents.bind(this);
        this.loadMenus = this.loadMenus.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const crs = getSession("csrid");
        if (!crs) {
            this.logout();
            return;
        }

        const data = JSON.stringify({ csrid: crs });

        // Call both APIs
        callApi("POST", "http://localhost:8089/users/getfullname", data, this.fullnameResponse);
        callApi("POST", "http://localhost:8089/menus/getmenusbyrole", data, this.loadMenus);
    }

    fullnameResponse(response) {
        this.setState({ fullname: response });
    }

    loadMenus(response) {
        const data = JSON.parse(response);
        this.setState({ menuItems: data });
    }

    toggleDropdown() {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    logout() {
        setSession("csrid", "", -1);
        window.location.replace("/");
    }

    loadComponents(menuId) {
        const components = {
            "1": <Sell />,
            "2": <Buy />,
            "3": <MyProfile />,
            "4":<Cart />
        };
        this.setState({ activeComponent: components[menuId], dropdownOpen: false });
    }

    render() {
        const { fullname, activeComponent, menuItems, dropdownOpen } = this.state;

        return (
            <div className="dashboard">
                <div className="header">
                    <img className="logo" src="./logo.png" alt="Farmify Logo" />

                    <div className="menulist">
                        <ul>
                            {menuItems.map((row) => (
                                <li key={row.mid} onClick={() => this.loadComponents(row.mid)}>
                                    {row.menu}
                                    <img src={row.icon} alt={row.menu} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <label>{fullname ? `Welcome, ${fullname}` : "Loading..."}</label>

                    {/* ✅ Cart Icon Before Menu Icon */}
<div className="cart-icon-wrapper">
    <img
        src="./cart.png" // ✅ Access from public folder
        alt="Cart"
        className="cart-icon"
        onClick={() => this.loadComponents(4)} // Adjust menuId if needed
    />
</div>


                    <div className="menu-dropdown">
                        <img
                            src="./menu.png"
                            alt="Menu"
                            className="menu-icon"
                            onClick={this.toggleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="dropdown-content">
                                <div onClick={() => this.loadComponents("3")}>Settings</div>
                                <div onClick={this.logout}>
                                    Logout
                                    <img className="logout" src="./logout.png" alt="Logout" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="outlet">
                        {activeComponent}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
