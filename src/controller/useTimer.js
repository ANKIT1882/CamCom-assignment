import { useEffect, useState, useRef } from "react";


export default function useTimer() {
    const [timer, setTimer] = useState({ min: 0, sec: 0 });
    const [isActive, setIsactive] = useState(true);
    const [stop, setStop] = useState(false);
    useEffect(() => {
        const update = () => {
            setTimer(prev => {
                let sec = prev.sec;
                let min = prev.min;
                sec++;
                if (sec >= 60) {
                    min++;
                    sec = 0;
                }
                return { min, sec };
            })
        }
        const timer = setInterval(() => {
            if (isActive && !stop)
                update();
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, stop])

    const resetTimer = () => {
        setTimer({ min: 0, sec: 0 });
    }
    const pauseTimer = () => {
        setIsactive(false);
    }
    const playTimer = () => {
        setIsactive(true);
    }

    const stopTimer = () => {
        setStop(true);
    }
    const startTimer = () => {
        setStop(false);
    }
    return { timer, resetTimer, pauseTimer, playTimer, isActive, stopTimer, stop, startTimer };
}