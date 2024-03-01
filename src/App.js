import './App.css';
import randomWord from "random-words";
import {useState} from "react";
import { Preview } from './Components/Preview';

function App() {
    const [words, setWords] = useState(randomWord({exactly: 600, maxLength: 5}));
    const [userWords, setUserWords] = useState([]);



    let inputHandler = (text) => {
        let v = text.replaceAll("\n", " ")
        setUserWords(v.split(" " || "\n"));
    }

    let getWords = () => {
        return words.join(" ");
    }
    return (
        <div className="App">
            <Preview words={getWords()} userWords={userWords.join(" ")} inputHandler={inputHandler} />
        </div>
    );
}

export default App;
