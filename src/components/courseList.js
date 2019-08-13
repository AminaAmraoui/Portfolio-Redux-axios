import React from 'react'
import './courseList.css'
import CourseCard from './courseCard'
import {connect} from 'react-redux'


const CourseList =({courses=[]}) => {
return courses.map((currentCourse) =>

        <div key={currentCourse.id}>
        <CourseCard course={currentCourse}/>
        </div>
        )
}

const mapStateToProps = state => {
        return {
        courses:state.courses
        }
}
const MovieListContainer =
    connect(mapStateToProps, null)(CourseList)

export default MovieListContainer