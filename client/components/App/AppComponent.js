import React from 'react';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterContainer';
import styles from './App.scss';
import yeoman from '../../assets/yeoman.png';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>

      RELAY GRAPHQL SQL DEMO (based on Relay Fullstack)

      <br />
      <br />
       
          {this.props.children}
       
      </div>
    );
  }
}
