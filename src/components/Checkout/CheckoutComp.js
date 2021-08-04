import React, { useState } from 'react';
import AddressForm from './AddressForm';
import Confirmation from './Confirmation';
import PaymentForm from './PaymentForm';

import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core'
import useStyles from './CheckoutStyle'

const steps = ['Shipping address','Payment details']

function CheckoutComp(props) {
    const classes = useStyles();
    const [activeStep,setActiveStep] = useState(0)
    const [shippingData,setShippingData] = useState({})


    const nextStep = () => setActiveStep((prev)=>prev+1)
    const backStep = () => setActiveStep((prev)=>prev-1)
    const next = (data)=>{
        setShippingData(data)
        nextStep()
    }
    const Form = ()=>activeStep === 0 ? <AddressForm next={next}/> : <PaymentForm shippingData={shippingData} backStep={backStep} nextStep={nextStep}/>

    return (
        <>
          <div className={classes.toolbar}/>
          <main className={classes.layout}>
             <Paper className={classes.paper}>
                 <Typography variant='h4' align='center'>Checkout</Typography>
                 <Stepper activeStep={activeStep} className={classes.stepper}>
                     {steps.map((step)=>{
                         return <Step key={step} className={classes.step}>
                             <StepLabel StepIconProps={{classes: {active: classes.icon,completed:classes.icon}}}>{step}</StepLabel>
                         </Step>
                     })}
                 </Stepper>
                 {activeStep === steps.length ? <Confirmation /> : <Form/> }
             </Paper> 
          </main>
        </>
    );
}

export default CheckoutComp;