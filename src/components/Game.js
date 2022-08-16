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

    //Array Number State, (ie - the big number shown)
    const [number, setNumber] = useState(0);

    //Array of numbers
    // const arrNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //     21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

    // Dispaly Random number from the Array of numbers
    const arrNums = [1, 2, 3, 4]
    var currentNumber = arrNums[Math.floor(Math.random() * arrNums.length)];
    var nextNumber = 4;

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


    // FUNCTION FOR BUTTON HIGHER //////////////////////////////////
    function numberHigher() {
        nextNumber = next();
        //setNumber(currentNumber);
        //if (currentNumber < nextNumber) {
        if (currentNumber < nextNumber) {
            setScore(score + 10)
            console.log('CORRECT HIGH', 'CurrentNum2:', currentNumber);
        } else if (currentNumber === nextNumber) {
            console.log("PICK AGAIN HIGH:", currentNumber);
        } else {
            setStrike(strike + 1);
            addStrike();
            console.log('WRONG STRIKE HIGH:', strike, "CurrentNum2:", currentNumber);
        }
        currentNumber = nextNumber;
    }

    // FUNCTION FOR BUTTON LOWER //////////////////////////////////
    function numberLower() {
        nextNumber = next();
        
        console.log('CurrentNumber:', currentNumber);
        if (currentNumber > nextNumber) {
            setScore(score + 10)
            //console.log('CORRECT', "CurrentNumber:", currentNumber);

        } else if (currentNumber === nextNumber) {
            console.log('SAME:', 'currentNumber:', currentNumber, 'nextNumber:', nextNumber);
            nextNumber = next();
            console.log('SAME:', 'currentNumber:', currentNumber, 'nextNumber:', nextNumber);
        } else {
            setStrike(strike + 1);
            // addStrike();
            //console.log('WRONG STRIKE:', strike, "CurrentNumber:", currentNumber);
        }
        currentNumber = nextNumber;
        // console.log('nextNumber:', nextNumber);
        // setNumber(currentNumber);
    }

    // FUNCTION AND INFO FOR ADDING A STRIKE ////////////////////////
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


    // function randomUniqueNum(range, outputCount) {

    //     let arr = []; 
    //     for (let i = 1; i <= range; i++) {
    //         arr.push(i)
    //     }

    //     let result = [];

    //     for (let i = 1; i <= outputCount; i++) {
    //         const random = Math.floor(Math.random() * (range - i));
    //         result.push(arr[random]);
    //         arr[random] = arr[range - i];
    //     }

    //     return result;
    // }
    // console.log(randomUniqueNum(4,4))



    return (
        <div className="GameContainer">

            <div className="section-1">
                <h1 className="arrNumber">{currentNumber}</h1>
                {/* <h2>{number}</h2> */}
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

                        <h3 className="h3words">Score</h3>
                        <h3>{score}</h3>

                    </div>
                </div>


            </div>


        </div>
    );
}

export default GameLayout;