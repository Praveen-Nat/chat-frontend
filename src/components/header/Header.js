import React, { Component } from 'react'
import './Header.css';
import Contactts from '../../conatcts.json'

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { user: '1'};
      }

    componentDidMount() {
        console.log(Object.keys(Contactts));
        localStorage.setItem('user', this.state.user)

    }

    onChange(e) {
        this.setState({
          user: e.target.value
        })

        localStorage.setItem('user', e.target.value)
    }


    render() {
        return (
            <div>
                <div className="header_container">
                    <div className="login"></div>
                 
                   <select value={this.state.user} onChange={this.onChange.bind(this)} >
                       { Object.keys(Contactts).map( item => 
                        {

                            return <option value={item} key={item} >{Contactts[item].Name}</option>
                        })}
                   </select>
                    <h2 className="header_title">{this.state.user}</h2>
                </div>
            </div>
        )
    }
}

export default Header
