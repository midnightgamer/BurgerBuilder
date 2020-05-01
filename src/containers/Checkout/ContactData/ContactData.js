import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from "../../../components/UI/Froms/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:''
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },
                    value:''
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:''
                },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:''
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[{value:'fastest' , displayName:'Fastest'} , {value:'cheapest' , displayName:'Cheapest'}]
                },
                value:''
            },
        },


        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,


        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }
    onChangeHandler = (e , inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...this.state.orderForm[inputIdentifier]
        }

        updatedOrderFormElement.value = e.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        this.setState({orderForm: updatedOrderForm});
    }
    render () {
        const elArray = [];
        for(let key in this.state.orderForm){
            elArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form>

                {elArray.map(el =>{
                    return <Input onChangeHandler={(e)=>this.onChangeHandler(e, el.id)} key={el.id} elementType={el.config.elementType} elementConfig={el.config.elementConfig} value={el.config.value} />
                })}

                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;