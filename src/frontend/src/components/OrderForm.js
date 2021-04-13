import { Typography, TextField, Select, MenuItem, Checkbox, FormControlLabel, InputLabel, FormControl, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useGetClients from '../hooks/useGetClients';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function OrderForm() {

    const classes = useStyles();

    const {data: clients, loading} = useGetClients();

    const [id, setId] = useState(null);
    const [client, setClient] = useState();
    const [servedAt, setServedAt] = useState(new Date(2021, 1, 1, 0, 0, 0, 0))
    const [center, setCenter] = useState();
    const [served, setServed] = useState(false);
    const [urgency, setUrgency] = useState(false);
    const [toCenter, setToCenter] = useState(false);

    const handleClientChange = (event) => {
        setClient(event.target.value);
        console.log(client);
    };

    const handleCenterChange = (event) => {

        setCenter(event.target.value);
        switch (event.target.value) {
            case 1:
                setToCenter(true);
                break;

            default:
                setToCenter(false);
                break;
        }
        console.log(center);
        console.log(toCenter);
    };

    const handleIDChange = (event) => {
        setId(event.target.value);
    };

    const handleDateServedChange = (event) => {
        setServedAt(event.target.value);
    };

    const handleServedChange = (event) => {
        setServed(event.target.checked);
    };

    const handleUrgencyChange = (event) => {
        setUrgency(event.target.checked);
    };

    const handleToCenterChange = (event) => {
        setToCenter(event.target.checked);
    };

    return (
        <form className={classes.container}>

            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <Typography>Nueva Orden</Typography>
                </Grid>
                <Grid item xs={12}>

                    <TextField
                        label="ID"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        value={id}
                        style={{ width: 100 }}
                        onChange={handleIDChange}
                    />
                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={client}
                            onChange={handleClientChange}
                        >
                            { 
                                clients.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Centro</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={center}
                            onChange={handleCenterChange}
                            labelWidth={100}
                        >
                            <MenuItem key={1} value={1}>Matriz</MenuItem>
                            <MenuItem key={2} value={2}>Sucursal</MenuItem>
                            <MenuItem key={3} value={3}>Socio</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={urgency}
                                onChange={handleUrgencyChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Urgente"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={served}
                                onChange={handleServedChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Surtido"
                    />
                    {served ?
                        <TextField
                            id="datetime-local"
                            label="Surtido:"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={servedAt}
                            onChange={handleDateServedChange}
                        />
                        :
                        <></>
                    }


                </Grid>
            </Grid>


        </form>
    )
}
