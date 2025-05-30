import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  status: "idle",
  error: null,
  limit: 10,
  page: 1,
  hashMore: true,
};

export const fetchTodoList = createAsyncThunk(
  "todo/fetchTodo",
  async ({ page, limit }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    return await res.json();
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = { id: nanoid(), title: action.payload };

      state.item=[newTodo,...state.item]
    },
    removeTodo: (state, action) => {
      state.item = state.item.filter((m) => m.id !== action.payload);
    },
    incrementPage: (state) => {
      state.page += 1;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoList.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchTodoList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.item = [...state.item, ...action.payload];

      if (action.payload.length < state.limit) {
        state.hashMore = false;
      }
    });
  },
});

export const { addTodo, removeTodo, incrementPage } = todoSlice.actions;

export default todoSlice.reducer;
