import React, {Component} from 'react';
import './App.css';
import logo from '../logo.svg';
import Letter from '../Letter/Letter.js'
import Keyboard from '../Keyboard/Keyboard.js'
import Counter from '../Counter/Counter.js'

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const words = ["joystick", "false", "vegetarian", "organisation", "tenant", "fascinate",
    "soft", "neighborhood", "goat", "straw", "sin", "monster",
    "loot", "pierce", "area", "applied", "honest",
    "panic", "tap", "tasty"];

class App extends Component {
    state = {
        letters: App.generateWords(),
        keyboard: App.generateKeyboard(),
        selection: [],
        gameState: "En cours",
    };

    static generateWords() {
        const result = [];
        let oneWord = Math.floor(Math.random() * words.length);
        oneWord = words[oneWord]
        const word = oneWord.split('');
        while (word.length > 0) {
            const letter = word.shift();
            result.push(letter)
        }
        return result
    }

    static generateKeyboard() {
        const result = [];
        const size = 26;
        const allLetters = alphabet.split('');
        while (result.length < size) {
            const letter = allLetters.shift();
            result.push(letter)
        }
        return result
    }

    getFeedback(letter) {
        const {selection} = this.state;
        return selection.includes(letter)
    }

    handleClick = (letter) => {
        const {selection, gameState} = this.state;
        if (gameState === "En cours") {
            this.setState({selection: [...selection, letter]}, this.gameState)
        }
    };

    newGame = () => {
        this.setState({selection: [], letters: App.generateWords(), gameState: "En cours"})
    };

    trying = () => {
        const {letters, selection} = this.state;
        return selection.filter(el => !letters.includes(el)).length
    };

    gameState = () => {
        const {letters, selection} = this.state;
        const lastTests = 10 - this.trying();
        const findWord = letters.filter(elt => selection.includes(elt)).length === letters.length;
        if (lastTests > 0 && findWord) {
            this.setState({gameState: "Gagnée"})
        } else if (lastTests > 0) {

        } else {
            this.setState({gameState: "Perdue"})
        }
    };

    render() {
        const {letters, keyboard} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>Application créée avec <a className="App-link" href="https://reactjs.org" target="_blank"
                           rel="noopener noreferrer">React</a>
                    </p>
                </header>
                <div className="header">
                    <h1 className="title">Jeu du pendu</h1>
                    <button className="btn" onClick={this.newGame}>Nouvelle partie</button>
                </div>
                <div className="game">
                    <div className="content">
                        {letters.map((letter, index) => (
                            <Letter
                                letter={letter}
                                feedback={this.getFeedback(letter) ? "visible" : "hidden"}
                                key={index}
                            />
                        ))}
                    </div>
                    <Counter
                        counter={this.trying()}
                        gameState={this.state.gameState}/>
                </div>
                <div className="keyboard">
                    {keyboard.map((letter, index) => (
                        <Keyboard
                            letter={letter}
                            key={index}
                            onClick={this.handleClick}
                            feedback={this.getFeedback(letter) ? "gray" : "#282c34"}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default App;
