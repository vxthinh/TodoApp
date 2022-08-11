import React, { useState, useContext } from "react"
import ProjectForm from "../../Form/ProjectForm"
import firebase from "../../../firebase/config"
import { TodoContext } from "../../../context"

function RenameProject({project, setShowModal}) {
    //STATE
    const [newProjectName, setNewProjectName] = useState(project.name)
    
    // CONTEXT
    const { selectedProject, setSelectedProject } = useContext(TodoContext)

    // rename Project
    const renameProject = (project, newProjectName) => {
        const projectsRef = firebase.firestore().collection('projects')
        const todosRef = firebase.firestore().collection('todos')

        const { name: oldProject } = project
        projectsRef
            .where('name', '==', newProjectName)
            .get()
            .then( querySnapshot => {
                if(!querySnapshot.empty){
                    alert('Project with the same name already exists!')
                }else {
                    projectsRef
                        .doc(project.id)
                        .update({
                            name: newProjectName
                        })
                        .then( () => {
                            todosRef
                                .where('projectName', '==', oldProject)
                                .get()
                                .then( querySnapshot => {
                                    querySnapshot.forEach( doc => {
                                        doc.ref.update({
                                            projectName: newProjectName
                                        })
                                    })
                                })
                                .then( () => {
                                    if(selectedProject === oldProject) {
                                        selectedProject(newProjectName)
                                    }
                                })
                        })
                }
            })
    }
    
    function handleSubmit(e) {
        e.preventDefault()

        renameProject(project, newProjectName)

        setShowModal(false)
    }
    return(
        <div className="RenameProject">
            <ProjectForm
                    handleSubmit={handleSubmit}
                    heading="Edit project name!"
                    value={newProjectName}
                    setValue={setNewProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText="Confirm"
                />
        </div>
    )
}

export default RenameProject

