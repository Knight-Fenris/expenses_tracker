import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {useGlobalContext} from '../../Context/globalContext';
import Button from '../Button/Button';
import {plus} from '../utils/icons';


function Expenseform() {
    const {addExpense, getExpense,error,setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title:'',
        amount:'',
        category:'',
        description:'',
        date:''
    })

    const { title,amount,category,description,date } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]:e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        getExpense()
        setInputState({
            title:'',
            amount:'',
            category:'',
            description:'',
            date:''
        })
    }
    return (
        <ExpenseformStyled onSubmit ={handleSubmit}>
            {error && <p className='error'>{error}</p>}
        <div className="input-control">
            <input type="text"
            value = {title}
            name = {'title'}
            placeholder='Expense Title'
            onChange={handleInput('title')}
            />
        </div>
        <div className="input-control">
            <input type="number"
            name = {'amount'}
            value = {amount}
            placeholder='Expense Amount'
            onChange={handleInput('amount')}
            />
        </div>
        <div className="input-control">
            <DatePicker id = 'date'
                placeholderText='Enter A Date'
                selected={date}
                dateExpenseformat="dd-MM-yyyy"
                onChange={(date) => {
                    setInputState({...inputState, date: date})
                }}
                
            >
            </DatePicker>
        </div>
        <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
        </div>
        <div className="input-control">
            <textarea name = 'description' value = {description} placeholder='Add a Reference' id='description' cols='30' rows='4' onChange = {handleInput('description')}></textarea>
        </div>
        <div className="submit-btn">
            <Button
            name = {'Add Expense'}
            icon = {plus}
            bPad = {'.8rem 1.6rem'}
            bRad = {'30px'}
            bg = {'var(--color-accent)'}
            color = {'#fff'}
            />
        </div>
        </ExpenseformStyled>
    )
}

const ExpenseformStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        width:100%;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        width:100%;
        
    }

    .selects{
        /* display: flex;
        justify-content: flex-end; */
        select{ 
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-red) !important;
            }
        }
    }
`

export default Expenseform
