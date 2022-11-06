import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPosts, deletePosts, fetchPosts } from "./PostsAPI";

const initialState = {
  newPostTitle: "",
  newPostDescription: "",

  editMode: false,
  editId: null,

  showSneakBar: false,

  posts: [],
};

export const getPostsAsync = createAsyncThunk(
  "counter/getPosts",
  async ({ _ }, { getState, dispatch, rejectWithValue }) => {
    const response = await fetchPosts();
    return response.data;
  }
);
export const createPostsAsync = createAsyncThunk(
  "counter/createPosts",
  async ({ _ }, { getState, dispatch, rejectWithValue }) => {
    const { newPostTitle, newPostDescription } = getState().counter;

    const response = await createPosts(newPostTitle, newPostDescription);
    dispatch(setShowSneakBar({ value: true }));
    return response.data;
  }
);
export const updatePostsAsync = createAsyncThunk(
  "counter/updatePosts",
  async ({ id }, { getState, dispatch, rejectWithValue }) => {
    const { newPostTitle, newPostDescription } = getState().counter;

    const response = await createPosts(newPostTitle, newPostDescription, id);
    dispatch(setShowSneakBar({ value: true }));
    return response.data;
  }
);
export const deletePostsAsync = createAsyncThunk(
  "counter/deletePosts",
  async ({ id }, { getState, rejectWithValue, dispatch }) => {
    const response = await deletePosts(id);
    dispatch(setShowSneakBar({ value: true }));
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setNewPostTitle: (state, action) => {
      state.newPostTitle = action.payload.value;
    },
    setNewPostDescription: (state, action) => {
      state.newPostDescription = action.payload.value;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload.value;
    },
    setEditId: (state, action) => {
      state.editId = action.payload.value;
    },
    setShowSneakBar: (state, action) => {
      state.showSneakBar = action.payload.value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {})
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state, action) => {});
  },
});

export const {
  setNewPostDescription,
  setNewPostTitle,
  setEditMode,
  setEditId,
  setShowSneakBar,
} = counterSlice.actions;

export const counterState = (state) => state.counter;

export default counterSlice.reducer;
