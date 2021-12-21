import {useState} from 'react';

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const utilities = ["AC", "±", "%"];
const operatorsArray = ["÷", "×", "−", "+", "="];



function App() {
  
  /***********************************************************/
  const operators = operatorsArray.map((op) => {
    return (
      <button key={op} className="op" onClick={() => chooseOperation(op)}>
        {op}
      </button>
    );
  });
  
  const displayDigits = () => {
    let temp = [];
  
    for (let i = 0; i < digits.length; i++) {
      temp.push(<button key={i} onClick={()=>updateValue(digits[i])} >{digits[i]}</button>);
    }
    return temp;
  };
  
  const displayUtilities = () => {
    let temp = [];
  
    for (let i = 0; i < utilities.length; i++) {
      temp.push(<button key={utilities[i]} onClick={()=>updateValue(utilities[i])}>{utilities[i]}</button>);
    }
    return temp;
  };
  
  /***********************************************************/
  const [value, setValue] = useState(0);
  const [operation,setOperation] = useState("");
  const [temp,setTemp] = useState(""); // use to check which operator is pressed
  const [operand1,setOperand1] = useState(0);
  
  
  const updateValue = (newValue) => {
    let newString;


    /* update Value*/
    if (value == 0){
      setValue(newValue.toString());
    }
    else{ // any value other than starting point of 0
      newString = value.toString();
      newString = newString.concat(newValue);
      setValue(newString);
    }

    /* update to decimal (.)*/
    if (newValue === "." ){
      if (value == 0){
        setValue(".");
      }
      else if (value.toString().includes(".")){
        newString = value;
        setValue(newString);
      }
      else{
        newString = value.toString();
        newString = newString.concat(newValue);
        setValue(newString);
  
      }
    }

    /* limit the number of digits */
    if (value.length >= 6) {
      setValue(value.substring(0,6));
    }
    ////////////////////////////////////


    /* update utilities (AC,%,+/-)*/
    
    if (newValue === "AC"){
      setValue(0);
    }
    else if (newValue === "%"){
      setValue((parseFloat(value)/100).toString());
      
    }
    else if (newValue === "±"){
      if(value.toString().includes("-")){
        let positive = value.substring(1,);
        setValue(positive);
      }
      else{
        let negative = "-";
        negative = negative.concat(value);
        setValue(negative);
      }
    }

    /*  setting the two operands for calculation */
    if (operation !== ""){
      setTemp(operation);
      setValue(newValue);
      setOperation("");
    }

  }


  /***********************************************************/
  const chooseOperation = (operator) => {
    /* update operation (+,-,x,/) */

    if(operator === "÷"){
      setOperation(operator);
      setOperand1(value);
     }
    else if(operator === "×") {
      setOperation(operator);
      setOperand1(value);
    }
    else if (operator === "−"){
      setOperation(operator);
      setOperand1(value);
    }
    else if (operator === "+"){
      setOperation(operator);
      setOperand1(value);
    }
    else if (operator === "="){
      calculateResult();
    }

    setTemp("");
  }
  
   /***********************************************************/
    const calculateResult = () => {
      
      let leftValue = parseFloat(operand1); //left operand
      let rightValue = parseFloat(value);  //right operand
    
      if (temp === "÷"){
        setValue((leftValue/rightValue).toString().substring(0,7));
        
      }
      else if (temp === "×"){
        setValue((leftValue*rightValue).toString().substring(0,7));
      }
      else if (temp === "−"){
        setValue((leftValue-rightValue).toString().substring(0,7));
      }
      else if (temp === "+"){
        setValue((leftValue+rightValue).toString().substring(0,7));
      }

    }
   /***********************************************************/

  return (
    <div className="App">
      
      <div className="calculator">
      
        <div className="result">
          <span> {value} </span>
        </div>

        <div className="grid">
          <div className="left-panel">
            <div className="utilities">{displayUtilities()}</div>

            <div className="digits">{displayDigits()}</div>

            <div className="bottom-panel">
              <button key="digit0" className="digit-0" onClick={()=>updateValue(0)}>
                0
              </button>
              <button key="." className="decimal" onClick={()=>updateValue(".")}>
                {" "}
                .{" "}
              </button>
            </div>
          </div>

          <div className="right-panel">{operators} </div>
        </div>
      </div>
    </div>
  );
}

export default App;


