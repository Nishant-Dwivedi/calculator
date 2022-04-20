// PSEUDO  

// write the operation functions sub, add, mult..
// on click
    // display number on screen
    // when any  operation button is clicked, the value that came before is registered as variable1
    // the value that comes next is variable2
        // if another  operation button is clicked, eval previous expression,display result,  and the reslut of that is now var1
        // next value is var 2
        // wait for click on equal and then display result

    // operation functions
        function add (a, b){
            return Number(a) + Number(b);
        }

        function substract (a, b) {
            return Number(a) - Number(b)
        }

        function divide (a, b) {
            return Number((Math.trunc((a/b)*1000))/1000)
        }

        function multiply (a, b) {
            return Number(a*b)
        }

        // function evaluate
        function evaluate (a,b,c){
            if (c == "+"){
                result = add(a, b)
                return result

            }
            else if (c == "-"){
                result = substract(a,b)
                return result
            }
            else if (c == "/"){
                if (b == 0){
                    result = "can't divide by zero"
                    return result
                }
                result = divide(a,b)
                return result
            }
            else if (c == "*"){
                result = multiply(a,b)
                return result
            }
        }

        // global variables

        let num1 = ""
        let num2 = ""
        let operation = ""
        let result = ""

        const display = document.getElementById('calcDisplay')
        
        const btn = Array.from(document.getElementsByTagName('button'))
        
        // ON BUTTON CLICK
        btn.forEach(button => button.addEventListener('click', (e) =>{
            // if clicked btn is an integer AND operation var is empty i.e it's NUM1
            if(Number.isInteger(Number(e.target.innerText)) && operation == ""){
                display.innerText += e.target.innerText
                num1 += e.target.innerText
                console.log(num1,operation, num2, result);
            }
            // if clicked btn is an integer AND OPERATION VAR is NOT empty, i.e it's num2
            else if (Number.isInteger(Number(e.target.innerText)) && operation !== ""){ 
                // clear innerText so as to display var2 without concatinating with result(?? var2 concatenates with previous result value without this step if you chain operations)
                if (display.innerText == result) {
                    display.innerText = ""
                }
                display.innerText += e.target.innerText
                num2 += e.target.innerText
                console.log(display.innerText);
            }
            // if the clicked btn represents a non integer {/, *, -, +, C or =}
            else if (!Number.isInteger(Number(e.target.innerText))){
                // clear
                if (e.target.innerText == "C"){
                    display.innerText = ""
                    num1= ""
                    num2= ""
                    operation= ""
                    result= ""
                }
                // equals; calls the evaluate function
                else if (e.target.innerText == "="){
                    evaluate(num1, num2, operation)
                    display.innerText= ""
                    display.innerText= `${result}`
                    console.log(num1,operation, num2, result);
                }
                // {-, +, /, *} sets the OPERATION var to whichever applicable/also evaluates previous expression if equal isn't clicked and operations are chained(1 + 2 + 5 + 7..)
                else {
                    // if num2 is empty, it's the first iteration. (result == empty) condition can't be used because you may chain operations without clicking equal at all,(example, 1 +2 +3 +5, result here stays empty but you still want to caluculate ((1+2) + 3) + 5)
                    if (num2 == ""){
                    display.innerText= ""
                    operation = e.target.innerText;
                    
                    } 
                    else{
                        // when equal isn't clicked and another operation is performed (ex, 1 + 2 + 5), the operator btn (/, *, -, +) is gonna have to evaluate the value of previous expression (1 + 2)
                        // and save it in num1;  num2 gets reset to empty for the forthcoming value(5, in this example)(else it'll become 25{2 is previous iteration's num2}, remember num2 is a string, gotta make it empty)
                        num1 = evaluate(num1, num2, operation)
                        num2 = ""
                        display.innerText= ""
                        operation = e.target.innerText;   
                        display.innerText= `${result}`
                        console.log(num1,operation, num2, result);     
                    }
                    
                }

            }

            
      

          
        }))


        


        