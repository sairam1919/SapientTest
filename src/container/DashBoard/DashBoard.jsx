import React, { Component } from "react";
import { Navbar } from 'reactstrap';
import './DashBoard.css';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    gotoModule(){
        if(this.props.setModule){
            this.props.setModule("projects");
        }
    }

    render() {
        const { projectData } = this.props;
        let renderRecentlyViewedList = [];
        let epicsList = [];
        let capabilitesList = [];
        let featuresList = [];
        let userstoryList = [];
        let releasesList = [];
        let projectNamesList = [];
        if (projectData && projectData.projectList && projectData.projectList.length) {
            projectData.projectList.forEach((item) => {
                projectNamesList.push(item.name);
                renderRecentlyViewedList.push(
                    <div>
                        <p><a href="#">{item.name}</a></p>
                        <div className="dashboard-divider" />
                    </div>
                )

                let capabilityTemp = 0;
                let featureTemp = 0;
                let userStroyTemp = 0;

                if (item.epics && item.epics.length) {
                    epicsList.push(item.epics.length);
                    item.epics.forEach((epic) => {
                        if (epic.capabilites && epic.capabilites.length) {
                            capabilityTemp += epic.capabilites.length;
                            epic.capabilites.forEach((capability) => {
                                if (capability.features && capability.features.length) {
                                    featureTemp += capability.features.length;
                                    capability.features.forEach((feature) => {
                                        if (feature.userstories && feature.userstories.length) {
                                            userStroyTemp += feature.userstories.length;
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                capabilitesList.push(capabilitesList);
                featuresList.push(featureTemp);
                userstoryList.push(userStroyTemp);
            })
        }
        const options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Project Chart'
            },
            xAxis: {
                categories: projectNamesList,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Project Count',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Epics',
                data: epicsList
            }, {
                name: 'Capabilites',
                data: capabilitesList
            }, {
                name: 'Features',
                data: featuresList
            }, {
                name: 'UserStories',
                data: userstoryList
            }]
        }
        return (
            <div>
                <div>
                    <Navbar expand="sm" className="navabar-main" >
                        <div className="dashboard">
                            Dashboard
    					</div>
                    </Navbar>
                    <div className="dashboard-divider" />
                </div>

                <div className="main">
                    <div className="leftSection">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                    <div className="rightSection">
                        <div className = "verticalLine"></div>
                    <h5>Recently Viewed</h5>
                        {renderRecentlyViewedList}
                    </div>
                </div>
            </div>
        );
    }

}
export default DashBoard;