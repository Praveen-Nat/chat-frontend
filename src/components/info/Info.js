import React, { Component } from 'react'
import './Info.css';

import axios from 'axios';

export class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.rec_id,
            contact_data: [],
            data: {}
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/contacts/get/').then(res => {
            console.log(res.data);
            this.setState({ contact_data: res.data, data: res.data[this.props.rec_id] })
        })


        console.log(this.state.contact_data);
    }

    componentDidUpdate(props, state) {



        if (props.rec_id !== this.props.rec_id) {
            axios.get('http://127.0.0.1:8000/contacts/get/').then(res => {
                console.log(res.data);
                this.setState({ contact_data: res.data, data: res.data[this.props.rec_id] })
            })
        }

        if (props.send_id !== this.props.send_id) {

            this.props.history.push('/')
        }


    }

    render() {

        if(this.state.data !== undefined)
        {
            return (
                <div className="info_container">
                    <div className="info_name"> <p>{this.state.data['Name']}</p></div>
                    <div className="info_detail"> <p className="info_detail_title">Phone Number :</p> <p className="info_detail_value">{this.state.data['Phone Number']}</p> </div>
                    <div className="info_detail"> <p className="info_detail_title">Email :</p> <p className="info_detail_value">{this.state.data['Email']}</p></div>
                    <div className="info_detail"> <p className="info_detail_title">Company :</p> <p className="info_detail_value">{this.state.data['Company Name']}</p></div>
    
                </div>
            )
        }else
        {
            return null
        }
        
    }
}

export default Info
