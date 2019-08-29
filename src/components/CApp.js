import React, { Component } from "react";
import './Main.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import axios from 'axios'
import Ccourse from './Ccourse'
import CModal from './CModal'

class CApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          modalIsOpen: false,
          edit: false,
          course:{title:'', description:''}
      }     
 }

 getCourse = course =>{
     this.setState({ course })
 }
 onEdit = edit => {
    this.setState({ edit });
  };
  openModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  render() {
      return (
          <div className="container-fluid">

<div className="row">
        <div className="col-md-6 courselist-container">
             {this.props.courses.map((currentCourse) =>

                <div key={currentCourse.id}>
                <Ccourse 
                    course={currentCourse}
                    modalIsOpen={this.state.modalIsOpen}
                    openModal={this.openModal}
                    key={currentCourse.id}
                    getCourse={this.getCourse}
                    onEdit={this.onEdit}/>
                </div>
                )}
             
           </div>
           <div className="col-md-6 info-container text-center">
               <h1>Welcome</h1>
               <i className="far fa-plus-square" onClick={() => {
                    this.openModal();
                    this.onEdit(false);
                    this.setState({
                        course:{title: '', description:''}
                    })}}></i>
           </div>
       </div>

       <CModal
                edit={this.state.edit}
                course={this.state.course}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}/>


          </div>
      )
  }
}
const mapStateToProps = state =>{
    return {
      courses:state.courses
      }
  }

  export default connect(mapStateToProps, null) (CApp)