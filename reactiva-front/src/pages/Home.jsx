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
                textShadow: '0 0 5px #000, 0 0 10px #000',
                animation: 'ledGlitch 6s infinite ease-in-out',
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
                className='btn-enviar'
                    >
                    Enviar

                </button>
            </form>

         <div
        style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.65rem',
            color: 'white',
            textAlign: 'right',
            width: '100%',
            maxWidth: '400px',
            userSelect: 'none',
            marginTop: '0.5rem',
            textShadow: '1px 1px 0 #000',
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
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.45rem',
            backgroundColor: '#000',
            color: '#fff',
            padding: '1rem 1.25rem',
            borderRadius: '0',
            border: '3px solid #ff0000',
            boxShadow: '0 0 0 4px #000, inset 0 0 0 2px #ff0000',
            textShadow: '1px 1px 0 #000',
            lineHeight: '1.6',
            wordBreak: 'break-word',
            width: '90vw',
            maxWidth: '1000px',
            animation: 'popIn 0.3s ease-in-out'
    }}>
         <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left', fontSize: '1rem' }}>
            {resposta}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handleCopy}
              style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '0.55rem',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: '2px solid white',
                  boxShadow: '2px 2px 0 #000',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
              }}
            >
                copiar
            </button>
            <button
              onClick={handleClosePopup}
              style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '0.55rem',
                  backgroundColor: '#444',
                  color: 'white',
                  border: '2px solid white',
                  boxShadow: '2px 2px 0 #000',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
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
          .btn-enviar {
              background-color: #b10024;
              color: #fff;
              width: 100%;
              border: 2px solid white;
              border-radius: 6px;
              font-family: 'Press Start 2P', cursive;
              font-size: 0.75rem;
              padding: 1rem 0;
              box-shadow: 4px 4px 0 #000;
              text-transform: uppercase;
              cursor: pointer;
              transition: all 0.2s ease-in-out;
           }

          .btn-enviar:hover {
             background-color: #ff0000;
             box-shadow: 4px 4px 0 #000, 0 0 10px #ff0000;
             color: white;
          }

          .btn-enviar:active {
             transform: translate(2px, 2px);
              box-shadow: 2px 2px 0 #000;
          }
                
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
}

       @keyframes ledGlitch {
          0%   { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 0px red; 
          }
          10%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 5px red; 
          }
          20%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 10px red;
           }
          30%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 2px red;
          }
          40%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 12px red; 
          }
          50%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 0px red; 
          }
          60%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 10px red; 
          }
          70%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 3px red; 
          }
          80%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 8px red; 
          }
          90%  { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 0px red; 
          }
          100% { 
          text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 10px red; 
          }

}

        
    `}
      </style>

        </div>
    );
}
