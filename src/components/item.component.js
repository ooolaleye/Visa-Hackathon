import React, { Component } from "react";
import Post from './Post';
import { useHistory } from "react-router-dom";


export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
          order: "",
          name: "",
          price: "",
          farm: "",
          status: "",
          image: null
        };
    }
    componentDidMount() {
        this.setState({ order: this.props.location.query.order,
                        name: this.props.location.query.name,
                        price: this.props.location.query.price, 
                        farm: this.props.location.query.farm,
                        status: this.props.location.query.status})
        import("../assets/" + this.props.location.query.name + ".jpg").then((image) => {
            this.setState({ image: image.default });
        });
    }
    render() {
        return (
            <Post order = {this.state.order} name={this.state.name} price={this.state.price} farm={this.state.farm} 
            caption="Moving the community!" status={this.state.status} image={this.state.image} />
        )
    }
}