let myElement = document.querySelector("input");

function addValue (text) {
    myElement.value += text + "";
}

function deleteValue (text) {
    myElement.value = text.slice(0 , -1);
}

function clearDisplay () {
    myElement.value = "";
}

function powDisplay (text) {
    myElement.value = Math.pow(Number(text) , 2);
}

function modlesDisplay (text) {
    myElement.value = Number(text) / 100;
}

function Switch () {
    if (myElement.value !== "") {
        myElement.value = myElement.value * (-1) ;
    } 
}

function calc3 (text = "") {
    let Elements = [] ;

    let firstIndex = -1 , lastIndex = -1 , result = 0 ,
    temprorary = {num1: 0 , operator: "" , num2: 0} , temptext = [] , 
    currentNumber = "" , tempFirstIndex = -1 , tempLastIndex = -1 ; 

    text = text.split("");

    for (let i = 0 ; i < text.length ; i++) {
        if (text[i] === "" || text[i] === " ") {
            continue;
        }   else {
            Elements.push(text[i]);
        }
    }

    text = Elements ;
    Elements = [] ;
    
    for (let i = 0 ; i < text.length ; i++) {
        if (!isNaN(Number(text[i])) || text[i] === ".") {
            currentNumber += text[i] ;
            if (i === text.length -1) {
                Elements.push(currentNumber);
                currentNumber = "";
            }
        }   else if (text[i] === "(" || text[i] === "*" || text[i] === "/" || 
            text[i] === "+" || text[i] === "-") {
            if (text[i] === "(") {
                tempFirstIndex = i ;
                for (let j = i ; j < text.length ; j++) {
                    if (text[j] === ")") {
                        tempLastIndex = j ;
                        break;
                    }
                }

                currentNumber = "";
                Elements.push("(");

                for (let r = tempFirstIndex ; r < tempLastIndex ; r++) {
                    if (!isNaN(Number(text[r])) || text[r] === ".") {
                        currentNumber += text[r] ;
                        if (r === tempLastIndex -1) {
                            Elements.push(currentNumber);
                            Elements.push(")");
                            currentNumber = "";
                        }
                    }  else if (text[r] === "*" || text[r] === "/" || 
                        text[r] === "+" || text[r] === "-") {
                            Elements.push(currentNumber);
                            Elements.push(text[r]);
                            currentNumber = "" ;
                    }
                }
                i = tempLastIndex ;  
            }   else {
                Elements.push(currentNumber);
                Elements.push(text[i]);
                currentNumber = "" ;
            }
        }   
    }

    text = Elements ;
    Elements = [];

    for (let i = 0 ; i < text.length ; i++) {
        if (text[i] === "" || text[i] === " ") {
            continue;
        }   else {
            Elements.push(text[i]);
        }
    }

    while (Elements.length > 1) {
        firstIndex = -1 ;
        lastIndex = -1 ;

        for (let x = 0 ; x < Elements.length ; x++) {
            if (Elements[x] === "(") {
                firstIndex = x ;

                for (let i = firstIndex ; i < Elements.length ; i++) {
                    if (Elements[i] === ")") {
                        lastIndex = i ;
                        break;
                    }
                }
                break;
            }   else if (Elements[x + 1] === "/" || Elements[x + 1] === "*") {            
                let ontherOp = true ;

                for (let i = 0 ; i < Elements.length ; i++) {
                    if (Elements[i] === "(") {
                        ontherOp = false ;
                        break;
                    }
                }                
                
                if (ontherOp) {
                    if (Elements[x + 1] === "*" || Elements[x + 1] === "/") {
                        firstIndex = x ;
                    } 

                    for (let y = x + 1 ; y < Elements.length ; y++) {
                        if (!isNaN(Number(Elements[y]))) {
                            lastIndex = y ;
                            break;
                        }
                    }
                    break;
                }

            }   else if (Elements[x + 1] === "+" || Elements[x + 1] === "-") {
                let ontherOp = true ;

                for (let i = 0 ; i < Elements.length ; i++) {
                    if (Elements[i + 1] === "*" || Elements[i + 1] === "/" || Elements[i] === "(") {
                        ontherOp = false ;
                        break;
                    }
                }

                if (ontherOp) {
                    if (Elements[x + 1] === "+" || Elements[x + 1] === "-") {
                        firstIndex = x ;
                    } 
                    
                    for (let y = x + 1 ; y < Elements.length ; y++) {
                        if (!isNaN(Number(Elements[y]))) {
                            lastIndex = y ;
                            break;
                        }
                    }
                    break;
                }
            }    
        }

        if (Elements[firstIndex] === "(") {
            temprorary.num1 = Number(Elements[firstIndex+1]);
            temprorary.operator = Elements[firstIndex + 2];
            temprorary.num2 = Number(Elements[lastIndex-1]);
        }   else {
            temprorary.num1 = Number(Elements[firstIndex]);
            temprorary.operator = Elements[firstIndex + 1];
            temprorary.num2 = Number(Elements[lastIndex]);
        }

        switch (temprorary.operator) {
            case "*" :
                result = temprorary.num1 * temprorary.num2 ;
                break;
            case "/" :
                result = temprorary.num1 / temprorary.num2 ;
                break;
            case "+" :
                result = temprorary.num1 + temprorary.num2 ;
                break;
            case "-" :
                result = temprorary.num1 - temprorary.num2 ;
                break;
        }

        tempText = Elements ;
        Elements = [] ;

        for (let i = firstIndex ; i < lastIndex+1 ; i++) {
            if (i === lastIndex) {
                tempText[i] = result.toString();
            }   else {
                tempText[i] = "";
            }
        }

        for (let x = 0 ; x < tempText.length ; x++) {
            if (tempText[x] === "" || tempText[x] === " ") {
                continue;
            }   else {
                Elements.push(tempText[x]);
            }
        }
    }
    myElement.value = Elements ;
}    