import React from 'react';

const Settings = ({ settings, updateSetting, setOpen }) => {
  const labelStyle = "block"
  const divstyle = "w-[50%]"
  return (
    <div className='w-full h-[100vh]  backdrop-blur-md fixed z-10'>

      <div className="w-[40%] border-[1px] border-gray-400 bg-white p-2 m-auto rounded-sm">
        <img src='/close.svg' className='w-10 h-10 cursor-pointer' onClick={() => setOpen(false)} />
        <h3 className="font-bold text-lg mb-2">Puzzle Settings</h3>
        <div className='flex flex-wrap '>

          <div className={divstyle}>
            <h4 className="font-semibold">After changing direction with arrow keys</h4>
            <div className='flex-col'>
              <label className={labelStyle}>
                <input
                  type="radio"
                  checked={settings.arrowKeyNavigation === 'stay'}
                  onChange={() => updateSetting('arrowKeyNavigation', null, "stay")}
                /> Stay in the same square
              </label>
              <label className={labelStyle} >
                <input
                  type="radio"
                  checked={settings.arrowKeyNavigation === 'move'}
                  onChange={() => updateSetting('arrowKeyNavigation', null, "move")}
                /> Move in the direction of the arrow
              </label>
            </div>
          </div>

          <div className={divstyle}>
            <h4 className="font-semibold">At the end of a word</h4>
            <label className={labelStyle}>
              <input
                type="checkbox"
                checked={settings.endOfWordAction.jumpBack}
                onChange={() => updateSetting('endOfWordAction', 'jumpBack', !settings.endOfWordAction.jumpBack)}
              /> Jump back to first blank in the word
            </label>
            <label className={labelStyle}>
              <input
                type="checkbox"
                checked={settings.endOfWordAction.jumpNext}
                onChange={() => updateSetting('endOfWordAction', 'jumpNext', !settings.endOfWordAction.jumpNext)}
              /> Jump to next clue (if not jumping back)
            </label>
          </div>

          <div className={divstyle}>
            <h4 className="font-semibold">Pressing the spacebar should</h4>
            <label className={labelStyle}>
              <input
                type="radio"
                checked={settings.spacebarAction === 'clear'}
                onChange={() => updateSetting('spacebarAction', null, 'clear')}
              /> Clear the current square and advance
            </label>
            <label className={labelStyle}>
              <input
                type="radio"
                checked={settings.spacebarAction === 'toggle'}
                onChange={() => updateSetting('spacebarAction', null, 'toggle')}
              /> Toggle between Across and Down
            </label>
          </div>

          <div className={divstyle}>
            <h4 className="font-semibold">Interactions</h4>
            <label className={labelStyle}>
              <input
                type="checkbox"
                checked={settings.interactions.playSound}
                onChange={() => updateSetting('interactions', 'playSound', !settings.interactions.playSound)}
              /> Play sound on solve
            </label>
            <label className={labelStyle}>
              <input
                type="checkbox"
                checked={settings.interactions.showTimer}
                onChange={() => updateSetting('interactions', 'showTimer', !settings.interactions.showTimer)}
              /> Show timer
            </label>
          </div>

          <div className={divstyle}>
            <h4 className="font-semibold">At the start of a word</h4>
            <label className={labelStyle}>
              <input
                type="checkbox"
                checked={settings.navigation.backspaceIntoPrevious}
                onChange={() => updateSetting('navigation', 'backspaceIntoPrevious', !settings.navigation.backspaceIntoPrevious)}
              /> Backspace into previous word
            </label>
          </div>

          <div className={divstyle}>
            <h4 className="font-semibold">Within a word</h4>
            <label className={labelStyle}>
              <input
                type="checkbox"
                checked={settings.navigation.skipFilledSquares}
                onChange={() => updateSetting('navigation', 'skipFilledSquares', !settings.navigation.skipFilledSquares)}
              /> Skip over filled squares
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
