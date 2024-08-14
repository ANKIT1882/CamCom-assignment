import React, { useState } from 'react';
import Grid from './components/Grid';
import Settings from './components/Settings';
import useCrosswordGrid from './controller/useCrosswordGrid';
import useSettings from './controller/useSettings';
import Header from './components/header';
import Clues from './components/Clues';
import useTimer from './controller/useTimer';
import Timer from './components/Timer';
const App = () => {
  const { timer, resetTimer, pauseTimer, playTimer, isActive, stopTimer, stop, startTimer } = useTimer();
  const { settings, updateSetting } = useSettings();
  const { data, currentIndex, direction, changeCurrentIndex, resetGrid, checkGame, revealGame, onclickClue } = useCrosswordGrid(settings, stopTimer);
  const [open, setOpen] = useState(false);

  return (
    <div>
      {
        isActive &&
        <Header resetGrid={resetGrid} checkGame={checkGame} revealGame={revealGame} resetTimer={resetTimer} stop={stop} startTimer={startTimer} />
      }
      {settings.interactions.showTimer && <Timer timer={timer} pauseTimer={pauseTimer} playTimer={playTimer} isActive={isActive} stop={stop} />}
      <img src='/settings.svg' className='w-10 h-10 mb-1 cursor-pointer' onClick={() => setOpen(true)} />
      <h1 className="text-2xl font-bold">Crossword Game</h1>

      {open && <Settings settings={settings} updateSetting={updateSetting} setOpen={setOpen} />}

      <Clues data={data} direction={direction} currentIndex={currentIndex} onclickClue={onclickClue} />
      <Grid data={data} currentIndex={currentIndex} direction={direction} changeCurrentIndex={changeCurrentIndex} />


    </div>
  );
}

export default App;
