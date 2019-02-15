import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createMaker from './eth/maker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    const maker = await createMaker();
    await maker.authenticate();
    this.setState({ maker: maker });
  }

  address() {
    const { maker } = this.state;
    if (maker) {
      return maker.currentAddress();
    }
    return 'Connecting...';
  }

  buyDai() {
    const { maker } = this.state;
    if (maker) {
      try {
        maker.service('buyDai').buyDai(1).then(() => {
          alert('tx mined!!!!!!!!');
        })
      } catch (err) {
        alert(err.message);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {`Current address: ${this.address()}`}
          </p>
          <input
            type='number'
            onChange={amount => this.setState({ amount: amount.target.value })}
          ></input>
          <button
            onClick={() => this.buyDai()}
          >
            Buy Dai
          </button>
          <br />
          <a
            className="App-link"
            href="https://makerdao.com/documentation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dai.js docs
          </a>
        </header>
      </div>
    );
  }
}

export default App;
