import React, {createContext, useState} from 'react'
import { useTodos, useProjects, useFilterTodos, useProjectsWithStats } from '../hooks'

const TodoContext = createContext()

function TodoContextProvider({children}) {
    const defaultProject = 'today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined)

    const todos = useTodos()
    const projects = useProjects()
    const projectsWithStats = useProjectsWithStats(projects, todos)
    const filteredTodos = useFilterTodos(todos, selectedProject)
    console.log(filteredTodos)
    const value = {
        defaultProject,
        selectedProject,
        setSelectedProject,
        selectedTodo, 
        setSelectedTodo,
        todos: filteredTodos,
        projects: projectsWithStats,
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export {TodoContext, TodoContextProvider}