import React, { useState } from "react";

import Modal from './Modal';
import '../css/Game.css'

// 1. Array of numbers to choose from
// 2. Changes on click - (higher or lower) Button. - Spawn a random number from array
// 3. If guessed number (ie Button: higher or lower clicked) matches [Array Number] THEN add 10 to score, otherwise Add 1 strike.
// 4. Random array number picked.. cant be 1 or 100. Will not work correctly with the higher or lower button concept.

function GameLayout() {

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    //   });

    const [score, setScore] = useState(0);
    const [strike, setStrike] = useState(0);

    //Array of numbers
    // const arrNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //     21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

    // Dispaly Random number from the Array of numbers
    // const currentNum = arrNums[Math.floor(Math.random() * arrNums.length)];

    const arrNums = [1, 2, 3, 4]
    var currentNum = arrNums[Math.floor(Math.random() * arrNums.length)];
   
    //Array Number State, (ie - the big number shown)
    const [num, setNum] = useState(0);

    //Strike array
    const strikeArr = [
        { id: 0, letter: "X", state: "strikeStart" },
        { id: 1, letter: "X", state: "strikeStart" },
        { id: 2, letter: "X", state: "strikeStart" },
    ]

    // NEXT FUNCTION - COMPARE randomNum to nextNum
    function next() {
        let index = arrNums[Math.floor(Math.random() * arrNums.length)];
        return arrNums[index];
    }

   
    var nextNum = 5;
    // FUNCTION FOR BUTTON LOWER
    function numberLower() {
        console.log('currentNum2 Star:', currentNum)

        nextNum = next();
        if (currentNum > nextNum) {
            setScore(score + 10)
            console.log('CORRECT', "CurrentNum2:", currentNum);

        } else if (currentNum === nextNum){
            console.log("PICK AGAIN:", currentNum);
        } else {
            setStrike(strike + 1);
            addStrike();
            console.log('WRONG', strike, "CurrentNum2:", currentNum);
            if (strike === 2) {
                gameOver();
            }
        }
        currentNum = nextNum;
    }

    // FUNCTION FOR BUTTON HIGHER
    function numberHigher() {
        let nextNum = next();
        if (currentNum < nextNum) {
            setScore(score + 10)
            console.log('CORRECT HIGH')
        } else {
            setStrike(strike + 1);
            addStrike();
            console.log('WRONG HIGH')
            console.log(strike)
            if (strike === 2) {
                gameOver();
            }
        }
    }

    // FUNCTION AND INFO FOR ADDING A STRIKE
    const [cards, setCards] = useState(strikeArr);
    var testArr = [0, 1, 2];

    function addStrike() {
        for (let i = 0; i < testArr.length; i++) {
            if (testArr[strike] === cards[i].id) {
                cards[i].state = 'strikeoutRed'
            } else if (strike === 2) {
                gameOver();
            } else {
                // cards[i].state = 'strikeStart'
            }
        }
    }

    //////////////// GAME OVER //////////////////////////
    function gameOver() {
        var modalGameOver = document.getElementById("myModal");
        // If modalWin exists run code.
        if (modalGameOver !== null) {
            setTimeout(function () {
                modalGameOver.style.display = "block";
            }, 500)
        }
    }


    return (
        <div className="GameContainer">

            <div className="section-1">
                {/* <h1 className="arrNumber">{currentNum}</h1> */}
                <h1 className="arrNumber">{currentNum}</h1>

                <h3>{num}</h3>
                <h3>The next number will be...</h3>
            </div>

            <Modal />

            <div className="section-2">

                <div className="stats-holder">
                    {/* STRIKES CONTAINER */}
                    <div className="stats1">
                        <button className="btnHigher" onClick={numberHigher}>HIGHER</button>
                        <h3 className="h3words">Strikes</h3>

                        {/* LOOP THROUGH THE STRIKES */}
                        <div className="strikeBox">
                            {cards.map((num, i) => {
                                return (
                                    <div className={num.state} key={num.id}>
                                        <h1 className="strikeStart">{num.letter}</h1>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SCORE CONTAINER */}
                    <div className="stats2">
                        <button className="btnLower" onClick={numberLower}>LOWER</button>
                        {/* <button className="btnLower" onClick={addStrike}>Test</button> */}

                        <h3 className="h3words">Score</h3>
                        <h3>{score}</h3>

                    </div>
                </div>


            </div>


        </div>
    );
}

export default GameLayout;
