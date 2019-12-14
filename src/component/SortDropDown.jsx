import React from "react";
import "./Filter.css";
import {
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from "reactstrap";

// SortDropdown COmponent in Dashboard
export default class SortDropdown extends React.Component {
    // initial state and binding the methods 
    constructor(props) {
        super(props);

        this.state = {
            sortdropdownOpen: false,
        };
    }

    // toggle the dropdown 
    toggle = () => {
        this.setState({
            sortdropdownOpen: !this.state.sortdropdownOpen
        });
    }

    // on Click  of selected option
    handleSortOption = (e, action) => {
        e.stopPropagation();
        if (this.props.handleSortOption) {
            this.props.handleSortOption(action);
        }
    }

    // render options in dropdown 
    renderMenuItemsForSort = (data) => {
        const { sortBy } = this.props;
        let results = [];
        Object.keys(data).forEach((action) => {
            results.push(<DropdownItem
                key={action}
                className={data[action] === sortBy ? "sort-selected" : "sorting-list sorting-dropdown-item"}
                onClick={(e) => this.handleSortOption(e, data[action])}
            >
                {action}
            </DropdownItem>);
        });
        return results;
    }

    // render method to show sort dropdown
    render() {
        const { Config } = this.props;
        return (
            <div className="sorting-block" onClick={this.toggle}>
                <Dropdown
                    isOpen={this.state.sortdropdownOpen}
                    toggle={this.toggle}
                >
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.sortdropdownOpen}
                    >
                        <div className="sorting-icon" />
                    </DropdownToggle>
                    <div className="sorting-menuarea">
                        <DropdownMenu className="sort-dropDownDiv">
                            <div className="carddrop-withoutborder"></div>
                            {this.renderMenuItemsForSort(Config ? Config : {})}
                        </DropdownMenu>
                    </div>
                </Dropdown>
            </div>
        );
    }
}