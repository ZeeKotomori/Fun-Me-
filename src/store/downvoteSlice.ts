import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DownvoteState {
    downvotesIds: string[];
}

const initialState: DownvoteState = {
    downvotesIds: [],
}

const downvotesSlice = createSlice({
    name : "downvotes",
    initialState,
    reducers: {
        addDownvote: (state, action: PayloadAction<string>) => {
            if (!state.downvotesIds.includes(action.payload)) {
                state.downvotesIds.push(action.payload);
            }
        },
        removeDownvote: (state, action : PayloadAction<string>) => {
            state.downvotesIds = state.downvotesIds.filter(id => id !== action.payload);
        }
    }
})

export const { addDownvote, removeDownvote } = downvotesSlice.actions;
export default downvotesSlice.reducer;