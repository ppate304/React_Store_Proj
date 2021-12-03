import React, { Component } from 'react'
import * as Yup from 'yup'
import Button from 'react-bootstrap/button'
import {Formik, Form, Field} from 'formik'
// import postToken from '../api/apiBasicAuth'
import {Redirect} from 'react-router';

const FormSchema = Yup.object().shape({
    "username":Yup.string().required("Required"),
    "password": Yup.string().required("Required")
})

const initialValues={
    username:'',
    password:''
}


export default class Login extends Component {
        constructor(){
            super();
            this.state={
                error:'',
                redirect:false
            };
        }

        handleSubmit= async ({username, password})=>{
            // const response_object = await postToken(username,password);
            // this.setState({error:response_object.error})
            this.props.setToken('asdfghjkl');
            // (response_object.token){
            this.setState({redirect:true})
            // console.log(response_object.token)
        
    }


    render() {
        const styles={
            error:{color:'red'}
        }


        return (
            <div>
                {this.state.redirect ? <Redirect to={{pathname:"/shop", props:{token:localStorage.getItem('token')}}}/> :''}
                <Formik
                    initialValues={initialValues}
                    validationSchema={FormSchema}
                    onSubmit={(values)=>{console.log(values);this.handleSubmit(values)}}
                >
                    {
                        ({errors, touched})=>
                        <Form>
                          <label htmlFor="username" className="form-label">Username</label>
                            <Field name="username" className="form-control" />
                            {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>):null}  

                            <label htmlFor="password" className="form-label">Password</label>
                            <Field name="password" className="form-control" type="password" />
                            {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null} 
                            <small style={styles.error}>{this.state.error} </small>
                            <br/>
                            <Button type="submit">Login</Button>
                        </Form>
                    }
                </Formik>
            </div>
        )
    }
}
