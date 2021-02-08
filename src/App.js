import React from "react";
import "./App.css";

import "./components/header/Header.css";
import "./components/contacts/Contacts.css";
import Chat from "./components/chat_component/Chat";
import Info from "./components/info/Info";

import Modal from "react-modal";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Link,
} from "react-router-dom";

Modal.setAppElement("#root");

class App extends React.Component {
  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      user: "1",
      data: "nat",
      rec_id: "",
      ws: new WebSocket("ws://localhost:8000/ws/chat/"),
      showModal: false,
      form_name: "",
      form_phone: "",
      form_email: "",
      form_company: "",
      contact_data: [],
      email_validation: false,
      phone_validation: false,
      form_button_state: true,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  fetchContact = () => {
    axios.get("http://127.0.0.1:8000/contacts/get/").then((res) => {
      console.log(Object.keys(res.data));
      this.setState({ contact_data: res.data, user: Object.keys(res.data)[0] });
    });
  };

  componentDidMount() {
    // console.log(Object.keys(Contactts));
    this.fetchContact();
  }

  onChange(e) {
    this.setState({
      user: e.target.value,
    });
  }

  addSubmit = (e) => {
    console.log(this.state.form_name);
    e.preventDefault();
    this.setState({
      form_name: "",
      form_email: "",
      form_phone: "",
      form_company: "",
      showModal: false,
    });

    var formData = {};
    formData["name"] = this.state.form_name;
    formData["phone"] = this.state.form_phone;
    formData["email"] = this.state.form_email;
    formData["company"] = this.state.form_company;

    console.log(formData);

    axios.post(`http://127.0.0.1:8000/contacts/post/`, formData).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    this.fetchContact();
  };

  render() {
    return (
      <Router>
        <div>
          <Modal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            style={this.customStyles}
          >
            <div onClick={this.handleCloseModal}>
              <img
                alt="close"
                title="Close"
                src="https://img.icons8.com/material-outlined/24/000000/multiply--v1.png"
              />
            </div>
            <br></br>

            <form
              onSubmit={this.addSubmit}
              onChange={() => {
                if (
                  this.state.form_name !== "" &&
                  this.state.form_phone !== "" &&
                  this.state.form_email !== "" &&
                  this.state.form_company !== "" &&
                  this.state.email_validation === true &&
                  this.state.phone_validation === true
                ) {
                  this.setState({ form_button_state: false });
                } else {
                  this.setState({ form_button_state: true });
                }
              }}
            >
              <div className="modal_form">
                <h2 style={{ color: "#121212" }}>Add New Contact</h2>
                <TextField
                  id="filled-basic"
                  label="Name"
                  variant="filled"
                  className="modal_form_ele"
                  size="small"
                  value={this.state.form_name}
                  onChange={(e) => {
                    this.setState({ form_name: e.target.value });
                  }}
                />

                <div
                  className={
                    this.state.phone_validation || this.state.form_phone === ""
                      ? "hide_val"
                      : "show_val"
                  }
                >
                  not a valid phone number
                </div>
                <TextField
                  id="filled-basic"
                  label="Phone Number"
                  variant="filled"
                  type="number"
                  className="modal_form_ele"
                  size="small"
                  value={this.state.form_phone}
                  onChange={(e) => {
                    this.setState({ form_phone: e.target.value });

                    if (new RegExp(/^\d{10}$/).test(e.target.value)) {
                      this.setState({ phone_validation: true });
                    } else {
                      this.setState({ phone_validation: false });
                    }
                  }}
                />

                <div
                  className={
                    this.state.email_validation || this.state.form_email === ""
                      ? "hide_val"
                      : "show_val"
                  }
                >
                  not a valid email
                </div>
                <TextField
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  className="modal_form_ele"
                  size="small"
                  value={this.state.form_email}
                  onChange={(e) => {
                    this.setState({ form_email: e.target.value });

                    if (
                      new RegExp(
                        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
                      ).test(e.target.value)
                    ) {
                      this.setState({ email_validation: true });
                    } else {
                      this.setState({ email_validation: false });
                    }
                  }}
                />

                <TextField
                  id="filled-basic"
                  label="Company"
                  variant="filled"
                  className="modal_form_ele"
                  size="small"
                  value={this.state.form_company}
                  onChange={(e) => {
                    this.setState({ form_company: e.target.value });
                  }}
                />
                <Button
                  variant="contained"
                  className="modal_form_ele"
                  color="primary"
                  type="submit"
                  disabled={this.state.form_button_state}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Modal>

          <div>
            <div className="header_container">
              <div className="login"></div>

              <select
                value={this.state.user}
                onChange={this.onChange.bind(this)}
              >
                {/* {Object.keys(Contactts).map(item => {

              return <option value={item} key={item} >{Contactts[item].Name}</option>
            })} */}

                {Object.keys(this.state.contact_data).map((item) => {
                  console.log(item);
                  return (
                    <option value={item} key={item}>
                      {this.state.contact_data[item]["Name"]}
                    </option>
                  );
                })}
              </select>

              <div className="addContact" onClick={this.handleOpenModal}>
                <div className="addIcon">
                  <img
                    alt="plus icon"
                    src="https://img.icons8.com/android/18/000000/plus.png"
                  />
                </div>
                <div className="addText">New</div>
              </div>

              <h2 className="header_title">BlooChat</h2>
            </div>
          </div>

          <div className="main_container">
            <div className="content">
              <div>
                <h2 className="contact_title">
                  <img
                    alt="contact icon"
                    src="https://img.icons8.com/windows/32/000000/contacts.png"
                  />
                  <p style={{ marginLeft: 10 }}>Contacts </p>
                </h2>
                <div className="contacts">
                  <div className="list">
                    {Object.keys(this.state.contact_data).map((item) => {
                      if (this.state.user !== item) {
                        return (
                          <div className="contact_item">
                            <div className="contact_name">
                              {this.state.contact_data[item].Name}
                            </div>

                            <div
                              className="contact_chat_icon"
                              onClick={() => {
                                console.log("hit3" + item);
                                this.setState({ rec_id: item });
                                var url =
                                  "ws://localhost:8000/ws/chat/" +
                                  this.state.contact_data[this.state.user][
                                    "Name"
                                  ] +
                                  "/" +
                                  this.state.contact_data[item]["Name"] +
                                  "/";
                                var ws = new WebSocket(url);
                                this.setState({ ws: ws });
                              }}
                            >
                              {" "}
                              <Link to={"/info/" + item}>
                                <img
                                  alt="info icon"
                                  title="Contact Info"
                                  src="https://img.icons8.com/fluent-systems-regular/25/000000/info.png"
                                />
                              </Link>
                            </div>
                            <div
                              className="contact_info_icon"
                              onClick={() => {
                                console.log("hit3" + item);
                                this.setState({ rec_id: item });
                              }}
                            >
                              {" "}
                              <Link to={"/chat/" + item}>
                                <img
                                  alt="chat icon"
                                  src="https://img.icons8.com/windows/25/000000/sms--v1.png"
                                  title="Send Message"
                                />
                              </Link>
                            </div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              </div>

              <div className="chat">
                <Route
                  exact
                  path="/chat/:id"
                  render={(props) => (
                    <Chat
                      {...props}
                      send_id={this.state.user}
                      rec_id={this.state.rec_id}
                      sender_name={
                        this.state.contact_data[this.state.user]["Name"]
                      }
                      rec_name={
                        this.state.contact_data[this.state.rec_id]["Name"]
                      }
                      url={
                        "ws://localhost:8000/ws/chat/" +
                        this.state.contact_data[this.state.user]["Name"] +
                        "/" +
                        this.state.contact_data[this.state.rec_id]["Name"] +
                        "/"
                      }
                    />
                  )}
                ></Route>

                <Route
                  exact
                  path="/info/:id"
                  render={(props) => (
                    <Info
                      {...props}
                      rec_id={this.state.rec_id}
                      send_id={this.state.user}
                    />
                  )}
                >
                  {/* <Info>   </Info> */}
                </Route>
              </div>
            </div>
          </div>

          <div className="smallScrnContent">
            <div>
              <Route
                exact
                path="/chat/:id"
                render={(props) => (
                  <Chat
                    {...props}
                    send_id={this.state.user}
                    rec_id={this.state.rec_id}
                    sender_name={
                      this.state.contact_data[this.state.user]["Name"]
                    }
                    rec_name={
                      this.state.contact_data[this.state.rec_id]["Name"]
                    }
                    url={
                      "ws://localhost:8000/ws/chat/" +
                      this.state.contact_data[this.state.user]["Name"] +
                      "/" +
                      this.state.contact_data[this.state.rec_id]["Name"] +
                      "/"
                    }
                  />
                )}
              ></Route>

              <Route
                exact
                path="/info/:id"
                render={(props) => (
                  <Info
                    {...props}
                    rec_id={this.state.rec_id}
                    send_id={this.state.user}
                  />
                )}
              >
                {/* <Info>   </Info> */}
              </Route>

              <h2 className="contact_title">
                <img
                  alt="contact icon"
                  src="https://img.icons8.com/windows/32/000000/contacts.png"
                />
                <p style={{ marginLeft: 10 }}>Contacts </p>
              </h2>
              <div className="contacts">
                <div className="list">
                  {Object.keys(this.state.contact_data).map((item) => {
                    if (this.state.user !== item) {
                      return (
                        <div className="contact_item">
                          <div className="contact_name">
                            {this.state.contact_data[item].Name}
                          </div>

                          <div
                            className="contact_chat_icon"
                            onClick={() => {
                              console.log("hit3" + item);
                              this.setState({ rec_id: item });
                              var url =
                                "ws://localhost:8000/ws/chat/" +
                                this.state.contact_data[this.state.user][
                                  "Name"
                                ] +
                                "/" +
                                this.state.contact_data[item]["Name"] +
                                "/";
                              var ws = new WebSocket(url);
                              this.setState({ ws: ws });
                            }}
                          >
                            {" "}
                            <Link to={"/info/" + item}>
                              <img
                                alt="info icon"
                                title="Contact Info"
                                src="https://img.icons8.com/fluent-systems-regular/25/000000/info.png"
                              />
                            </Link>
                          </div>
                          <div
                            className="contact_info_icon"
                            onClick={() => {
                              console.log("hit3" + item);
                              this.setState({ rec_id: item });
                            }}
                          >
                            {" "}
                            <Link to={"/chat/" + item}>
                              <img
                                alt="chat icon"
                                src="https://img.icons8.com/windows/25/000000/sms--v1.png"
                                title="Send Message"
                              />
                            </Link>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
