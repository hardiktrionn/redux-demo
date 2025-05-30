import Addtodo from "./components/Addtodo";
import Todo from "./components/Todo";

const App = () => {
  return (
    <div className="h-screen">
      <div className="h-[20%]">
        <Addtodo />
      </div>
      <div className="h-[80%] overflow-y-auto">
        <Todo />
      </div>
    </div>
  );
};

export default App;
