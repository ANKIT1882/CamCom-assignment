export default function Grid({ data, currentIndex, direction, changeCurrentIndex }) {
  const { cols, rows } = data.size;
  const pstyle = {
    width: `${50 * cols}px`
  }
  return (
    <div style={pstyle} className="flex flex-wrap">
      {


        data.gridnums.map((el, index) => {

          const divStyle = {
            backgroundColor: data['bgColor'][index],
            border: '1px solid black',
            cursor: 'default',
            userSelect: 'none'
          };

          return <div key={index} style={divStyle} className="text-center w-[50px] h-[50px]"
            onClick={() => changeCurrentIndex(index)}
          > <p className="text-xs w-fit text-gray-400 absolute">{el > 0 && el}</p>

            <p className="text-xl text-center ">{data.userGrid[index]}</p></div>
        })
      }
    </div>
  )
}