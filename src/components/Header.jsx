import { useState } from "react"


export default function Header({ resetGrid, checkGame, revealGame, resetTimer, stop, startTimer }) {
    const [open, setOpen] = useState(false);
    const cstyle = "font-bold cursor-pointer hover:bg-gray-100 h-fit p-2"
    if (!stop)
        return (
            <div className="flex space-x-10  w-fit ml-[30%]  shadow-md text-center fixed p-2 select-none">
                <div className={cstyle} onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <p >Clear</p>
                    {open && <div
                        onClick={() => setOpen(false)}
                        className="font-normal text-left mt-1 shadow-2xl border-[0.5px] border-gray-300 cursor-pointer">
                        <p className="hover:bg-gray-400 p-1" onClick={resetGrid}>
                            puzzle
                        </p>
                        <p className="hover:bg-gray-400 p-1"
                            onClick={() => { resetGrid(); resetTimer(); }}
                        >
                            puzzle & timer
                        </p>
                    </div>}
                </div>
                <p className={cstyle} onClick={revealGame}>
                    reveal
                </p>
                <p className={cstyle} onClick={checkGame}>
                    check
                </p>
            </div>
        )
    else
        return <div onClick={() => { resetGrid(); resetTimer(); startTimer(); }}
            className="fixed w-fit ml-[30%] shadow-md text-center p-2 select-none font-bold cursor-pointer"
        >reset</div>
} 