import './App.css';
import Sidebar from './compoments/Sidebar'
import User from './compoments/Sidebar/user/User'
import AddNewTodo from './compoments/Sidebar/addnewtodo/AddNewTodo';
import Calendar from './compoments/Sidebar/calendar/Calendar'
import Projects from './compoments/Sidebar/projects/Projects'
import Main from './compoments/Main'
import Todos from './compoments/Main/todos/Todos'
import EditTodo from './compoments/Main/edit/EditTodo'

function App() {
  return (
    <div className="App">
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;
