import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';

export default function Home() {
    function handleButtonClick() {
        alert('Bem-vindo à HomePage!');
    }

    return (
        <div style={{color:'black'}}>
            <Header title="Página Inicial" />
            <div style={{ padding: '20px' ,color:"white"}}>
                <p>Bem-vindo ao meu projeto React!</p>
                <Button label="Clique para saber mais" onClick={handleButtonClick} />
            </div>
        </div>
    );
}