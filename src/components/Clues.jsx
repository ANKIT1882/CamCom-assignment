import React from 'react';

const Clues = ({ data, currentIndex, onclickClue }) => {
  const extractNumberAndClue = (clue) => {
    const match = clue.match(/^(\d+)\.\s*(.*)$/);
    if (match) {
      const number = match[1];
      const clueText = match[2];
      return { number, clueText };
    }
    return null;
  };

  return (
    <div className=' md:fixed flex space-x-4 ml-[60%] overflow-scroll h-[200px] md:h-[80%] '>
      <div>
        <h3 className='font-bold'>Across</h3>
        {
          data.clues.across.map((el, ind) => {
            const num = extractNumberAndClue(el).number;
            const st = {
              backgroundColor: (num === data.pcellA[currentIndex - 1]) ? 'gray' : 'white'
            }
            return <p key={ind} style={st} className='p-1 cursor-pointer'
              onClick={() => onclickClue(0, data.indexMap[num - 1])}
            >{el}</p>
          })
        }
      </div>

      <div>
        <h3 className='font-bold'>Down</h3>
        {
          data.clues.down.map((el, ind) => {
            const num = extractNumberAndClue(el).number;

            const st = {
              backgroundColor: (num === data.pcellD[currentIndex - 1]) ? 'gray' : 'white'
            }
            return <p key={ind} style={st} className='p-1  cursor-pointer'
              onClick={() => onclickClue(1, data.indexMap[num - 1])}
            >{el}</p>
          })
        }
      </div>
    </div>
  );
}

export default Clues;
