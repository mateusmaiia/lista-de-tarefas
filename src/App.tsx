import { useState } from 'react'

export function App() {

  const [ input, setInput ] = useState('')
  const [ tasks, setTasks ] = useState([
    'Estudar React com TypeScrip',
    'Comprar pao de meio dia',
    'Estudar ingles a noite'
  ])

  function handleRegister(){
    if(!input){ 
      alert('Preencha o nome da sua tarefa!')   
      return;
    }

    // setTasks(tarefas => [...tarefas, input ]) forma que ele fez
    setTasks( [...tasks, input ] )  
    setInput('')  
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
      </section>
     ))}
    </>
  )
}


