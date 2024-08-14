import { useEffect, useRef, useState } from "react";
import data1 from "../utils/fetch";

export default function useCrosswordGrid(settings, stopTimer) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(0)   //0->horizontal,1->vertical
  const [data, setData] = useState(data1)
  const [currentWord, setCurrentWord] = useState(1);
  const [reset, setReset] = useState(0);
  const music = useRef(new Audio('/song.mp3'))
  useEffect(() => {
    //initialize currentIndex
    for (let i = 0; i < data['grid'].length; i++)
      if (data['grid'][i] !== '.') {
        setCurrentIndex(i + 1);
        break;
      }

  }, [reset])
  useEffect(() => {
    setData(data => {

      for (let i = 0; i < data['bgColor'].length; i++) {
        if (data['grid'][i] !== ".")
          data['bgColor'][i] = 'white'
        else
          data['bgColor'][i] = 'black'
      }
      data['bgColor'][currentIndex - 1] = 'pink';
      let cols = data.size.cols;
      let rows = data.size.rows;
      let n = cols * rows;
      // console.log(n)
      if (!direction) {
        ///cover right 
        let i = currentIndex + 1;
        while (i <= n && data.grid[i - 1] !== '.' && i % cols !== 1) {
          data['bgColor'][i - 1] = 'gray';
          // console.log(i)
          i++;
        }
        //cover left
        i = currentIndex - 1;
        while (i > 0 && i % cols && data.grid[i - 1] !== '.') {
          data['bgColor'][i - 1] = 'gray';
          i--;
        }
      }
      else {

        let i = currentIndex + cols;
        //cover down
        while (i <= n && data.grid[i - 1] !== '.') {
          data['bgColor'][i - 1] = 'gray';
          i += cols;
        }
        //cover up
        i = currentIndex - cols;
        while (i > 0 && data.grid[i - 1] !== '.') {
          data['bgColor'][i - 1] = 'gray';
          i -= cols;
        }
      }
      let newData = { ...data }
      return newData;
    })

  }, [direction, currentIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onArrowUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onArrowDown();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onArrowLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onArrowRight();
          break;
        case ' ':
          e.preventDefault();
          onSpaceBar();
          break;
        case 'Backspace':
          onBackSpace();
          break;
        default:
          if (e.key.length === 1 && e.key.match(/[a-z]/i))
            onCellFill(e.key);
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings, data, direction, currentWord, currentIndex])

  const resetGrid = () => {
    //  console.log("reset")
    setData(data => {
      for (let i = 0; i < data.userGrid.length; i++)
        if (data.grid[i] !== '.')
          data.userGrid[i] = "";
      return { ...data };

    });
    setDirection(0);
    setCurrentWord(1);
    setReset(prev => !prev);
  }
  const changeCurrentIndex = (ind) => {
    if (data['userGrid'][ind] != '.')
      setCurrentIndex(ind + 1);
  }

  const changeDirection = () => {
    setDirection(prev => !prev)
  }

  const moveForward = () => {

    setCurrentIndex(currentIndex => {
      const cols = data.size.cols;
      if (currentIndex % cols && data['grid'][currentIndex] !== '.')//(curentIndex+1)-1
        return currentIndex + 1;
      else
        return currentIndex;
    })
  }

  const moveBackward = () => {

    setCurrentIndex(currentIndex => {
      const cols = data.size.cols;
      if (currentIndex % cols !== 1 && data['grid'][currentIndex - 2] !== '.')//(curentIndex-1)-1
        return currentIndex - 1;
      else
        return currentIndex;
    });

  }

  const moveDown = () => {

    setCurrentIndex(currentIndex => {
      const cols = data.size.cols;
      const n = cols * data.size.rows;
      if (currentIndex + cols <= n && data['grid'][currentIndex + cols - 1] !== '.')
        return currentIndex + cols;
      else
        return currentIndex;
    });
  }

  const moveUp = () => {

    setCurrentIndex(currentIndex => {
      const cols = data.size.cols;
      if (currentIndex - cols > 0 && data['grid'][currentIndex - cols - 1] !== '.')
        return currentIndex - cols;
      else return currentIndex;
    });
  }

  const onArrowUp = () => {
    if (direction || settings.arrowKeyNavigation === 'move') {
      moveUp();
      if (!direction)
        changeDirection();
    }
    else
      changeDirection();

  }

  const onArrowDown = () => {

    if (direction || settings.arrowKeyNavigation === 'move') {
      moveDown();
      if (!direction)
        changeDirection();
    }
    else
      changeDirection();
  }
  const onArrowLeft = () => {
    if (!direction || settings.arrowKeyNavigation === 'move') {
      moveBackward();
      if (direction)
        changeDirection();
    }
    else
      changeDirection();
  }
  const onArrowRight = () => {
    if (!direction || settings.arrowKeyNavigation === 'move') {
      moveForward();
      if (direction)
        changeDirection();
    }
    else
      changeDirection();
  }


  const onCellFill = (ch) => {
    setData(data => {
      data['userGrid'][currentIndex - 1] = ch.toUpperCase();
      const cols = data.size.cols;
      const n = cols * data.size.rows;
      if (direction)//vertical
      {
        if (currentIndex + cols > n || data['grid'][currentIndex + cols - 1] === '.')//end of word
        {
          if (settings.endOfWordAction.jumpBack) {
            let ind = data['parentD'][currentIndex - 1];
            console.log(ind, currentIndex)
            while (ind != currentIndex && data['userGrid'][ind - 1] != '')
              ind += cols;
            if (data['userGrid'][ind - 1] !== '.')
              setCurrentIndex(ind);
          }
          else if (settings.endOfWordAction.jumpNext) {
            let nw = (currentWord + 1) % (data.word.length + 1);
            if (nw === 0)
              nw++;

            if (data.word[nw - 1].align === 'A')
              changeDirection();
            setCurrentWord(nw);
            setCurrentIndex(data.word[nw - 1].index);

          }
        }
        else {
          let ind = currentIndex;
          do {
            ind += cols;
            moveDown();
          } while (settings.navigation.skipFilledSquares && ind <= n && data['userGrid'][ind - 1] !== '.' && data['userGrid'][ind - 1] !== '');
          if (settings.navigation.skipFilledSquares && settings.endOfWordAction.jumpNext && !settings.endOfWordAction.jumpBack)
            setCurrentIndex(prev => {
              if (data['userGrid'][prev - 1] !== '') {
                let nw = (currentWord + 1) % (data.word.length + 1);
                if (nw === 0)
                  nw++;
                setCurrentWord(nw);
                setCurrentWord(nw);
                if (data.word[currentWord - 1].align === 'A')
                  setDirection(0);

                return data.word[currentWord - 1].index;
              }
              else
                return prev;
            })

        }
      }
      else {

        if (currentIndex % cols === 0 || data['grid'][currentIndex] === '.')//end of word
        {
          if (settings.endOfWordAction.jumpBack) {
            let ind = data['parentA'][currentIndex - 1];

            while (ind != currentIndex && data['userGrid'][ind - 1] != '')
              ind++;

            if (data['userGrid'][ind - 1] !== '.')
              setCurrentIndex(ind);
          }
          else if (settings.endOfWordAction.jumpNext) {
            let nw = (currentWord + 1) % (data.word.length + 1);
            if (nw === 0)
              nw++;
            if (data.word[nw - 1].align === 'D')
              changeDirection();
            setCurrentWord(nw);
            setCurrentIndex(data.word[nw - 1].index);

          }
        }
        else {
          let ind = currentIndex;
          // console.log(ind,'before')
          do {
            ind++;
            moveForward();
          } while (settings.navigation.skipFilledSquares && ind % cols && data['userGrid'][ind - 1] !== '.' && data['userGrid'][ind - 1] !== '');
          // console.log(ind,'after')
          if (settings.navigation.skipFilledSquares && settings.endOfWordAction.jumpNext && !settings.endOfWordAction.jumpBack)
            setCurrentIndex(prev => {
              if (data['userGrid'][prev - 1] !== '') {

                let nw = (currentWord + 1) % (data.word.length + 1);
                if (nw === 0)
                  nw++;
                setCurrentWord(nw);
                if (data.word[currentWord - 1].align === 'D')
                  setDirection(1);
                return data.word[currentWord - 1].index;
              }
              else
                return prev;
            })
        }
      }
      let newData = { ...data };
      return newData;
    })
  }

  const onSpaceBar = () => {
    if (settings.spacebarAction === 'toggle')
      changeDirection();
    else {
      setData(data => {
        data['userGrid'][currentIndex - 1] = '';
        const cols = data.size.cols;
        const n = cols * data.size.rows;
        if (direction)//vertical
        {
          //if end of word
          if (currentIndex + cols > n || data['grid'][currentIndex + cols - 1] === '.')
            setCurrentIndex(data['parentD'][currentIndex - 1]);
          else
            moveDown();
        }
        else {//horizontal

          if (currentIndex % cols === 0 || data['grid'][currentIndex] === '.')//end of word
            setCurrentIndex(data['parentA'][currentIndex - 1]);
          else
            moveForward();
        }
        let newData = { ...data };
        return newData;
      })
    }
  }

  const onBackSpace = () => {
    setData(data => {
      let cols = data.size.cols;
      data['userGrid'][currentIndex - 1] = '';
      if (direction) {
        if (data.isSOWD[currentIndex - 1]) {
          if (settings.navigation.backspaceIntoPrevious) {
            let pw;
            if (currentWord === 1)
              pw = data.word.length;
            else
              pw = currentWord - 1;
            if (data.word[pw - 1].align === 'A')
              changeDirection();
            if (data.word[pw - 1].align === 'A') {
              let ind = data.word[pw - 1].number;
              let len = data.answers['across'][ind].length;
              let index = data.word[pw - 1].index;

              setCurrentIndex(index + len - 1);
            }
            else {
              let ind = data.word[pw - 1].number;
              let len = data.answers['down'][ind].length;
              let index = data.word[pw - 1].index;

              setCurrentIndex(index + (len - 1) * cols);
            }

            setCurrentWord(pw);
          }
        }
        else if (currentIndex - cols > 0 && data['userGrid'][currentIndex - cols - 1] !== '.')
          setCurrentIndex(prev => prev - cols);
      }
      else {
        if (data.isSOWA[currentIndex - 1]) {
          if (settings.navigation.backspaceIntoPrevious) {
            let pw;
            if (currentWord === 1)
              pw = data.word.length;
            else
              pw = currentWord - 1;

            if (data.word[pw - 1].align === 'D')
              changeDirection();
            if (data.word[pw - 1].align === 'A') {
              let ind = data.word[pw - 1].number;
              //  console.log(data.answers)
              let index = data.word[pw - 1].index;
              let len = data.answers['across'][ind].length;

              setCurrentIndex(index + len - 1);
            }
            else {
              let ind = data.word[pw - 1].number;
              let index = data.word[pw - 1].index;
              let len = data.answers['down'][ind].length;
              //  console.log(index,len-1)
              setCurrentIndex(index + (len - 1) * cols);
            }


            setCurrentWord(pw);
          }
        }
        else if (currentIndex > 1 && data['userGrid'][currentIndex - 2] !== '.')
          setCurrentIndex(prev => prev - 1);
      }
      const newData = { ...data };
      return newData;
    })
  }

  const checkGame = () => {
    let valid = true;
    for (let i = 0; i < data['userGrid'].length; i++)
      if (data['userGrid'][i] !== data['grid'][i]) {
        valid = false;
        break;
      }
    if (valid) {
      stopTimer()
      if (settings.interactions.playSound)
        music.current.play();
      alert("congratulation! You won")
      music.current.pause()

    }
    else
      alert("OH NO! puzzle not valid")
  }

  const revealGame = () => {
    if (settings.interactions.playSound)
      music.current.play();
    setData(data => {
      for (let i = 0; i < data['userGrid'].length; i++)
        data['userGrid'][i] = data['grid'][i]
      return { ...data };
    })
    setTimeout(() => {
      stopTimer();

      alert("congratulation! You won")
      music.current.pause()
    }, 1000);
  }

  const onclickClue = (direction, index) => {
    setDirection(direction)
    setCurrentIndex(index);
  }
  return { data, currentIndex, direction, changeCurrentIndex, resetGrid, checkGame, revealGame, onclickClue };
}

