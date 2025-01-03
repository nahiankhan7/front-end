import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Todo type based on the API response
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Define the initial state type
interface TodosState {
  isLoading: boolean;
  isError: string | null;
  data: Todo[];
}

// Initial state
const initialState: TodosState = {
  isLoading: false,
  isError: null,
  data: [],
};

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch todos");
  }
});

// Create the todos slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Something went wrong";
      });
  },
});

export default todosSlice.reducer;
