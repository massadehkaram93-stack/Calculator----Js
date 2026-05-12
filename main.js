let myElement = document.querySelector("input");
let calcHistory = {operator: "" , result : ""};
let historyData = [] ;

function addValue (text) {
    if (myElement.value === "ERROR") {
        myElement.value = "";
    }

    if (text === ".") {
        let op1 = -1 , op2 = -1 , op3 = -1 , op = -1 , Numbers = "" , addPoint = true ;
        op1 = myElement.value.lastIndexOf("×");
        op2 = myElement.value.lastIndexOf("÷");
        op3 = myElement.value.lastIndexOf("+");
        op4 = myElement.value.lastIndexOf("-");

        index = Math.max(op1 , op2 , op3 , op4);

        if (index === -1) {
            index = 0 ;
        }

        Numbers = myElement.value.slice(index , myElement.value.length).split("");

        for (let i = 0 ; i < Numbers.length ; i++) {
            if (Numbers[i] === ".") {
                addPoint = false ;
                break;
            }
        }

        if (myElement.value.slice(-1) === "×" || myElement.value.slice(-1) === "÷" || myElement.value.slice(-1) === "+" || myElement.value.slice(-1) === "-") {
            addPoint = false ;
        }

        if (addPoint) {
            myElement.value += text + "";
        }
    }
    
    if (text !== "." && text !== "(" && text !== ")") {
        if (isNaN(Number(text))) {
            if (!isNaN(Number(myElement.value.slice(-1))) || myElement.value.slice(-1) === "(" || myElement.value.slice(-1) === ")") {
                myElement.value += text + "";
            }   
        }   else {
            myElement.value += text + "";
        }
        }

    if (text === "(" | text === ")") {
        myElement.value += text + "";
    }
}

function deleteValue (text) {
    myElement.value = text.slice(0 , -1);
}

function clearDisplay () {
    myElement.value = "";
}

window.addEventListener("keydown" , function (event) {
    switch(event.code) {
        case "Digit0": 
            if (event.shiftKey) {
                addValue(")");
            }   else {
                addValue("0");
            }
            break;
        case "Numpad0":
            addValue("0");
            break;
        case "Digit1": 
        case "Numpad1":
            addValue("1");
            break;
        case "Digit2": 
        case "Numpad2":
            addValue("2");
            break;
        case "Digit3": 
        case "Numpad3":
            addValue("3");
            break;
        case "Digit4": 
        case "Numpad4":
            addValue("4");
            break;
        case "Digit5": 
        case "Numpad5":
            addValue("5");
            break;
        case "Digit6": 
        case "Numpad6":
            addValue("6");
            break;
        case "Digit7": 
        case "Numpad7":
            addValue("7");
            break;
        case "Digit8": 
            if (event.shiftKey) {
                addValue("×");
            }   else {
                addValue("8");
            }
            break;
        case "Numpad8":
            addValue("8");
            break;
        case "Digit9": 
            if (event.shiftKey) {
                addValue("(");
            }   else {
                addValue("9");
            }
            break;
        case "Numpad9":
            addValue("9");
            break;
        case "Equal":
            if (event.shiftKey) {
                addValue("+");
            }   else {
                myElement.value = calc4(myElement.value); 
                updateHisstoryUi();
            }
            break;
        case "NumpadAdd": 
            addValue("+");
            break;
        case "Minus":
        case "NumpadSubtract": 
            addValue("-");
            break;
        case "NumpadMultiply": 
            addValue("×");
            break;
        case "Slash":
        case "NumpadDivide": 
            addValue("÷");
            break;
        case "Period":
        case "NumpadDecimal": 
            addValue(".");
            break;
        case "NumpadEnter":
        case "Enter" :
            myElement.value = calc4(myElement.value); 
            updateHisstoryUi();
            break;
        case "Backspace":
            deleteValue(myElement.value);
            break;
        case "Escape":
            clearDisplay();
            break;
    }
}) ;

function powDisplay () {
    try {
        let op1 = -1 , op2 = -1 , op3 = -1 , op4 = -1 , Numbers = "" , op = true ;
        op1 = myElement.value.lastIndexOf("×");
        op2 = myElement.value.lastIndexOf("÷");
        op3 = myElement.value.lastIndexOf("+");
        op4 = myElement.value.lastIndexOf("-");

        index = Math.max(op1 , op2 , op3 , op4);

        if (index === -1) {
            index = 0 ;
            op = false ;
        }

        if (op) {
            myElement.value = Math.pow(Number(myElement.value.slice(index , myElement.value.length)) , 2);
        } else {
            myElement.value = Math.pow(Number(myElement.value) , 2);
        }
    }   catch (error) {
        addAnimation();
        myElement.value = "ERROR";
    }
}

function modlesDisplay (text) {
    try {
        myElement.value = Number(text) / 100;
        if (myElement.value === "NaN" || myElement.value === NaN) {
            throw new Error ("error");
        }  
    }   catch (error) {
        addAnimation();
        myElement.value = "ERROR";
    }
}

function Switch () {
    try {
        if (myElement.value !== "") {
            myElement.value = myElement.value * -1 ;
        }

        if (myElement.value === "NaN" || myElement.value === NaN) {
            throw new Error ("error");
        }
        
    }   catch (error) {
        addAnimation();
        myElement.value = "ERROR";
    }
}

function useResult (result) {
    try {
        if (result !== "" && result !== NaN && result !== "NaN" && result !== "ERROR" && result !== undefined) {
            myElement.value = result ;
        }   else {
            throw new Error ("error");
        }
    }   catch (error) {
        addAnimation();
        return "ERROR";
    }
}

function addAnimation () {
    let calcolatorBody = document.getElementById("calcolator-body");
    calcolatorBody.classList.add("calcolator-body-animation-on");

    setTimeout(() => {
        calcolatorBody.classList.remove("calcolator-body-animation-on");
    }, 300);
}

function updateHisstoryUi () {
    let cardsList = document.getElementById("history-cards");
    cardsList.innerHTML = historyData.map( (card , index) => {
        return `<div class = "history-card" style = "--index:'${index+1}';" onclick = "useResult(${card.result});">
        <p> ${card.operator} <span class = "card-result">=  ${card.result}</span></p>
        </div>`
    }).join(" ");
    
    console.log(cardsList.innerHTML);
}

function RotateAnimation () {
    let Element = document.getElementById("history-btn");
    let listElement = document.getElementById("history-screen");
    if (Element.classList == "rotate-button-open") {
        Element.classList.remove("rotate-button-open");
        Element.classList.add("rotate-button-close");
        
        listElement.classList.remove("side-window-open");
        listElement.classList.add("side-window-close");

    }   else {
        Element.classList.remove("rotate-button-close");
        Element.classList.add("rotate-button-open");
        listElement.classList.remove("side-window-close");
        listElement.classList.add("side-window-open");
    }
}

function closeRotateAinmation () {
    let Element = document.getElementById("history-btn");
    Element.classList.add("rotate-button-close");   

    setTimeout(() => {
        Element.classList.remove("rotate-button-close");
    }, 300);
}

function clearHistory () {
    historyData = [] ;
    updateHisstoryUi();
}

function calc4 (text = "" , ad = false) {
    try {
        function theResult (num1 , op , num2 , adv = "") {
            switch (op) {
                case "×" : return  num1 * num2 ;  break;
                case "÷" : if (num2 !== 0) {return num1 / num2} else {throw new Error("error");}
                case "+" : return  num1 + num2 ;  break;
                case "-" : return  num1 - num2 ;  break; 
            }
        }
        
        function check (ele1 = -1 , ele2 = -1) {
            if (ele1 !== -1) {
                if (ele2 !== -1) {
                    if (ele1 > ele2) {
                        return ele2 ;
                    }   else {
                        return ele1 ;
                    }
                }  else {
                    return ele1 ;
                }
            }   else {
                if (ele2 !== -1) {
                    return ele2 ;
                }
            }
        }

        if (text === "" || text === " " || text === "ERROR" || text === NaN || text === "NaN") {
            throw new Error("error"); 
        }

        let firstIndex = -1 , lastIndex = -1 , result = 0 , temprorary = {num1: 0 , operator: "" , num2: 0} ,  
        currentNumber = "" , tempFirstIndex = -1 , tempLastIndex = -1 , Elements = [],
        countDelete = 0;

        if (typeof text == typeof "") {
            text = text.split("");
            text = text.filter( (ele) => {return ele !== " " && ele !== "" ;});
        } 
        
        for (let i = 0 ; i < text.length ; i++) {
            if (!isNaN(Number(text[i])) || text[i] === ".")  {
                currentNumber += text[i] ;
                if (i === text.length - 1) {
                    if (currentNumber !== "") {
                        Elements.push(currentNumber);
                        currentNumber = "" ;
                    }
                }   
            }   else {
                if (currentNumber !== "") {
                    Elements.push(currentNumber);
                    currentNumber = "";
                }
                Elements.push(text[i]);
            }
        }
        
        if (calcHistory.operator === "") {
            calcHistory.operator = Elements.reduce((acc , ele) => {return acc + "" + ele;});
        }   

        let openBrackets = Elements.filter(el => el === "(").length;
        let closeBrackets = Elements.filter(el => el === ")").length;
        
        if (openBrackets !== closeBrackets) {
            throw new Error("error"); 
        }
        
        while (Elements.length > 1) {
            tempFirstIndex = -1 ;
            tempLastIndex = -1;
            
            if (Elements.includes("(") && Elements.includes(")")) {
                tempFirstIndex = Elements.indexOf("(");
                tempLastIndex = Elements.lastIndexOf(")");

                countDelete = tempLastIndex - tempFirstIndex +1 ;

                Elements.splice(tempFirstIndex , countDelete , calc4(Elements.slice(tempFirstIndex+1, tempLastIndex) , true));
            
            } else if (Elements.includes("×") || Elements.includes("÷")) {
                tempFirstIndex = check(Elements.indexOf("×") , Elements.indexOf("÷")) ;
                tempLastIndex = tempFirstIndex+1;
                tempFirstIndex -= 1 ;

                temprorary.num1 = Number(Elements[tempFirstIndex]);
                temprorary.operator = Elements[tempFirstIndex+1];
                temprorary.num2 = Number(Elements[tempFirstIndex+2]);

                countDelete = tempLastIndex - tempFirstIndex +1 ;

                Elements.splice(tempFirstIndex , countDelete , theResult(temprorary.num1 , temprorary.operator , temprorary.num2).toString());

            } else if (Elements.includes("+") || Elements.includes("-")) {
                tempFirstIndex = tempFirstIndex = check(Elements.indexOf("+") , Elements.indexOf("-")) ;
                tempLastIndex = tempFirstIndex +1;
                tempFirstIndex -= 1 ;

                temprorary.num1 = Number(Elements[tempFirstIndex]);
                temprorary.operator = Elements[tempFirstIndex+1];
                temprorary.num2 = Number(Elements[tempFirstIndex+2]);

                countDelete = tempLastIndex - tempFirstIndex +1 ;

                Elements.splice(tempFirstIndex , countDelete , theResult(temprorary.num1 , temprorary.operator , temprorary.num2));
            }  
            if (tempFirstIndex === -1) {
                throw new Error ("error");
            }
        }

        if (Elements.length === 1 && ! ad) {
            calcHistory.result = Elements;
        }
        Elements = Elements.reduce( (acc , ele) => {
            return acc + " " + ele ;
        });

        if (Elements === "NaN" || Elements === NaN) {
            throw new Error ("error");
        }

        if (calcHistory.operator !== "" && calcHistory.result !== "") {
            historyData.unshift(calcHistory);
            console.log(historyData);
            calcHistory = {operator: "" , result : ""};
        }
        return Elements ;
    }   catch (error) {
        addAnimation();
        return "ERROR";
    }
}
