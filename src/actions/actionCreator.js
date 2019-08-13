export const addCourse = course => ({
    type: 'ADD_COURSE',
    course
})

export const editCourse = (course, id) => ({
    type: 'EDIT_COURSE',
    course,
    id
})