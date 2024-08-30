import { useRef, useState } from 'react';
import './index.scss';

const keys = [...Array(10)].map((_, index) => (index + 1) % 10);

const Countdown = () => {
  const [countdown, setCountdown] = useState(0);
  const [isPause, setIsPause] = useState(0);
  const intervalIdRef = useRef<number | null>(null);

  const handleKeyPress = (key: number) => {
    const original = String(countdown);
    const current = Number(`${original}${key}`);
    setCountdown(current > 300 ? 300 : current);
  };

  const beginCountdown = () => {
    if (intervalIdRef.current) {
      return;
    }
    intervalIdRef.current = setInterval(() => {
      setCountdown((countdown) => {
        if (countdown === 0) {
          clearInterval(intervalIdRef.current!);
          intervalIdRef.current = null;
          return 0;
        }
        return countdown - 1;
      });
    }, 1000);
  };

  const handleClearCountdown = () => {
    setCountdown(0);
    intervalIdRef.current && clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
  };

  return (
    <div style={{ padding: 8 }}>
      <h2>Countdown</h2>
      <div className='countdown' style={{ padding: 8, border: '1px solid black' }}>
        <div className='keyboard'>
          {keys.map((key, index) => (
            <div
              key={index}
              className='key'
              onClick={() => {
                if (intervalIdRef.current) {
                  return;
                }
                handleKeyPress(key);
              }}
            >
              {key}
            </div>
          ))}
        </div>
        <div className='display-area'>Countdown with {countdown} seconds</div>
        <div className='operation'>
          <button
            style={{ marginRight: 8 }}
            onClick={() => {
              beginCountdown();
            }}
          >
            start
          </button>
          <button
            style={{ marginRight: 8 }}
            onClick={() => {
              if (isPause) {
                beginCountdown();
                setIsPause(0);
              } else {
                intervalIdRef.current && clearInterval(intervalIdRef.current!);
                intervalIdRef.current = null;
                setIsPause(1);
              }
            }}
          >
            {isPause ? 'Play' : 'Pause'}
          </button>
          <button
            onClick={() => {
              handleClearCountdown();
            }}
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
