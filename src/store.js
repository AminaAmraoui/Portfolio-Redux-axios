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
    courses: courseReducer}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store



//fill the store with initial data
const c = [
    {
        id:1,
        title:'Javascript',
        description:'JS Courses',
        fileCourse:'TP7.pdf',
        img:'https://smallimg.pngkey.com/png/small/550-5509803_js-logo-javascript-logo-circle-png.png'
    },
    {
        id:2,
        title:'Html',
        description:'Html courses',
        fileCourse:'TP2.pdf',
        img:'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png'
    },
    {
        id:3,
        title:'Css',
        description:'Css courses',
        fileCourse:'TP7.pdf',
        img:'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png'
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
