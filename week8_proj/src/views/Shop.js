import React, { Component } from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import {getItems} from '../api/apiItems'
import ItemCard from '../components/ItemCard'
import img from '../images/img.jpeg'


export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            items:[],
            serverErrorItems:false,
            tokenError:false,
            itemStart: 0,
            itemEnd:15
        };
    };

    componentDidMount() {
        //do API calls to get all Cats and Get All items
        this.getAllItems()
    }

    getAllItems=async () =>{
        const items = await getItems(localStorage.getItem('token'))
        if(items===400){this.setState({tokenError:true})}
        if(items===500){this.setState({serverErrorItems:true})}
        if (items !==500 && items !==400){this.setState({items, itemStart:0, itemEnd:15})}
    }

    handlePrev=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart-15, itemEnd:oldEnd-15})
    }

    handleNext=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart+15, itemEnd:oldEnd+15})
    }



    render() {
        const styles = {
            catButton:{
                backgroundColor: "white",
                color:"black",
                width: '100%',
                border: '1px solid grey',
                borderRadius: '15px',
                marginBottom:'5px'
            },
            pageStyles:{backgroundImage: `url(${img})`}
        }

        return (
    
                <div style={styles.pageStyles}>
                <Row>
                    <Col md={3}>
                        {/* category section */}
                        <center><h3>ITEMS</h3></center>
                        <hr/>
                        {/* <ul style={{listStyleType:'none'}}> */}
                            {/* Come back to here */}
                            <li>
                                {/* <button style={styles.catButton} onClick={()=>this.handleCat(0)}>All Items</button> */}
                            </li>
                            {/* {this.state.categories.map(
                                (c)=><li key={c.id}>
                                    <button style={styles.catButton} onClick={()=>this.handleCat(c.id)}></button>
                                </li>
                            )} */}

                        {/* </ul> */}
                    </Col>
                    <Col md={9}>
                        {/* item section */}
                        <Row>
                            {this.state.items?.slice(this.state.itemStart,this.state.itemEnd)
                                .map((i)=><ItemCard addToCart={this.props.addToCart} item={i} key={i.id}/>)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button variant="danger" className={"me-2 " + (this.state.itemStart===0?"disabled":'')} onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                            <Button variant="success" className={" " + (this.state.items?.length<=this.state.itemEnd?"disabled":'')} onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>

                </Row>
                </div>
            
        )
    }
}

