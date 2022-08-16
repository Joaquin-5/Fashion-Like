import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../index.css';

const opciones = [
    {
        value: 'hombre',
        label: 'Hombre'
    },
    {
        value: 'mujer',
        label: 'Mujer'
    },
    {
        value: 'otros',
        label: 'Otros'
    }
]

export const FormPost = () => {
    const [currency, setCurrency] = React.useState('EUR');
    
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div>
            <h1>Cree un posteo</h1>
            <div className='campos'>
                <TextField id="filled-basic" label="Título" variant="outlined" />
                <TextField id="filled-basic" label="Descripción" variant="outlined" />
                <Button variant="contained">Agregue una imágen</Button>
                <TextField id="filled-basic" label="Género" variant="outlined" select value={currency} onChange={handleChange} helperText="Elija el género">
                    {opciones.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="filled-basic" label="Temporada" variant="outlined" />
            </div>
        </div>
    )
}