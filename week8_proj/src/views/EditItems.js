import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {putItem, getItems, deleteItem} from '../api/apiItems'

const FormSchema = Yup.object().shape({
    "name": Yup.string().required("Required"),
    "description": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must be a Valid Price").required("Required"),
    "image":Yup.string().required("Required"),
    "category": Yup.string().required("Required"),
    "item_id":Yup.number().integer().required("Required")
})


export default class EditItems extends Component {

    constructor() {
        super();
        this.state={
            tokenError:false,
            categories:[],
            items:[],
            item:{},
            unsuccessfulPost: false,
            successfulPost: false,
            unsuccessfulDelete: false,
            successfulDelete: false,
            serverErrorItem:false
            
        }
    }

    componentDidMount(){
        this.getAllItems()
    }


    getAllItems=async()=>{
        const items=await getItems(localStorage.getItem('token'))
        if(items===400){this.setState({tokenError:true,serverErrorItem:false})}
        if(items===500){this.setState({serverErrorItem:true,tokenError:false})}
        if (items !==500 || items !== 400){
            this.setState({items})
        }
    }


    handlePullDown=(event)=>{
        const newId = event.target.value;
        if (newId===0){return}
        const newitem = this.state.items.filter((i)=>i.id===parseInt(newId))[0];
        this.setState({item:newitem})
    }


    handleDeleteItem=async()=>{
        if (window.confirm(`Are you sure you want to delete ${this.state.item.title}`)){
            const res= await deleteItem(localStorage.getItem('token'), this.state.item.id, )
            if (res) {
                this.setState({succesfulDelete:true, unsuccessfulDelete:false}); 
                this.getAllItems();
            }else{
                this.setState({succesfulDelete:false, unsuccessfulDelete:true}); 

            }
        }
    }

    handleSubmit=async (values)=>{
        console.log(values)
        const res=await putItem(localStorage.getItem('token'), this.state.item.id, values)
        console.log(res)
        if(res){
            this.setState({successfulPost:true})
        }else{
            this.setState({unsuccessfulPost:true})
        }
    }

    render() {
        return (
            <div>
                
                {this.state.successfulDelete?<small style={{color:"green"}}>Your Item Was Deleted</small>:""}
                {this.state.unsuccessfulDelete?<small style={{color:"red"}}>Error Deleting item, Please Try again</small>:""}
                {this.state.successfulPost?<small style={{color:"green"}}>Your Item Was Modified</small>:""}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Modifing item, Please Try again</small>:""}
                {this.state.tokenError?<Redirect to='/login'/>:''}       
                <br/>
                <label htmlFor="itemsList" className="form-label">Choose Item to Edit</label>
                <select id="options" name="itemsList" className="form-select form-select-lg mb-3" onChange={(event)=>this.handlePullDown(event)}>
                    <option defaultValue={0} label="--Choose an item--"/>
                    {this.state.items?.map(
                        (item)=><option key={item.id} value={item.id} label={item.title}/>
                    )}
                </select>
                {Object.entries(this.state.item??{}).length>0
                    ?
                    <>
                    <br/>
                    <hr/>
                    <h2>#{this.state.item?.id ?? '000'} - {this.state.item?.title??"No Item Name"}</h2>
                    <Button variant="danger" onClick={()=>this.handleDeleteItem()}>Delete Item</Button>
                    <hr/>
                    <br/>
                    <Formik
                        initialValues={
                            {
                                title:this.state.item?.title ?? '',
                                description:this.state.item?.description ?? '',
                                price:this.state.item?.price ?? '',
                                image:this.state.item?.image ?? '',
                                category:this.state.item?.category ?? '',
                                item_id : this.state.item?.item_id ?? ''
                            }
                        }
                        enableReinitialize
                        validationSchema={FormSchema}
                        onSubmit={
                            (values,{resetForm})=>{
                                console.log(values);
                                this.handleSubmit(values);
                                resetForm({
                                    title:'',
                                    description:'',
                                    image:'',
                                    price:'',
                                    category:'',
                                    item_id:''
                            });
                            }
                        }>
                        {({ errors, touched })=>(
                            <Form>
                                <label htmlFor="title" className="form-label">Item Name</label>
                                <Field name="title" className="form-control"/>
                                {errors.title && touched.title ? (<div style={{color:"red"}}>{errors.title}</div>):null}

                                <label htmlFor="description" className="form-label">Description</label>
                                <Field name="description" className="form-control"/>
                                {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>):null}

                                <label htmlFor="price" className="form-label">Price</label>
                                <Field name="price" className="form-control"/>
                                {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>):null}

                                <label htmlFor="image" className="form-label">Image</label>
                                <Field name="image" className="form-control"/>
                                {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>):null}


                                <label htmlFor="category" className="form-label">Category</label>
                                <Field name="category" className="form-control"/>
                                
                                
                                    {/* {this.state.items?.map(
                                        (c)=><option key={c.id} value={c.id}>{c.categories}</option>
                                    )} */}
                                {/* </Field> */}
                                {errors.category && touched.category ? (<div style={{color:'red'}}>{errors.category}</div>):null}

                                <Button className="btn btn-primary form-control" type="submit">Edit Item</Button>   
                            </Form>
                        )
                        }

                    </Formik>
                    </>
                :''}

            </div>
        )
    }
}