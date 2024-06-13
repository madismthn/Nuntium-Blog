import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const API_URL = "https://66082afaa2a5dd477b14181d.mockapi.io/posts";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async () => {
    const response = await fetch(`${API_URL}/articles`);

    if (!response.ok) {
      throw "Ошибка при получении статей";
    }

    return await response.json();
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/getArticle",
  async (id) => {
    const response = await fetch(`${API_URL}/articles/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw "Ошибка при удалении статьи";
    }

    return await response.json();
  }
);

export const addNewArticle = createAsyncThunk(
  "articles/addNewArticle",
  async (newArticle) => {
    const response = await fetch(`${API_URL}/articles`, {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw "Ошибка при создании статьи";
    }

    return await response.json();
  }
);

export const editArticle = createAsyncThunk(
  "articles/editArticle",
  async (editedArticle) => {
    const response = await fetch(`${API_URL}/articles/${editedArticle.id}`, {
      method: "PUT",
      body: JSON.stringify(editedArticle),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw "Ошибка при редактировании статьи";
    }

    return await response.json();
  }
);

export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async (article) => {
    const updatedArticle = { ...article, liked: !article.liked }; // Создаем новый объект с измененным свойством liked

    const response = await fetch(`${API_URL}/articles/${updatedArticle.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedArticle),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw "Ошибка при редактировании статьи";
    }

    return await response.json(); // Возвращаем обновленный пост
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getArticles
    builder.addCase(getArticles.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // deletePost
    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const deleteArticle = action.payload.id;

      state.list = state.list.filter((article) => {
        return article.id !== deleteArticle;
      });

      state.loading = false;
      state.error = null;
    });

    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // addNewPost
    builder.addCase(addNewArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addNewArticle.fulfilled, (state, action) => {
      state.list.push(action.payload);

      state.loading = false;
      state.error = null;
    });

    builder.addCase(addNewArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // editPost
    builder.addCase(editArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(editArticle.fulfilled, (state, action) => {
      const editedArticle = action.payload;

      state.list = state.list.map((article) => {
        if (article.id === editedArticle.id) {
          return editedArticle;
        }

        return article;
      });

      state.loading = false;
      state.error = null;
    });

    builder.addCase(editArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // likePost
    builder.addCase(likeArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(likeArticle.fulfilled, (state, action) => {
      const likedArticle = action.payload;

      state.list = state.list.map((article) => {
        if (article.id === likedArticle.id) {
          return likedArticle;
        }
        return article;
      });

      state.loading = false;
      state.error = null;
    });

    builder.addCase(likeArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { setArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
