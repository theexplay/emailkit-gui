import React from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Builder from '../Builder/Builder';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Nav />
                <Builder />
            </div>
        )
    }
}

export default App;
