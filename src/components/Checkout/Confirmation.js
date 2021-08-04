import { Button, Divider, Typography } from '@material-ui/core';
import React from 'react';

import useStyles from './CheckoutStyle'

function Confirmation(props) {
    const classes = useStyles()
    return (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase</Typography>
            </div>
            <br/>
            <Button href='/' variant='outlined' type='button'>Back to Home</Button>
            
        </>
    );
}

export default Confirmation;