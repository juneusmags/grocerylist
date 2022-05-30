import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { useState } from 'react';
import Button  from 'react-bootstrap/Button';
import List from './components/List';
import Alert from './components/Alert';
import { useEffect } from 'react';

const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
 }

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show : false,
    msg : '',
    type : ''
  })
  
  



  const submitHandler = (e) => {
    e.preventDefault()
    console.log("hello")
    if(name.length === 0){
      // DISPLAY ALERT
      showAlert(true, 'Please enter a value', 'danger')

    }
    else if(name && isEditing){
      //DEAL WITH EDIT

      setList(list.map((item)=>{
        if(item.id === editId){
          return {...item, title : name}
          
        }
        return item
      }))
      
      setName('')
      setEditId(null)
      setName('')
      showAlert(true, "Update successful!", "success")
    }
    else{
      //SHOW ALERT
      showAlert(true, 'Item was added to your list!', 'success')
      // ADD ITEM

      const newItem = {id : new Date().getTime().toString(), title : name}
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
  showAlert(true, "Items are cleared!", "danger")
  setList([])
  }


  const removeItem = (id) => {
    setList(list.filter((item)=> item.id !== id))
  }


  const editItem = (id) => {
    const specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)

  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list])
  return (
    <>

        <Card>
          <Card.Body>
              <div>
                    <h1>Grocery List</h1>
                    <form onSubmit={submitHandler}>
                      {alert.show && <Alert {...alert} removeAlert = {showAlert} list = {list}/>}
                      <Form.Label htmlFor="inputPassword5">Items</Form.Label>
                      <Form.Control type="text" value = {name} onChange = {(e)=>{setName(e.target.value)}} />
                      <Button type ="submit">{isEditing ? "Edit" : "Add"}</Button>
                    </form>
                  </div>
          </Card.Body>
        </Card>
        {list.length > 0 && <List list = {list} clearList = {clearList} removeItem = {removeItem} editItem = {editItem}/>}
        
        
  
    
    </>
  );
}

export default App;
