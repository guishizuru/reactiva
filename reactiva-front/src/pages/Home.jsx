import React, {useState} from 'react';
import MensagemCard from '../components/MensagemCard';



export default function Home() {
    const [mensagem, setMensagem] = useState('');
    const [resposta, setResposta] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const data = { resposta: 'Essa é a resposta simulada para: ' + mensagem };
        setResposta(data.resposta);
    };


    return(
        <div style = {{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#7e4e5a', 
            height: '100vh',
            color: 'white', 
            textAlign:'center',
            width:'100vw',
            flexDirection:'column'
            }}>
            <h1 style={{fontSize: '3rem'}}>Reactiva 💌</h1>

            <form onSubmit = {handleSubmit} style = {{marginBottom: '2rem' }}>
                <input
                    type = 'text'
                    placeholder = 'digite sua mensagem'
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: 'none',
                        width: '250px',
                        marginRight: '1rem',
                    }}
                />
                <button type = 'submit' style = {{
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#2d2d2d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                    }}>
                    Enviar

                </button>
            </form>

            {resposta && <MensagemCard texto = {resposta} />}
        </div>
    );
}
