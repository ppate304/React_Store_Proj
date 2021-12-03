import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import {Redirect} from "react-router-dom";
export default class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  handleRenderItem = () => {
    this.setState({ clicked: true });
  };

  render() {
    return (
      <Col>
        {/* come back for single item */}
        {this.state.clicked ? (
          <Redirect to={`/item/${this.props.item.id}`} />
        ) : (
          ""
        )}
        <Card style={{ width: "150px", height: "400px", marginBottom: "25px" }}>
          <Card.Img
            variant="top"
            style={{ height: "100px", objectFit: "contain" }}
            alt={this.props.item.title + " image"}
            src={
              this.props.item.image ??
              "https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png"
            }
          />
          <Card.Body style={{backgroundColor:"pink"}}>
            <Card.Title style={{width: '100px', fontSize:"10px"}}>
              {(this.props.item.title.slice(0,45)) ?? "Generic Item"}
            </Card.Title>
            <Card.Text style={{flexDirection:'row', flex: 1, flexWrap: 'wrap', fontSize:"10px"}}>
              {this.props.item.description.slice(0,75) ?? "Sorry No Description"}
            </Card.Text>
            <Card.Subtitle className="float-end">
              ${this.props.item.price ?? "?.??"}{" "}
            </Card.Subtitle>
            <br />
            <button
              style={{
                backgroundColor: "white",
                border: "none",
                color: "blue",
              }}
              onClick={() => this.handleRenderItem()}
            >
              See More
            </button>
            <Button variant="primary" onClick={()=>this.props.addToCart(this.props.item)}> Add To Cart</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}