
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './home.css';
import { fetchDataAPI } from '../services/HomeService';
import CharacterCard from '../component/Card';
import SortDropdown from '../component/SortDropDown';
import { HomeConstants } from '../utils/Constants';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            config: { 'Assending': 'assending', 'Desending': 'desending' },
            stateData: [],
            searchData: [],
            errMsg: HomeConstants.emptyDataAPIRequest
        };
        //Binding events
        this.handleFetchData();
    }

    componentDidUpdate(nextProps) {
        const { homeData } = this.props;
        if (nextProps.homeData !== homeData) {
            if (homeData && homeData.data) {
                this.setState({ stateData: homeData.data, searchData: homeData.data });
            }
        }
    }
    
    handleFetchData = () => {
        if (this.props.handleFetchData) {
            this.props.handleFetchData();
        }
    }

    handleSearchNameChange = (e) => {
        let items = this.state.stateData;
        items = items.filter((item) => {
            return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        if(items.length === 0) {
           this.setState({errMsg: HomeConstants.emptyDataMsg});
        }
        this.setState({ searchData: items });
    }

    handleSortOption = (option) => {
        const { searchData } = this.state;
        if (option && option.toLowerCase() === "assending") {
            searchData.sort((a, b) => a - b);
        } else if (option) {
            searchData.sort((a, b) => a - b).reverse();
        }
        this.setState({ searchData });
    }

    render() {
        const renderComponent = [];
        const { searchData, config, errMsg } = this.state;
        let status = true;
        if(searchData.length === 0) {
            status = false;
        }
        if (searchData && searchData.length) {
            searchData.forEach((item) => {
                renderComponent.push(
                    <CharacterCard
                        cardData={item}
                    />
                );
            });
        }
        return (
            <div className="main">
                <div className="container">
                    <div className="function-bar">
                        <input
                            id='search-icon'
                            type="text"
                            className="form-control"
                            placeholder=" SearchByName..."
                            onChange={this.handleSearchNameChange}
                        />
                        <SortDropdown
                            Config={config}
                            handleSortOption={this.handleSortOption}
                        />
                    </div>
                    {status ? <div className="row row-padding">
                        {renderComponent}
                    </div> :
                        <div className="EmptyData">
                            {errMsg}
                        </div>}
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        homeData: state.homeData
    };
};

/**
 * mapDispatchToProps - receives the dispatch() method and returns callback back props to use in component
 */
const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: () => dispatch(fetchDataAPI())
    };
};

/**
* connect() method connects component to redux store
*/
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Home);