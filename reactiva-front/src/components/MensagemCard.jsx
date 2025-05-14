function MensagemCard({texto}) {
    return (
        <div style={{
            background: '#fff',
            color: '#000',
            padding: '1rem',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '1rem auto',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1),',


        }}>
            <p>{texto}</p>
        </div>
    );
}

export default MensagemCard;