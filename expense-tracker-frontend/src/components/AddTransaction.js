import React,{useState} from 'react'
import {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'


const AddTransaction = () => {
    const [text,setText]=useState('');
    const [amount,setAmount]=useState(0);

    const {addTransaction} =useContext(GlobalContext);

    const submitForm=(e)=>{
    e.preventDefault();
    const newTransaction={
        id:Math.floor(Math.random()*1000000),
        text,
        amount:+amount
    }
    addTransaction(newTransaction);
}
    return (
    <div>
      <h3>Add new Transaction</h3>
      <form onSubmit={submitForm}>
        <div className='form-control'>
            <label htmlFor="text">Text</label>
            <input type="text"  placeholder="Enter text..." value={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label htmlFor="amount">Amount<br />
            (negative - expense , positive - income)
            </label>
            <input type="number" placeholder="Enter amount..."  value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>
        <button className='btn'>Add Transaction</button>

      </form>
    </div>
  )
}

export default AddTransaction
