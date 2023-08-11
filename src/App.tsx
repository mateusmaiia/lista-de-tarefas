import { useState, useEffect, useRef, useMemo } from 'react'

export function App() {

  const inputRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)

  const [ input, setInput ] = useState('')
  const [ tasks, setTasks ] = useState<string[]>([])

  const [editTask, setEditTask] = useState({
    enable: false,
    task: ''
  })

  useEffect( () => {
    const tarefasSalvas = localStorage.getItem("@cursoreact")

    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas))
    }
  }, [])

  useEffect( () => {
      if(firstRender.current){
        firstRender.current = false;
        return
      }

      localStorage.setItem( '@cursoreact', JSON.stringify(tasks))
  }, [tasks])

  const totalTarefas = useMemo( () => {
    return tasks.length
  }, [tasks])

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

    // localStorage.setItem("@cursoreact", JSON.stringify( [...tasks, input] ))
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

    // localStorage.setItem("@cursoreact", JSON.stringify(allTasks))
  }

  function handleDelete(item: string){
    const removeTask = tasks.filter( task => task !== item)
    setTasks(removeTask)

    
    // localStorage.setItem("@cursoreact", JSON.stringify(removeTask))
  }

  function handleEdit(item: string){
    setInput(item)

    setEditTask({
      enable: true,
      task: item
    })
    
    inputRef.current?.focus()
  }

  return (
    <>
     <h1>Lista de tarefas</h1>
     <input 
      placeholder='Digite o nome da tarefa...' 
      value={input}
      onChange={ (e) => setInput(e.target.value)}

      ref={inputRef}
     />

     <button onClick={handleRegister}>
       {editTask.enable ? 'Atualizar tarefa' : 'Adicionar tarefa'}
     </button>

     <hr />

     <strong>Você tem o total de {totalTarefas} tarefas</strong>

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


