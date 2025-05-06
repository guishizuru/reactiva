import React from 'react';

export default function Button({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: '#6200ee',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
            }}
        >
            {label}
        </button>
    );
}