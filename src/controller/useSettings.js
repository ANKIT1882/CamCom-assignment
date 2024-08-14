import { useEffect, useState } from 'react';

export default function useSettings() {
  const [settings, setSettings] = useState({
    arrowKeyNavigation: 'stay', // 'stay' or 'move'
    endOfWordAction: {
      jumpBack: true,
      jumpNext: false
    },
    spacebarAction: 'clear', // 'clear' or 'toggle',
    interactions: {
      playSound: true,
      showTimer: true,
    },
    navigation: {
      backspaceIntoPrevious: true,
      skipFilledSquares: true
    }
  });

  const updateSetting = (category, option, value) => {
    setSettings(prev => {
      let obj;
      if (option)
        obj = {
          ...prev,
          [category]: {
            ...prev[category],
            [option]: value
          }
        };
      else
        obj = {
          ...prev,
          [category]: value
        }
      return obj;
    });
  };

  return {
    settings,
    updateSetting,
  };
};
