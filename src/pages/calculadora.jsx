import styles from "./calculadora.module.css"
import {useState} from "react";

export const Calculadora = () =>{

    const [displayValue, setValue] = useState('')
    const [resultado, setResultado] = useState(false)
    function handleChange(value){
        if(resultado){
            setValue(String(value))
            setResultado(false)
        }else{
            setValue(current => current + value)
        }
    }
    function handleSignals(value){
        const checarOperador = ["+", "-", "/", "*"].some(op => displayValue.includes(op))

        if(!checarOperador && displayValue !== ""){
            setValue(current => current + value)
            setResultado(false)
        }
    }
    function mostrarResultado(){
        const operador = ["+", "-", "/", "*"].find(op => displayValue.includes(op))
        if(!operador) return
        const [a, b] = displayValue.split(operador)
        if(a === "" || b === "") return
        setValue(String(calcular(operador, Number(a), Number(b))))
        setResultado(true)
    }
    function limparResultado(value){
        setValue(value)
        setResultado(false)
    }
    function calcular(operacao, a, b){
        if(operacao === "+") return a + b
        else if(operacao === "-") return a - b
        else if(operacao === "*") return a * b
        else if(operacao === "/") return b === 0 ? "Erro" : a / b
    }
    return(
        <>
            <div className={styles["container"]}>
                <h1>Calculadora DIO.me</h1>
                <div className={styles["calculadora"]}>
                    <div className={styles["display"]}>
                        <h3>{displayValue}</h3>
                    </div>
                    <div className={styles["buttons"]}>
                        <div className={styles["numbers"]}>
                            <button key="0" onClick={() => handleChange(0)}>0</button>
                            <button key="1" onClick={() => handleChange(1)}>1</button>
                            <button key="2" onClick={() => handleChange(2)}>2</button>
                            <button key="3" onClick={() => handleChange(3)}>3</button>
                            <button key="4" onClick={() => handleChange(4)}>4</button>
                            <button key="5" onClick={() => handleChange(5)}>5</button>
                            <button key="6" onClick={() => handleChange(6)}>6</button>
                            <button key="7" onClick={() => handleChange(7)}>7</button>
                            <button key="8" onClick={() => handleChange(8)}>8</button>
                            <button key="9" onClick={() => handleChange(9)}>9</button>
                            <button onClick={limparResultado}>C</button>
                        </div>
                        <div className={styles["actions"]}>
                            <button key="=" onClick={mostrarResultado}>=</button>
                            <button key="+" onClick={() => handleSignals("+")}>+</button>
                            <button key="-" onClick={() => handleSignals("-")}>-</button>
                            <button key="*" onClick={() => handleSignals("*")}>*</button>
                            <button key="/" onClick={() => handleSignals("/")}>/</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}