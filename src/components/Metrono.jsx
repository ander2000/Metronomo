// Metrónomo.js
import React, { useState, useRef, useEffect } from 'react';
import alerta from '../img/alerta.png';
import alertaDisabled from '../img/alerta_disabled.png';

const Metronome = () => {
  // Estado y referencias
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const bpmRef = useRef(bpm); // Nueva referencia para mantener el valor actualizado de bpm
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0.0);
  const intervalIdRef = useRef(null);
  const [onBombillo, setOnBombillo] = useState(false);
  const ionBombilloRef = useRef(onBombillo);


  // Función para crear y gestionar el AudioContext
  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Función para generar el sonido del clic
  const playClick = () => {
    if (!audioContextRef.current) return;

    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    osc.type = 'square';
    osc.frequency.value = 1000; // Frecuencia del clic
    gainNode.gain.setValueAtTime(1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    osc.start(audioContextRef.current.currentTime);
    osc.stop(audioContextRef.current.currentTime + 0.05); // Duración del clic
  };

  // Función para programar el siguiente clic
  const scheduleClick = () => {
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      playClick();
      nextNoteTimeRef.current += 60.0 / bpmRef.current;
      setOnBombillo(!ionBombilloRef.current);
      // console.log(ionBombilloRef);
    }
  };

  // Función para iniciar/detener el metrónomo
  const toggleMetronome = () => {
    if (isPlaying) {
      clearInterval(intervalIdRef.current);
      setIsPlaying(false);
    } else {
      initializeAudioContext();
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      intervalIdRef.current = setInterval(scheduleClick, 25);
      setIsPlaying(true);
    }
  };

  // Efecto para limpiar el intervalo al desmontar el componente
  useEffect(() => {
    return () => clearInterval(intervalIdRef.current);
  }, []);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    ionBombilloRef.current = onBombillo;
  }, [onBombillo]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Metrónomo</h1>
      <div> { ionBombilloRef.current ? <img src={alerta} alt="alerta" className='alerta'/> : <img src={alertaDisabled} alt="alerta_disabled" className='alerta'/>}</div>
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="bpm">BPM: </label>
        <input
          id="bpm"
          type="range"
          min="40"
          max="240"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
        <span>{bpm}</span>
      </div>
      <button onClick={toggleMetronome}>{isPlaying ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Metronome;
