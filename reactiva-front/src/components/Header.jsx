import React from 'react';

export default function Header({ title }) {
    return (
        <header style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderBottom: '1px solid #ccc'
        }}>
            <h1>{title}</h1>
        </header>
    );
}