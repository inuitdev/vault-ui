import React, { PropTypes } from 'react'
import Header from '../shared/Header/Header.jsx';
import Menu from '../shared/Menu/Menu.jsx';
import styles from './home.css';
import Secrets from '../Secrets/Secrets.jsx';
import Health from '../Health/Health.jsx';
import Settings from '../Settings/Settings.jsx';
import Snackbar from 'material-ui/Snackbar';
import { green500, red500, yellow500 } from 'material-ui/styles/colors.js'
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.renderContent = this.renderContent.bind(this);
        this.state = {
            snackbarMessage: '',
            snackbarOpen: false,
            snackbarType: 'OK',
            namespace: '/'
        }
    }

    componentDidMount() {
        if (!window.localStorage.getItem('showDeleteModal')) {
            window.localStorage.setItem('showDeleteModal', 'true');
        }
        document.addEventListener("snackbar", (e) => {
            this.setState({
                snackbarMessage: e.detail.message,
                snackbarType: e.detail.type || 'OK',
                snackbarOpen: true
            });
        });

        // document.addEventListener("changedKey", (e) => {
        //     let secrets = this.state.secrets;
        //     _.find(secrets, x => x.key === e.detail.key).value = e.detail.value
        //     this.setState({
        //         secrets: secrets
        //     });
        // });

        // document.addEventListener("addedKey", (e) => {
        //     let secrets = this.state.secrets;
        //     secrets.push({ key: e.detail.key, value: e.detail.value });
        //     this.setState({
        //         secrets: secrets
        //     });
        // });

        // document.addEventListener("deleteKey", (e) => {
        //     let newSecrets = _.filter(this.state.secrets, x => x.key !== e.detail.key);
        //     this.setState({
        //         secrets: newSecrets
        //     });
        // });
    }

    renderContent() {
        switch (this.props.location.pathname) {
            case '/secrets':
                return <Secrets />
            case '/health':
                return <Health />
            case '/settings':
                return <Settings />
            default:
                return (
                    <div>
                        <h1 id={styles.welcomeHeadline}>Welcome to Vault UI.</h1>
                        <p>From here you can manage your secrets, check the health of your Vault clusters, and more.
                        Use the menu on the left to navigate around.</p>
                    </div>
                );

        }
    }

    render() {
        let messageStyle = { backgroundColor: green500 };
        if (this.state.snackbarType == 'warn') {
            messageStyle = { backgroundColor: yellow500 };
        }
        if (this.state.snackbarType == 'error') {
            messageStyle = { backgroundColor: red500 };
        }
        return <div>
            <Snackbar
                className={styles.snackbar}
                bodyStyle={messageStyle}
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                autoHideDuration={2000}
                onRequestClose={() => this.setState({ snackbarOpen: false })}
                />
            <Header />
            <Menu pathname={this.props.location.pathname} />
            <div id={styles.content}>
                {this.renderContent()}
            </div>

        </div>;
    }
}