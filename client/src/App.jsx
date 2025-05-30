import Addtodo from "./components/Addtodo";
import Todo from "./components/Todo";

const App = () => {
  return (
    <div className="max-w-[80%] mx-auto bg-white shadow-lg shadow-gray-900 border border-gray-600 rounded-lg overflow-hidden mt-16">
      <Addtodo />
      <Todo />
    </div>
  );
};

export default App;
