import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
//   loading: false,
//   error: null,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups(state, action) {
      state.groups = action.payload;
    },
    // setLoading(state, action) {
    //   state.loading = action.payload;
    // },
    // setError(state, action) {
    //   state.error = action.payload;
    // },
  },
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;