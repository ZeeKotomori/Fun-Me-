import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpvoteState {
    upvotesIds: string[];
}

const initialState: UpvoteState = {
    upvotesIds: [],
};

const upvoteSlice = createSlice({
    name : "upvote",
    initialState,
    reducers: {
        addUpvote: (state, action: PayloadAction<string>) => {
            if (!state.upvotesIds.includes(action.payload)) {
                state.upvotesIds.push(action.payload);
            }
        },
        removeUpvote: (state, action: PayloadAction<string>) => {
            state.upvotesIds = state.upvotesIds.filter(id => id !== action.payload);
        },
    },
})

export const { addUpvote, removeUpvote } = upvoteSlice.actions;
export default upvoteSlice.reducer;