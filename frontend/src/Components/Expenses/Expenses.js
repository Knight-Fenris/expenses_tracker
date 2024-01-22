import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../Styles/Layout'
import { useGlobalContext } from '../../Context/globalContext'
// import Form from '../Form/Form'
import ExpenseItem from './ExpenseItem'
import Expenseform from './Expenseform'
function Expenses() {
  const {addExpense,expenses, getExpense, deleteExpense, totalExpense} = useGlobalContext()
  
  useEffect(()=>{
    getExpense()
  },[])
  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className='total-expense'>Total Expense: <span>${totalExpense()}</span></h2>
			<div className="expense-content">
				<div className="form-container">
          <Expenseform/>
        </div>
				<div className="expenses">
          {expenses.map((Expense) =>{
            const{_id,title,amount,date,category,description,type} = Expense;
            return <ExpenseItem
            key={_id}
            id={_id}
            title={title}
            description={description}
            amount={amount}
            date={date}
            category={category}
            indicatorColor="var(--color-red)"
            deleteItem={deleteExpense}
            type={type}
            />
          })}
					
				</div>
			</div>
      </InnerLayout>
    </ExpensesStyled>
  )
}

const ExpensesStyled = styled.div`
  display: flex;
  overflow: auto;
  /* zoom:75%; */
  .total-expense{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
    border-radius: 20px;
    margin:1rem 0;
    padding:1rem;
    font-size: 2rem;
    gap:.5rem;
    span{
      font-size:2.5rem;
      font-weight: 800;
      color: var(--color-red);
    }
  }
  .expense-content{
    display: flex;
    gap:2rem;
     .expenses{
      flex:1;
    } 
  }
`;

export default Expenses
