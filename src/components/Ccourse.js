import React from 'react'
import './courseCard.css'
import axios from 'axios'
import {connect} from 'react-redux'

const CCourse = (props) => {
    const {course = {},
    onDelete = () => {},
    openModal,
    onEdit = () => {},
    getCourse =()=>{}} = props
    const {
        id,
        title = 'No Title',
        img = require('../img/webdev.png'),
        description = 'No Description',
        fileCourse=''
    } = course

    return <div className="course-container">
        <div className="overlay-container">
                    <img src={img} className="img-fluid rounded-circle" alt='img'/>
                    <div className="overlay">
                        <div className="text">
                            <button type="button" value="delete" onClick={() => onDelete(id)} 
                                className='btn btn-info'><i className="far fa-trash-alt"></i></button>
                            <i className="far fa-edit" onClick={()=>{openModal(); getCourse(course); onEdit(true)}}></i>
                        </div>
                    </div>
                    </div> 
                    <div className="course-desc-container">
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <button type="button" value="more"
                        className='btn btn-info px-4' onClick={()=>getDataFile(fileCourse)}><i className="fas fa-download"></i></button>
        </div>
    </div>
}

const getDataFile =(nameFile) => {
    console.log('nameFile '+nameFile)
    axios({
        url: '/'+nameFile,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.log('error message '+error.message);
      })
}

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => {
            dispatch({
                type: 'DELETE_COURSE',
                id: id
            })
        }
    }
}

const mapStateToProps = state => {
    return {
        fileCourse: state.fileCourse
    }
}

const CCourseContainer =
    connect(mapStateToProps, mapDispatchToProps)(CCourse)

export default CCourseContainer