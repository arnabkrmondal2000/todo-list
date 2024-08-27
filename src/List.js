import React from 'react';

const List = ({list, onRemove}) => {
    return (
        <>
            <ul>
                {list.map((item,index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => {onRemove(index)}}>Remove</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default List;