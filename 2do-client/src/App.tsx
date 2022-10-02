import "./App.css";
import { TodoContainer } from "./components/TodoContainer/TodoContainer";
import { TodosProvider } from "./contexts/TodosContext";

function App() {
  return (
    <div className="App">
      <TodosProvider>
        <TodoContainer />
      </TodosProvider>
    </div>
  );
}

export default App;
