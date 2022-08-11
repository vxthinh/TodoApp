import moment from 'moment'
import { useState, useEffect } from 'react'
import firebase from "../firebase/config"

export function useTodos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        // console.log("re-render useTodos")
        let unsubscribe = firebase
            .firestore()
            .collection('todos')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setTodos(data)
            })

        return () => unsubscribe()
    }, [])

    return todos
}

export function useProjects() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('projects')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const projectName = doc.data().name
                    return {
                        id: doc.id,
                        name: projectName,

                    }
                })
                setProjects(data)
            })

        return () => unsubscribe()
    }, [])

    return projects
}

export function useFilterTodos(todos, selectedProject) {
    const [filteredTodos, setFilteredTodos] = useState([])
    useEffect(() => {
        let data
        const todayDateFormated = moment().format('MM/DD/YYYY')
        if (selectedProject === 'today') {
            data = todos.filter(todo => todo.date === todayDateFormated)
        } else if (selectedProject === 'next 7 days') {
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, 'MM/DD/YYYY')
                const todayDate = moment(todayDateFormated, 'MM/DD/YYYY')
                
                const diff = todoDate.diff(todayDate, 'days')

                return diff >= 0 && diff < 7
            })
        } else if (selectedProject === 'all days') {
            data = todos
        } else {
            data = todos.filter(todo => todo.projectName === selectedProject)
        }

        setFilteredTodos(data)
    }, [todos, selectedProject])
    return filteredTodos
}

export function useProjectsWithStats(projects, todos,) {
    const [projectsWithStats, setProjectsWithStats] = useState([])
    // console.log('re-render useProjectsWithStats', {projects})
    
    useEffect(() => {
        const data = projects.map((project) => {
            return {
                ...project,
                numOfTodos: todos.filter(todo => todo.projectName === project.name && !todo.checked).length
            }
        })
        setProjectsWithStats(data)
    }, [projects, todos, ])
    return projectsWithStats
}