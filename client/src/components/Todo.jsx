import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodoList,
  removeTodo,
  incrementPage,
} from "../features/todoSlice";

const Todo = () => {
  const dispatch = useDispatch();
  let ref = useRef(null);
  const { item, status, error, limit, page, hashMore } = useSelector(
    (status) => status.todo
  );

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchTodoList({ limit, page }));
      console.log("load");
    }
  }, [status, page, limit, dispatch]);

  // if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && status !== "loading" && hashMore) {
          dispatch(incrementPage());
        }
      },
      { threshold: 1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hashMore, status, dispatch]);

  return (
    <>
      <ul className="divide-y divide-gray-200 px-4">
        {item.map((item) => (
          <li key={item?.id} className="py-4 px-2">
            <div className="flex items-center relative">
              <label className="ml-3 block text-gray-900 w-[70%] truncate overflow-hidden">
                <span className="text-lg font-medium">{item?.title}</span>
              </label>
              <button
                onClick={() => dispatch(removeTodo(item?.id))}
                className="absolute right-2 bg-red-600  rounded-md px-2 py-1 text-white cursor-pointer"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
        <div ref={ref} className="h-20">
          {status === "loading" && (
            <p className="animate-pulse text-center">Loading...</p>
          )}
        </div>

        {/* {hashMore && status !== "loading" && (
          <button
            className="cursor-pointer bg-blue-600 px-2 py-1 text-white rounded-md my-2"
            onClick={() => dispatch(incrementPage())}
          >
            Load more
          </button>
        )} */}
      </ul>
    </>
  );
};

export default Todo;
