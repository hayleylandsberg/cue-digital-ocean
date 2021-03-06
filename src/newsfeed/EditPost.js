// import React, { Component } from "react"
// import "./Home.css"
// import $ from "jquery"
// ;

// export default class Archive extends Component {

//     state = {
//         message: "",
//         posts: [],
//         medications: [],
//         doctors: []
//     }
// postMessage = (text) => fetch(`http://localhost:5001/posts/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             message: this.state.message,
//             userId: this.props.activeUser,
//             date: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())
//         })
//     })
//     .then(() => {
//         return fetch(`http://localhost:5001/posts?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
//     })
//     .then(r => r.json())
//     .then(posts => {
//         this.setState({
//             message: "",
//             posts: posts
//         })
//     })
// }

import React, { Component } from "react"
import swal from 'sweetalert'
import "./PostList.css"

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }


export default class EditPost extends Component {

    state={
        message: ""

    }

    activeUser = localStorage.getItem("yakId")

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    updatePost = function(postId){
         // Create user in API
         fetch(`https://cue-medical-management-app.herokuapp.com/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: this.setState.message
            })
        })
        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            console.log(postId)
            // this.props.displayAllAppointments()
            swal("Success!", "Your diary entry has been updated.", "success")
        })
        // .then(() => {
        //     return fetch(`http://localhost:5001/posts?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
        // })
    }.bind(this);

    render() {
        return (
            <form className="form-update-post" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Update Diary Entry</h1>
            <div className="flexForm-update">
            <label htmlFor="inputMessage" className="sr-only">Post</label>
            <input onChange={this.handleFieldChange} type="post" id="appointmentDate" className="form-control" id="post-input" placeholder={this.props.post.message} required="" autoFocus="" />

            {/* <label htmlFor="inputDoctor" className="sr-only">Doctor's Name</label>
            <input onChange={this.handleFieldChange} type="name" id="doctorName" className="form-control" value={this.props.doctor.name} required="" autoFocus="" />

            <label htmlFor="inputSpecialty" className="sr-only">Doctor's Speciality</label>
            <input onChange={this.handleFieldChange} type="specialty" id="doctorSpecialty" className="form-control"  value={this.props.doctor.specialty} required="" />

            <label htmlFor="inputFacility" className="sr-only">Facility / Hospital</label>
            <input onChange={this.handleFieldChange} type="facility" id="doctorFacility" className="form-control"  value={this.props.doctor.facility} required="" autoFocus="" />

            <label htmlFor="inputAddress" className="sr-only">Doctor's Address</label>
            <input onChange={this.handleFieldChange} type="address" id="doctorAddress" className="form-control"  value={this.props.doctor.address} required="" autoFocus="" />

            <label htmlFor="inputPhoneNumber" className="sr-only">Doctor's Phone Number</label>
            <input onChange={this.handleFieldChange} type="phoneNumber" id="doctorPhoneNumber" className="form-control"  value={this.props.doctor.phoneNumber} required="" autoFocus="" /> */}

            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={()=> this.updatePost(this.props.post.id)}>Update</button>
            </form>
        )
    }
}
