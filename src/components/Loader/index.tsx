import React from 'react';

// Component görsellik için AI ile yaratılmıştır.
const BettingLoader = () => {
  return (
    <div style={styles.wrapper as React.CSSProperties}>
      <style>
        {`
          @keyframes bounceOdd {
            0%, 100% { 
              transform: translateY(0); 
              opacity: 0.4; 
              box-shadow: none;
            }
            50% { 
              transform: translateY(-8px); 
              opacity: 1; 
              box-shadow: 0 10px 15px -3px rgba(234, 179, 8, 0.3); 
              border-color: #eab308;
              color: #eab308;
            }
          }
          
          @keyframes spinBall {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes pulseText {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          .odd-box {
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1e293b; /* Koyu Lacivert/Slate */
            color: #94a3b8;
            border: 2px solid #334155;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 800;
            transition: all 0.3s ease;
          }

          .odd-1 { animation: bounceOdd 1.5s infinite ease-in-out; animation-delay: 0s; }
          .odd-x { animation: bounceOdd 1.5s infinite ease-in-out; animation-delay: 0.2s; }
          .odd-2 { animation: bounceOdd 1.5s infinite ease-in-out; animation-delay: 0.4s; }
          
          .svg-ball {
            animation: spinBall 2.5s linear infinite;
          }
        `}
      </style>

      <div style={styles.container}>
        <div className="odd-box odd-1">1</div>
        <div className="odd-box odd-x">X</div>
        <div className="odd-box odd-2">2</div>
      </div>

      <div style={styles.textContainer}>
        <svg
          className="svg-ball"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#eab308"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M2 12h20"></path>
        </svg>
        <span style={styles.text}>Bülten Hazırlanıyor...</span>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '250px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  container: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  text: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    animation: 'pulseText 1.5s infinite ease-in-out',
  },
};

export default BettingLoader;

BettingLoader.displayName = 'BettingLoader';
