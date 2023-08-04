import { useState, useEffect } from 'react'

export function App() {

  const [ input, setInput ] = useState('')
  const [ tasks, setTasks ] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enable: false,
    task: ''
  })

  useEffect( () => {
    console.log('oi')
  }, [])

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

    localStorage.setItem("@cursoreact", JSON.stringify( [...tasks, input] ))
  }

  function handleSaveEdit(){
    const findIndexTask = tasks.findIndex( task => task === editTask.task)
    const allTasks = [...tasks]

    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setEditTask({
      enable: false,
      task: ''
    })

    localStorage.setItem("@cursoreact", JSON.stringify( [allTasks]))
  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item)
    setTasks(removeTask)

    
    localStorage.setItem("@cursoreact", JSON.stringify(removeTask))
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

     <button onClick={handleRegister}>
       {editTask.enable ? 'Atualizar tarefa' : 'Adicionar tarefa'}
     </button>

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


