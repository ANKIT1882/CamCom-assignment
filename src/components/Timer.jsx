

export default function Timer({timer,pauseTimer, playTimer,isActive,stop}){
 

    return (
        <div>
            <div className="flex space-x-1 ml-5">
            <p>{timer.min} min</p>
            <p>{timer.sec} sec</p>
            {
               
                isActive &&  !stop &&
                <img src='/pause.svg' className="w-10 h-10 cursor-pointer"
                onClick={pauseTimer}
                />
            }
               {
             !isActive && !stop &&
             <img src='/play.svg' className="w-10 h-10 cursor-pointer" 
             onClick={playTimer}
             />
               }
            
        </div>
       {
        !isActive && !stop && 
        <div className="w-[100%]  h-[100vh] backdrop-blur-sm">
             <p className="m-auto w-fit text-5xl">
                Game paused at {timer.min} min {timer.sec} sec
             </p>
             <p className="w-fit m-auto font-bold">
                click on play icon to resume
             </p>
        </div>
       }
        </div>
    )
}