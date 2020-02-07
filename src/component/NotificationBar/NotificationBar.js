import React, { Component } from 'react';
import './notificationBar.css';

/**
 * This component renders notification message. 
 * The component receives the message to be displayed and classname for styling as an input prop.
 */
class NotificationBar extends Component {

    render() {
        let { className, message, customClassName } = this.props;
        if(customClassName) {
            className = "custom-notification-bar " + className;
        } else {
            className = "notification-bar " + className;
        }
        return <div className={className}>{message}</div>;
    }
}

export default NotificationBar;