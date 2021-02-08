import React, { Component } from 'react'
import './Contacts.css';
import Contactts from '../../conatcts.json'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


import Chat from '../chat_component/Chat'
import Info from '../info/Info'

export class Contacts extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: 'nat'
        }

        console.log(localStorage.getItem('user'));
    }



    contact_instance(item) {
        console.log(localStorage.getItem('user'));
    }


    render() {
        const { data } = this.state.data;
        return (
            <Router>

                {/* <Link to="/chat">chat</Link><br></br>
                <Link to="/info">Info</Link> */}
                <div>
                    <div className='content'>




                        <div className='contacts'>
                            <div className="list">

                                <h1>All Contacts</h1>



                                {Object.keys(Contactts).map(item => {


                                     if (localStorage.getItem('user') != item) {
                                        return <div className="contact_item" >
                                            <div className="contact_name">{Contactts[item].Name}</div>
                                            {/* <div className="contact_name">{Contactts[item].Email}</div>
                                    <div className="contact_name">{Contactts[item]['Company Name']}</div> */}
                                            <div className="contact_info_icon" > <Link to="/chat">chat</Link></div>
                                            <div className="contact_chat_icon" > <Link to="/info">Info</Link></div>
                                        </div>
                                    }


                                })

                                }

                                {/* <div className="contact_item" >
                                    <div className="contact_name">hello</div>
                                    <div className="contact_info_icon" onClick={this.setUserInfo}> <Link to="/chat">chat</Link></div>
                                    <div className="contact_chat_icon" > <Link to="/info">Info</Link></div>
                                </div>

                                <div className="contact_item">
                                    <div className="contact_name">hello</div>
                                    <div className="contact_info_icon">icon1</div>
                                    <div className="contact_chat_icon">icon2</div>
                                </div> */}
                            </div>


                        </div>





                        <div className='chat'>
                            <Route exact path="/chat" render={(props) => <Chat {...props} title={this.state.data} />}>

                            </Route>

                            <Route exact path="/info">
                                <Info>   </Info>
                            </Route>

                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Contacts
