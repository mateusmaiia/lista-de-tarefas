import { useState } from 'react'

export function App() {

  const [ input, setInput ] = useState('')
  const [ tasks, setTasks ] = useState([
    'Estudar React com TypeScrip',
    'Comprar pao de meio dia',
    'Estudar ingles a noite'
  ])

  const [editTask, setEditTask] = useState({
    enable: false,
    task: ''
  })

  function handleRegister(){
    if(!input){ 
      alert('Preencha o nome da sua tarefa!')   
      return;
    }

    if(editTask.enable){
      handleSaveEdit();
      return;
    }

    // setTasks(tarefas => [...tarefas, input ]) forma que ele fez
    setTasks( [...tasks, input ] )  
    setInput('')  
  }

  function handleSaveEdit(){
    const findIndexTask = tasks.finIndex( task => task === editTask.task)
    const allTasks = [...tasks]

    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setEditTask({
      enable: false,
      task: ''
    })
  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item)
    setTasks(removeTask)
  }

  function handleEdit(item: string){
    setInput(item)

    setEditTask({
      enable: true,
      task: item
    })
  }

  return (
    <>
     <h1>Lista de tarefas</h1>
     <input 
      placeholder='Digite o nome da tarefa...' 
      value={input}
      onChange={ (e) => setInput(e.target.value)}
     />

     <button onClick={handleRegister}>Adicionar tarefa</button>

     <hr />

     {tasks.map( (item, index) => (
      <section key={item}>
        <span>{item}</span>

        <button onClick={() => handleEdit(item)}>Editar</button>
        <button onClick={() => handleDelete(item)}>Excluir</button>
      </section>
     ))}
    </>
  )
}


