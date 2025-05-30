import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";
import { useState } from "react";

const Addtodo = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleAddtodo = () => {
    if(text.length>3){

        dispatch(addTodo(text));
        setText("");
    }else{
        alert("Pleas Fill the Text")
    }
  };
  return (
    <div>
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <div className="w-full max-w-sm mx-auto px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            onClick={handleAddtodo}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addtodo;
