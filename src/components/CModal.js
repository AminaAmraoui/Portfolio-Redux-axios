import React, {Component} from 'react'
import './Main.css'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import { editCourse,addCourse } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'
import axios from 'axios'

class CModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          description: ""
        };
      }

      componentDidUpdate = prevProps => {
        console.log(this.props.edit)
        console.log(prevProps.edit)
        prevProps.edit !== this.props.edit &&
          this.setState({
            title: this.props.course.title,
            description: this.props.course.description,
            img: this.props.course.img,
            fileCourse: this.props.course.fileCourse
          });
      };

      getNewInputs = event =>{
        this.setState({
          [event.target.name]: event.target.value
        })
      }
      getNewImg = event =>{
        var file = event.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            this.setState({
              img: reader.result
            })
          }
      }
    
      getNewFile = event => {
        this.setState({
            fileCourse: event.target.files[0],
            loaded: 0,
          })
      }

      senDataFile = () =>{
        const data = new FormData() 
        console.log('fileCourse ',this.state.fileCourse)
        console.log('newfiletitle ',this.state.newfiletitle)
        data.append('file', this.state.fileCourse)
        axios.post("http://localhost:8000/upload", data, {
          })
          .then(res => { 
            console.log('then response '+res.statusText)
          })
        .catch(error => {
            console.log('error message '+error.message);
          })
      }

      render() {
        return (
          <div className="container-fluid">
            <Modal
              ariaHideApp={false}
              isOpen={this.props.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.props.openModal}
              contentLabel={this.props.edit?"Edit Course":"Add Course"}
            >
              <div className="addcourse-container">
                
                {this.props.edit?<h2>Edit Course</h2>:<h2>Add Course</h2>}
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={this.state.title}
                  onChange={this.getNewInputs}
                />
                <textarea
                  type="number"
                  name="description"
                  placeholder="Course Description"
                  value={this.state.description}
                  onChange={this.getNewInputs}
                />
                <label className="btn btn-primary">
                                <i className="fa fa-image"></i>Upload Image
                                    <input 
                                    type="file" 
                                    name="img"  
                                    onChange={(e)=>this.getNewImg(e)} style={{display:"none"}}/>
                </label>
                <label className="btn btn-primary">
                                <i className="fa fa-file-pdf"></i>Upload File
                                <input 
                                type="file" 
                                name="fileCourse" 
                                style={{display:"none"}} 
                                onChange={(e)=>{this.getNewFile(e);
                                                this.setState({
                                                      newfiletitle:e.target.value.replace("C:\\fakepath\\", "")
                                                              })}}/>
                </label>
    
                <div className="addcourse-btn">
                  <input
                    type="button"
                    value={this.props.edit?"Update":"Add"}
                    onClick={() => {
                      this.props.openModal();
                      this.props.edit ? (this.props.editCourse(
                        {
                          title: this.state.title,
                          description: this.state.description,
                          img: this.state.img,
                          fileCourse:this.state.newfiletitle
                        },
                        this.props.course.id
                      )):(this.props.addCourse({ 
                        id: Math.random(),
                        title: this.state.title,
                        description: this.state.description,
                        img: this.state.img,
                        fileCourse:this.state.newfiletitle
                    }));
                    this.senDataFile();
                    }}
                  />
                  <button
                    type="button"
                    value="Close"
                    onClick={this.props.openModal}
                    className="btn btn-danger px-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        );
      }
    
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        editCourse,
        addCourse
      },
      dispatch
    );
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(CModal);