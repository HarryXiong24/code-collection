import { useRef, useState } from 'react';
import './index.scss';

const keys = [...Array(10)].map((_, index) => (index + 1) % 10);

const Countdown = () => {
  const [countdown, setCountdown] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<number | null>(null);

  const handleKeyPress = (key: number) => {
    const original = String(countdown);
    const current = Number(`${original}${key}`);
    setCountdown(current > 300 ? 300 : current);
  };

  const beginCountdown = () => {
    setIsRunning(true);
    if (isRunning || intervalIdRef.current) {
      return;
    }
    intervalIdRef.current = setInterval(() => {
      setCountdown((countdown) => {
        if (countdown === 0) {
          clearInterval(intervalIdRef.current!);
          intervalIdRef.current = null;
          setIsRunning(false);
          setIsPause(false);
          return 0;
        }
        return countdown - 1;
      });
    }, 1000);
  };

  const handleClearCountdown = () => {
    setCountdown(0);
    setIsRunning(false);
    setIsPause(false);
    intervalIdRef.current && clearInterval(intervalIdRef.current!);
    intervalIdRef.current = null;
  };

  return (
    <div style={{ padding: 8 }}>
      <h2>Countdown</h2>
      <div className='countdown'>
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
            disabled={isRunning}
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
                setIsPause(false);
              } else {
                intervalIdRef.current && clearInterval(intervalIdRef.current!);
                intervalIdRef.current = null;
                setIsPause(true);
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
