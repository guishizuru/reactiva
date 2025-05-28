import React, {useEffect, useState, useRef} from 'react';
import MensagemCard from '../components/MensagemCard';



export default function Home() {
    const [mensagem, setMensagem] = useState('');
    const [resposta, setResposta] = useState('');
    const [showPopUp, setShowPopup] = useState(false);
    const textareaRef = useRef(null);

    
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
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: "url('/bg-reactiva.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            animation: 'bgPulse 6s infinite',
            minHeight: '100vh',
            color: 'white',
            textAlign: 'center',
            width: '100%',
            flexDirection: 'column',
            padding: '1rem',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden'
            }}>
            <h1 style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', // responsivo
                color: '#FF0000',
                textShadow: '0 0 5px #000000, 0 0 10px #000000, 0 0 20px #000000',
                animation: 'neonPulse 1.5s ease-in-out infinite',
                marginBottom: '2rem',
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px',
            }}>
                Reactiva
                <span style={{ display: 'inline-block', verticalAlign: 'middle', position: 'relative', top: '-0.15em' }}>
                    ❤️
                  </span>
            </h1>



            <p style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.65rem',
                backgroundColor: '#000',
                color: '#fff',
                padding: '1rem',
                border: '2px solid white',
                boxShadow: `
                  0px 0px 0px 2px white,
                  4px 4px 0px 0px black
                  `,
                borderRadius: '0',
                maxWidth: '400px',
                textAlign: 'left',
                userSelect: 'none',
                lineHeight: '1.5',
                position: 'relative',
                }}>
                ESCREVA O QUE SENTE E RECEBA UMA CARTA DE AMOR PRONTA<br />
                PARA EMOCIONAR QUEM VOCÊ AMA
            </p>

            <form 
            onSubmit = {handleSubmit} 
            style = {{
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                fontFamily: "'Press Start 2P', cursive",
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
                        backgroundColor: '#f0e7de',
                        color: '#000',
                        padding: '0.75rem 1rem',
                        border: 'none',
                        borderRadius: '6px',
                        boxShadow: '4px 4px 0 #000',
                        fontFamily: "'Press Start 2P', cursive",
                        fontSize: '0.7rem',
                        resize: 'none',
                        outline: 'none',
                        lineHeight: '1.4',
                        textTransform: 'lowercase',
                        overflow: 'hidden',
                    }}
                    rows={1}
                />
                <button 
                type = 'submit' 
                style = {{
                    backgroundColor: '#b10024',
                    color: '#fff',
                    width: '100%',
                    border: 'none',
                    borderRadius: '6px',
                    fontFamily: "'Press Start 2P', cursive",
                    fontSize: '0.75rem',
                    padding: '1rem 0',
                    boxShadow: '4px 4px 0 #430312',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
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
        @keyframes bgPulse {
          0% {
            background-color: #6b3b4d;
          }
          50% {
            background-color: #703f52;
          }
          100% {
            background-color: #6b3b4d;
  }
  
        @keyframes neonPulse {
          0% {
            text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 20px #000;
          }
          50% {
            text-shadow: 0 0 10px #000, 0 0 20px #000, 0 0 30px #000;
          }
          100% {
            text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 20px #000;
          }
        }

        
    `}
      </style>

        </div>
    );
}
