import React, {Component} from 'react'
import CourseList from './courseList'
import './Main.css'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import { addCourse } from '../actions/actionCreator'
import {bindActionCreators} from 'redux'
import axios from 'axios'


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          /**states of modal */
          modalIsOpen: false
      }
      
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
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
    <div className="row">
           <div className="col-md-6 courselist-container">
               <CourseList />
           </div>
           <div className="col-md-6 info-container text-center">
               <h1>Welcome</h1>
               <i className="far fa-plus-square" onClick={this.openModal}></i>
           </div>
       </div>


<Modal
                              isOpen={this.state.modalIsOpen}
                              onAfterOpen={this.afterOpenModal}
                              onRequestClose={this.closeModal}
                              contentLabel="Add New Course"
                            >
                            <div className="addcourse-container">   
                              <h2>Add New Course</h2>
                              <input type="text" name="newTitle" placeholder="Course Title" onChange={(e)=>this.getNewInputs(e)}/>
                              <textarea name="newDesc" placeholder="Course Description" onChange={(e)=>this.getNewInputs(e)}/>
                              <input type="file" name="newImg"  onChange={(e)=>this.getNewImg(e)}/>
                              <input type="file" name="newFile" onChange={(e)=>{this.getNewFile(e);
                                                                                this.setState({
                                                                                  newfiletitle:e.target.value.replace("C:\\fakepath\\", "")
                                                                                })}}/>
                             
                              <div className="addcourse-btn">
                                  
                                  <input type="button" value="Add"
                                            onClick={()=>
                                              {this.closeModal();  /** call multiple functions on onClick event */
                                              
                                              this.props.addCourse({ /**call addCourse: a function from actionCreator */
                                              id: Math.random(),
                                              title: this.state.newTitle,
                                              description: this.state.newDesc,
                                              img:this.state.newImg,
                                              fileCourse:this.state.newfiletitle}); 

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
        addCourse
    }, dispatch)
  }

  export default connect(null, mapDispatchToProps) (Main)