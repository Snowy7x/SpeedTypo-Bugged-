import React, { useEffect, useRef, useState } from "react";

export const Preview = ({ words, userWords, inputHandler }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currText, setCurrText] = useState("");
  const [totalText, setTotalText] = useState("");
  const [tempText, setTempText] = useState("");
  const [text, setText] = useState("");
  const [numOfWords, setNumOfWords] = useState(0);

  const textRef = useRef();
  var bottomRef = useRef();

  var maxLineLetters = 81;
  var maxWords = 250;

  let changeHandler = (e) => {
    if (tempText != null) {
        setCurrText(tempText);
        inputHandler(tempText)
    } else {
      setCurrText(e.target.value);
      inputHandler(e.target.value)
    }

  };

  let AddLine = () => {
    setNumOfWords(numOfWords + maxWords);
    setCurrText(currText.replace(currentLine, ""))
 }
  

  let genText = () => {
    let finalText = "";
    let l = 0;
    var x = 0;

    for (var letterIn = numOfWords; letterIn < numOfWords + maxWords; letterIn++) {
      var letter = words[letterIn];
      finalText = finalText + letter;
      if (x < maxLineLetters) {
        x++;
      } else {
        let ind = finalText.lastIndexOf(" ");
        var tempFinal =
          finalText.substring(0, ind) +
          "\n" +
          finalText.substring(ind + "\n".length);
          var y = 1;
        while (tempFinal.split("\n")[l].length > maxLineLetters) {
          let ind = finalText.lastIndexOf(" ", finalText.lastIndexOf(" ") - y);
          tempFinal =
            finalText.substring(0, ind) +
            "\n" +
            finalText.substring(ind + "\n".length);
            y++;
        } 
          finalText = tempFinal;
        x = 0;
      l++;
      }
      
    }
    console.log(finalText);
    return finalText;
  };

  let checkForLineBreak = (val, lines, currLines) => {
    setCurrentLine(currLines[0]);
    if (currLines.length <= 1) {
        // first line:
        if (val.length >= lines[0].length) {
          val = val.substring(0, lines[0].length) + "\n";
          setTempText(val);
          AddLine()
        } else {
          setTempText(null);
        }
      } else {
        // last line:
        if (
          currLines[currLines.length - 1].length >=
          lines[currLines.length - 1].length
        ) {
          setTempText(val + "\n");
        } else {
          setTempText(null);
        }
      }
  }

  

  useEffect(() => {
    setText(genText())
  }, [words])

  let onKeyDown = (e) => {
    if (e.key === "Enter" || e.ctrlKey || e.shiftKey || e.key === "Shift" || e.key === "Return" || e.keyCode === 8 || e.keyCode === 13) {
      e.preventDefault();
      return;
    }

    console.log(e.key)

    setTempText(null);
    var enteredText = text
    var lines = enteredText.split("\n");
    var count = lines.length;

    /* for (let line of lines){
        console.log(line + " - " + line.length);
    }
 */
    let val = currText + e.key;

    var currLines = val.split("\n");

    if (e.keyCode !== 8) {
     checkForLineBreak(val, lines, currLines);
    }
  };

  return (
    <div className="preview">
      <div ref={bottomRef} className="input_text">
        {text.split("").map((letter, ind) => {
          let color = "gray";
          if ((ind + numOfWords) < userWords.length) {
            color = letter === userWords[ind + numOfWords] ? "white" : "red";
          }
          return (
            <span key={ind + numOfWords} style={{ color: color }}>
              {letter}
            </span>
          );
        })}
      </div>
      <textarea
        className="input"
        style={{ display: "none" }}
        readOnly
        value={text}
      />
      <textarea
        value={currText}
        ref={textRef}
        autoFocus
        onKeyDown={onKeyDown}
        onChange={changeHandler}
        className="input"
        placeholder={text}
      />
    </div>
  );
};
