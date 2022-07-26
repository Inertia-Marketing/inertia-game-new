

import React, { useState, useEffect } from "react";
import logo from '../logo.svg';

import Modal from './Modal';
import '../css/Game.css'

// 1. Array of numbers to choose from
// 2. Changes on click - (higher or lower) Button. - Spawn a random number from array
// 3. If guessed number (ie Button: higher or lower clicked) matches [Array Number] THEN add 10 to score, otherwise Add 1 strike.
// 4. Random array number picked.. cant be 1 or 100. Will not work correctly with the higher or lower button concept.


///////// CODE NEED TO FIGURE OUT STILL////////
// Add {bigNum} to array1
// on click button: Higher/Lower add {bigNum} to array2 
// compare {bigNum} from array1 to array2.
// IF guessed {bigNum} from array2 is lower than array 1, then add 10. 


function GameLayout() {

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    //   });

    const [score, setScore] = useState(0);

    //Array Number State, (ie - the big number shown)
    const [num, setNum] = useState(0);

    const [strike, setStrike] = useState(0);

    //Array of numbers
    const arrNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

    // Dispaly Random number from the Array of numbers
    const bigNum = arrNums[Math.floor(Math.random() * arrNums.length)];

    //Strike array
    const strikeArr = [
        { id: 0, letter: "X", state: "strikeStart" },
        { id: 1, letter: "X", state: "strikeStart" },
        { id: 2, letter: "X", state: "strikeStart" },
    ]

    const arr1 = []
    
    // FUNCTION FOR BUTTON LOWER
    function numberLower() {
        const previous = console.log("bigNUM1: ",bigNum)
        if (bigNum < previous) {
            setScore(score + 10)
        } else {
            setStrike(strike + 1);
            addStrike();
            console.log(strike)
            if (strike === 2) {
                gameOver();
            }
            console.log("LOOPS: ", strike);
        }
    }


    // FUNCTION FOR BUTTON HIGHER
    function numberHigher() {
        if (bigNum > bigNum) {
            setScore(score + 10)
        } else {
            setStrike(strike + 1);
            addStrike();
            console.log(strike)
            if (strike === 2) {
                gameOver();
            }
            console.log("LOOPS: ", strike);
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
                // cards[i].state = 'text1'
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

    // TEST TEST TEST TEST TEST TEST TEST
    // function convertToRoman(pNumber) {
    //     var array = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    //     //bigNum

    //        for (var i = 0; i < array.length; i++) {
    //         if (pNumber > array[i]) {
    //           return array[i]; 
    //         }; 
    //      } 
    //   }
    //   console.log(convertToRoman(1000));

    return (
        <div className="GameContainer">

            <div className="section-1">
                <h1 className="arrNumber">{bigNum}</h1>
                <h3 className="arrNumber2">{bigNum}</h3>
                <h3>The next number will be...</h3>
            </div>

            <Modal />

            <div className="section-2">

                <div className="stats-holder">
                    {/* STRIKES CONTAINER */}
                    <div className="stats1">
                        <button className="btnHigher" onClick={numberHigher}>HIGHER</button>
                        <h3 className="h3words">Strikes</h3>
                        {/* <h3>{strike}</h3> */}

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
