import React, {useEffect, useState, useRef} from 'react';
import MensagemCard from '../components/MensagemCard';



export default function Home() {
    const [mensagem, setMensagem] = useState('');
    const [resposta, setResposta] = useState('');
    const [showPopUp, setShowPopup] = useState(false);
    const textareaRef = useRef(null);
    const popupRef = useRef(null);

    
    useEffect(() => {
    
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = 'auto'; 
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, [mensagem]);

    const handleSubmit = async e => {
        e.preventDefault();

        const data = { resposta: 'Essa é a resposta simulada para: ' + mensagem };
        setResposta(data.resposta);
        setShowPopup(true);
    };

    const handleCopy=() =>{
        if(resposta){
            navigator.clipboard.writeText(mensagem).then(() => {
                alert('Texto copiado!');
            });
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
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
            <p style={{ 
                 fontSize: '1.25rem',
                 maxWidth: '400px',
                 marginBottom: '2rem',
                 color: '#f0dede',
                 lineHeight: '1.4',
                 userSelect: 'none', 
                }}>
                Escreva o que sente e receba uma carta de amor pronta para emocionar quem você ama.
            </p>

            <form 
            onSubmit = {handleSubmit} 
            style = {{
                marginBottom: '0.5rem',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                }}>
                <textarea 
                    ref={textareaRef}
                    placeholder = 'digite sua mensagem'
                    value={mensagem}
                    maxLength={250}
                    autoComplete='off'
                    onChange={(e) => setMensagem(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        border: 'none',
                        resize: 'none',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        boxSizing: 'border-box',
                        color: '#000',
                        minHeight: '80px',
                        lineHeight: '1.4',
                    }}
                    rows={1}
                />
                <button 
                type = 'submit' 
                style = {{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#2d2d2d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1f1f1f')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2d2d2d')}
                    >
                    Enviar

                </button>
            </form>

         <div
        style={{
          color: '#ddd',
          fontSize: '0.9rem',
          fontWeight: '500',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'right',
          fontFamily: 'monospace',
          userSelect: 'none',
          marginBottom: '2rem',
          height: '20px', 
        }}
      >
        {mensagem.length} / 250
      </div>
      {showPopUp && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-in-out'
          }}>
        <div style={{
            backgroundColor: 'white',
            color: '#333',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '90vw',
            width: '400px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'popIn 0.3s ease-in-out'
    }}>
         <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', fontSize: '1rem' }}>
            {resposta}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: '#7e4e5a',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
                copiar
            </button>
            <button
              onClick={handleClosePopup}
              style={{
                backgroundColor: '#444',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
                fechar 
                </button>
        </div>
    </div>
</div>

      )}

      <style>
      {`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes popIn {
            from {
            transform: scale(0.95);
            opacity: 0;
            }
            to {
            transform: scale(1);
            opacity: 1;
            }
        }
    `}
      </style>

        </div>
    );
}
