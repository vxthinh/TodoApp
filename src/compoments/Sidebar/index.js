import React, {useContext, useRef, useEffect} from "react"
import { TodoContext } from '../../context'


function Sidebar({children}) {
    //CONTEXT
    const {selectedTodo, setSelectedTodo } = useContext(TodoContext)
    //REF
    const sidebarRef = useRef()

    //SIDE EFFECT
    useEffect(() => {
        console.log('re-redenr sidebar')
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    },[selectedTodo])

    const handleClick = e => {
        if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)) {
            //console.log(e.target)
            setSelectedTodo(undefined)
        }
    }
    return(
        <div className="Sidebar" ref={sidebarRef}>
            { children }
        </div>
    )
}

export default Sidebar

