//  const initialState = [{

//  }];


export const todoReducer = (state = [], action) => {
    if (action.type === "ADD_TODO") {
        console.log(action.value, " -- ", action.completed)
        const temp = [...state, {
            id: state.length,
            value: action.value,
            completed: action.completed,
            category: action.category
        }];

        return temp;
    }
    if (action.type === "DELETE_TODO") {
        const temp = [];
        state.map((item, index) => {
            if (index !== action.id) {
                temp.push({
                    id: temp.length,
                    value: item.value,
                    completed: item.completed,
                    category: item.category
                })
            }
        })
        return temp;
    }
    if (action.type === "UPDATE_TODO") {
        const temp = [...state];
        temp[action.id].completed = action.payload;
        return temp;
    }
    return state;
}