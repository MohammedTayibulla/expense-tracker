import React,{createContext,useReducer} from 'react'
import AppReducer from "./AppReducer"
import axios from "axios";

//initial state
const initialState={
    transactions:[],
    error:null,
    loading:true
}

//create context
export const GlobalContext=createContext(initialState);

//Provider component
export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState)

//actions
async function getTransactions(){
 try{
 const res=await axios.get('http://localhost:4000/api/transactions')
 dispatch({
    type:"GET_TRANSACTION",
    payload:res.data.data
 })
 } catch(err){
dispatch({
    type:"TRANSACTION_ERROR",
    payload:err.res.data.error
 })
 }  
}

async function addTransaction(transaction){
  const config={
    headers:{
        'Content-Type':"application/json"
    }
  }
try{
   const res= await axios.post(`http://localhost:4000/api/transactions`,transaction,config)
    dispatch({
        type:"ADD_TRANSACTION",
        payload:res.data.data
   })
 } catch(err){
dispatch({
    type:"TRANSACTION_ERROR",
    payload:err.res.data.error
 })
 }

  
}

async function deleteTransaction(id){
  try{
    await axios.delete(`http://localhost:4000/api/transactions/${id}`)
    dispatch({
        type:"DELETE_TRANSACTION",
        payload:id
   })
 } catch(err){
dispatch({
    type:"TRANSACTION_ERROR",
    payload:err.res.data.error
 })
 }
}

    return (<GlobalContext.Provider value={{
        transactions:state.transactions,
        getTransactions,
        error:state.error,
        loading:state.loading,
        addTransaction,
        deleteTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}