import React, { Component } from "react";
import "./Chat.css";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_thread: "",
      sender: "",
      main_thread: [],
      item: [],
      current_user: this.props.send_id,
      // url: 'ws://localhost:8000/ws/chat/' + Contactts[this.props.send_id]['Name'] + '/' + Contactts[this.props.rec_id]['Name'] + '/',
      url: this.props.url,
      send_button_state: true
    };

    console.log(this.props.url);
  }

  // url = 'ws://localhost:8000/ws/chat/' + Contactts[this.props.send_id]['Name'] + '/' + Contactts[this.props.rec_id]['Name'] + '/';
  ws = null;

  webSocket = (url) => {
    this.ws = new WebSocket(url);
    this.ws.onopen = (e) => {
      console.log("connection is open");
    };

    this.ws.onmessage = (e) => {
      console.log(e);
      console.log(e.data);
      console.log("msg recieved ");
      console.log(JSON.parse(e.data).thread);

      // this.setState({
      //   main_thread: [...this.state.main_thread, JSON.parse(e.data).thread],
      // });

      var obj = {
        msg: JSON.parse(e.data).thread,
        id: JSON.parse(e.data).sender,
        rec_id: JSON.parse(e.data).reciever,
      };

      this.setState({
        item: [...this.state.item, obj],
      });

      // this.setState({ uniqueid: JSON.parse(e.data).reciever })
      console.log(this.state.main_thread);
      console.log(this.state.item);
    };

    this.ws.onclose = (e) => {
      console.log("connection is closed");
    };
    this.ws.onerror = (e) => {
      console.log("error");
    };

    console.log('http://127.0.0.1:8000/chat/getChat/' +  (this.props.sender_name + this.props.rec_name).split('').sort().join('') + '/');

    
    axios.get('http://127.0.0.1:8000/chat/getChat/' +  (this.props.sender_name + this.props.rec_name).split('').sort().join('') + '/').then
    (
      res => {console.log(res.data)
      
         res.data.map(item =>{
            console.log(item)
             
            this.setState({
              item: [...this.state.item, item],
            })
          
          })
      }
    )
  
  
  };

  componentDidMount() {
    this.webSocket(this.state.url);
    console.log(this.props.url);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      // url: 'ws://localhost:8000/ws/chat/' + Contactts[props.send_id]['Name'] + '/' + Contactts[props.rec_id]['Name'] + '/'
      url: props.url,
    };
  }

  componentDidUpdate(props, state) {
    if (props.url !== this.props.url) {
      this.ws.close();
      this.setState({ item: [] });
      this.webSocket(this.state.url);
    }

    if (props.send_id !== this.props.send_id) {
      this.ws.close();
      this.setState({ item: [] });
      this.webSocket(this.state.url);
    }
  }

  handleInput = (e) => {
    this.setState({ current_thread: e.target.value });

    if(e.target.value !== "")
    {
      this.setState({send_button_state: false})
    }else
    {
      this.setState({send_button_state: true})
    }
  };

  handleSubmit = (e) => {
    console.log(this.state.current_thread);
    e.preventDefault();

    this.ws.send(this.state.current_thread);
    this.setState({ current_thread: "" });
  };

  render() {
    return (
      <div>
        <div className="chatHeader">
          <div className="chatHeadercircle">{this.props.rec_name[0]}</div>
          {this.props.rec_name}
        </div>

        <div className="class_container">
          {this.state.item.reverse().map((thread, index) => {
            return (
              <div className="class_thread">
                {/* <div className='text_thread_sent' key={index}>{thread.msg}</div><br></br> */}
                <div
                  className={
                    thread.id === this.props.sender_name
                      ? "text_thread"
                      : "text_thread_sent"
                  }
                  key={index}
                >
                  {thread.msg}
                </div>
                <br></br>
              </div>
            );
          })}
        </div>

        <div className="ipWrapper">
          <form onSubmit={this.handleSubmit} className="input_form">
            {/* <input type="text" value={this.state.current_thread} onChange={this.handleInput} className="chat_ip"></input> */}
            <TextField
              id="filled-basic"
              variant="filled"
              value={this.state.current_thread}
              onChange={this.handleInput}
              className="chat_ip"
            />
            {/* <button type="submit" className="send_button">
              <img
                alt="send icon"
                src="https://img.icons8.com/windows/25/000000/filled-sent.png"
              />
            </button> */}

            <Button variant="contained" color="primary"  type="submit" className="send_button" disabled={this.state.send_button_state}>
              Send
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
