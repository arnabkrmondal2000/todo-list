import React, { useState,useEffect } from 'react';
import List from './List'
import './Todo.css';

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [list, setList] = useState([]);

    //Load Todo List from local storage on component mount

    useEffect(() => {
        const storeTodo = JSON.parse(localStorage.getItem("list"));
        console.log("storeTodo======>", storeTodo);
        
        if(storeTodo) {
            setList(storeTodo);

            console.log("list data====>", list);
            
        }
    }, []);

    //add item to the local storage
    useEffect(() => {
        console.log("Saving to localStorage:", list);
        if(list.length > 0) {
            localStorage.setItem("list", JSON.stringify(list))
        }
    }, [list]);

    const handleChange = (e) => {
        setInputData(e.target.value)
    }

    const createList = () => {
        if(inputData.trim() !== '' && isNaN(inputData)) {
            setList([...list, inputData.trim()]);
            setInputData('');
        } else {
            alert('Please enter a valid todo data');
        }
    }
    console.log('list======>', list);

    const removeItem = (index) => {
        const conformation = window.confirm('Are you sure to delete this item?');
        if(conformation) {
            const newList = list.filter((_,idx) => idx !== index);
            setList(newList);
        }
    }

    const clearAll = () => {
        const conformation = window.confirm('Are you sure to delete all list item?');
        if(conformation) {
            setList([]);
            localStorage.removeItem('list');
        }
    }
    
    return (
        <>
        <div className='.todo-container'>
         <h1>Todo List</h1>
         <div className='input-container'>
            <input type='text' placeholder='Write todo here' value={inputData} onChange={handleChange}/>
            <button onClick={createList}>Add Todo</button>
         </div>

         {/* <ul>
            {list.map((item,index) => (
                <li key={index}>
                    {item}
                    <button onClick={() => {removeItem(index)}}>Remove</button>
                </li>
            ))}
         </ul> */}

         <List list = {list} onRemove = {removeItem}/>
          {list.length>0 ? <button onClick={clearAll}>Clear All</button> : ''}
         </div>
        </>
    )
}

export default Todo;