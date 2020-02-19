import React, { Component } from "react";
import './notificationBarContainer.css';

/**
 * Container for Notification Bar
 * Handles the Rendering logic and timeout for notifications.
 */
export default class Notificationbar extends Component {


    hideNotification = () => {
        this.props.hideNotification();
    }

    render() {
        console.log("notificationContent: ", this.props.notificationContent);
    return (
        <div id = "notification-main">
            <div className="create-project-header">
                <a className="project-cross-symbol" onClick={this.hideNotification}>X</a>
                 <h6>{this.props.notificationContent}</h6>
             </div>
        </div>
    )
    }
}
    