import {createStore, combineReducers} from 'redux'

const courseReducer = (state = [], action) => {
    if(action.type === 'ADD_COURSE') {
        return state.concat(action.course)
    }

    if(action.type === 'DELETE_COURSE') {
        return state.filter(m => {
            if(m.id === action.id) {
                return false
            }
            return true
        })
    }

    if(action.type === 'EDIT_COURSE') {
        return state.map(m => {
            if(m.id === action.id) {
                return action.course
            }
            return m
        })
    }
    
    return state
}

const store = createStore(combineReducers({
    courses: courseReducer}))

export default store



//fill the store with initial data
const c = [
    {
        id:1,
        title:'javascript',
        description:'course for javascript',
        fileCourse:'TP7.pdf'
    },
    {
        id:2,
        title:'html',
        description:'course for html',
        fileCourse:'TP2.pdf'
    },
    {
        id:3,
        title:'css',
        description:'course for css',
        fileCourse:'TP7.pdf'
    }
]

c.forEach( item =>{
    store.dispatch({
        type: 'ADD_COURSE',
        course: item
    })
})

/* store.dispatch({
    type: 'EDIT_COURSE',
    id:3,
    course: {
        id:3,
        title:'css new',
        description:'course for css',
        fileCourse:'TP7.pdf'
    }
}) */
