import React, { Component } from "react";
import {Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './DashBoard.css'

export class DashBoard extends Component{
    constructor(props){
        super(props);
        this. state = {
            dropdownOpen: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
    	this.setState({
    		dropdownOpen: !this.state.dropdownOpen
    	});
    }

    render(){
        return(
            <div>
                <div>
    				<Navbar expand="sm" className="navabar-main" >
    					<div className="dashboard">
                            Dashboard
    					</div>
    				</Navbar>
    				<div className="dashboard-divider" />
    			</div>

                <div className = "main">
                    <div className = "leftSection">
                        <h5>Recently Viewed</h5>
                        <p><a href = "#">Portal-Current: Orch Greedo PI01.1 User Stories</a></p>
                        <div className="dashboard-divider" />
                        <p><a href = "#">Portal Current</a></p>
                        <div className="dashboard-divider" />
                        <p><a href = "#">Platform Management</a></p>
                        <div className="dashboard-divider" />
                    </div>
                    <div className = "verticalLine"></div>
                    <div className = "rightSection">
                        <h5>Active Reviews</h5>
                        <h6> You have <a href = "#">4 active reviews</a></h6>
                        <p><a href = "#">Test plan: ORCH-R1.00.00.00.05</a></p>
                        <div className="dashboard-divider" />
                        <p><a href = "#">Functional Specification: Management</a></p>
                        <div className="dashboard-divider" />
                        <p><a href = "#">Functional Specification: Dashboard</a></p>
                        <div className="dashboard-divider" />
                        <p><a href = "#"> Desgin Specification: Management</a></p>
                        <div className="dashboard-divider" />
                    </div>
                </div>
                {/* <Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
    								<DropdownToggle
    									tag="span"
    									data-toggle="dropdown"
    									aria-expanded={ this.state.dropdownOpen }
    								>
    									<div id="plus-image" >Hello</div>
    								</DropdownToggle>
    								<div className="menuarea">
    									<DropdownMenu className="adddevice-dropDownDiv">
                                        <DropdownItem header>Header</DropdownItem>
                                          <DropdownItem>Some Action</DropdownItem>
    									</DropdownMenu>
    								</div>
    							</Dropdown> */}
            </div>
        );
    }

}
export default DashBoard;