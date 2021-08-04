import React, { useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";

function AddressForm({next}) {
  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> next(data))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="zip" label="Zip / Postal Code" />
            <FormInput required name="city" label="Shipping City" />
            <FormInput required name="street" label="Street" />
          </Grid>
        <br/>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" href='/'>Back to Cart</Button>
          <Button type="submit" variant="contained" color="primary">Next</Button>
        </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;
