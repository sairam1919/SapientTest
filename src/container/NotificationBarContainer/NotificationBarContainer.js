import React, { Component } from "react";
import { connect } from "react-redux";
import NotificationBar from "../../component/NotificationBar/NotificationBar";
import { notifyClearWarning } from "../../store/actions/NotificationAction";
import './notificationBarContainer.css';
import { HomeConstants } from "../../utils/Constants";

/**
 * Container for Notification Bar
 * Handles the Rendering logic and timeout for notifications.
 */
class NotificationBarContainer extends Component {

    /**
     * Method to start the timer, postTimer function will be called after timeout
     */
    startTimer = () => {
        if (this.props.customTimeOut) {
            this.timeOutRef = setTimeout(
                this.postTimer,
                this.props.customTimeOut
            );
        } else {
            this.timeOutRef = setTimeout(
                this.postTimer,
                this.props.timeout
            );
        }
    };

    /**
     * Method to clear the existing timer
     */
    clearTimer = () => {
        clearTimeout(this.timeOutRef);
    };

    /**
     * Method that will be executed post timeout.
     * The notification is cleared when timeout occurs.
     */
    postTimer = () => {
        this.props.notifyClearWarning();
    };

    componentWillUnmount() {
        this.props.notifyClearWarning();
    }

    /**
     * The method that will return the notification bar display component.
     * Notification bar shall be displayed for ERROR, INFO & WARNING case
     * When notification type is empty, no notification bar shall be displayed.
     *
     * This method also clears any existing timer and starts timer for
     * notification types ERROR and INFO
     *
     * Notification type WARNING is non-dismissible.
     */
    displayNotificationBar = () => {
        if (this.props.notification && this.props.notification.type !== "") {
            let className = "";
            this.clearTimer();
            switch (this.props.notification.type) {
                case HomeConstants.WARNING:
                    className = "warning-bar";
                    break;
                case HomeConstants.ERROR:
                    className = "error-bar";
                    this.startTimer();
                    break;
                case HomeConstants.INFO:
                    className = "information-bar";
                    this.startTimer();
                    break;
                default:
                    break;
            }

            return ( <
                NotificationBar customClassName = { this.props.customClassName }
                className = { className }
                message = { this.props.notification.message }
                />
            );
        } else {
            return null;
        }
    };

    render() {
        return this.displayNotificationBar();
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.AlertMessage,
        timeout: 5000
    };
};

export default connect(mapStateToProps, { notifyClearWarning })(NotificationBarContainer);