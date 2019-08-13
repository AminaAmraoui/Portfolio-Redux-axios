import React, {Component} from 'react'
import CourseList from './courseList'
import './Main.css'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import { editCourse } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'
import axios from 'axios'


class ModalCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
          valueTitle:this.props.innerCourse.title,
          valueDesc:this.props.innerCourse.description,
          /**states of modal */
          modalIsOpen: false
      }
      
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
      }


handleChangeTitle(event) {
   this.setState({valueTitle: event.target.value});
}
handleChangeDesc(event) {
  this.setState({valueDesc: event.target.value});
}
      /** Modal methods */
openModal() {
    this.setState({modalIsOpen: true});
  }
  
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  getNewInputs(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  getNewImg(event){
    var file = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.setState({
          newImg: reader.result
        })
      }
  }

  getNewFile(event) {
    this.setState({
        newFile: event.target.files[0],
        loaded: 0,
      })
  }
  senDataFile(){
    const data = new FormData() 
    data.append('file', this.state.newFile)
    axios.post("http://localhost:8000/upload", data, {
      })
      .then(res => { 
        console.log('then response '+res.statusText)
      })
    .catch(error => {
        console.log('error message '+error.message);
      })
  }

      /******Render method */
 render() {
     return (<div className="container-fluid">

<i className="far fa-edit" onClick={this.openModal}></i>

<Modal
                              isOpen={this.state.modalIsOpen}
                              onAfterOpen={this.afterOpenModal}
                              onRequestClose={this.closeModal}
                              contentLabel="Edit Course"
                            >
                            <div className="addcourse-container">   
                              <h2>Edit Course</h2>
                              <input type="text" name="newTitle" value={this.state.valueTitle} placeholder="Course Title" onChange={(e)=>{this.getNewInputs(e);this.handleChangeTitle(e)}}/>
                              <textarea  name="newDesc" value={this.state.valueDesc} placeholder="Course Description" onChange={(e)=>{this.getNewInputs(e);this.handleChangeDesc(e)}}/>
                              <input type="file" name="newImg"  onChange={(e)=>this.getNewImg(e)}/>
                              <input type="file" name="newFile" onChange={(e)=>{this.getNewFile(e);
                                                                                this.setState({
                                                                                  newfiletitle:e.target.value.replace("C:\\fakepath\\", "")
                                                                                })}}/>
                             
                              <div className="addcourse-btn">
                                  
                                  <input type="button" value="Update"
                                            onClick={()=>
                                              {this.closeModal();  /** call multiple functions on onClick event */
                                              
                                              this.props.editCourse({
                                                title: this.state.newTitle || this.props.innerCourse.title,
                                                description: this.state.newDesc || this.props.innerCourse.description,
                                                img:this.state.newImg || this.props.innerCourse.img,
                                                fileCourse:this.state.newfiletitle || this.props.innerCourse.fileCourse
                                              }
                                                ,this.props.innerCourse.id ); 

                                              this.senDataFile();
                                              }}
                                    />
                                    <button type="button" value="Close" onClick={this.closeModal} className='btn btn-danger px-4'>Close</button>
                             </div>
                                                              
                              </div>
                            </Modal>  
                            </div>
)
 }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      editCourse
    }, dispatch)
  }

  export default connect(null, mapDispatchToProps) (ModalCourse)