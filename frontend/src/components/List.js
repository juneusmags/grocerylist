import React from 'react'
import Button from 'react-bootstrap/Button'
const List = ({id, list, clearList, removeItem, editItem}) => {
  return (
    <>
        <h2>List</h2>
        {list.map((item)=>{
            return (
                <div key = {item.id}  className='d-flex justify-content-between'>
                    <h4>{item.title}</h4>
                    <div>
                        <Button onClick = {()=>editItem(item.id)}>Edit</Button>
                        <Button variant = "danger" className = "ms-2" onClick = {() => removeItem(item.id)}>Delete</Button>
                    </div>
                    
                </div>
            )
        })}
        <Button variant = "danger" onClick = {clearList}>Clear Items</Button>
    </>

  )
}

export default List