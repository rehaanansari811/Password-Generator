import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characaterAllowed, setcharacaterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789";
    if (characaterAllowed) str += "`~!@#$%^&*()-_+={}[]|\:;'<,>.?/"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, characaterAllowed, setPassword])

  const copyPasswordClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characaterAllowed, passwordGenerator])

  return (
    <>
      <div className="main h-screen bg-no-repeat bg-cover flex flex-col items-center  justify-center  bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        {/* <h1 className='text-4xl uppercase'>Password Generator</h1> */}
        <div className="passwordBox rounded-md backdrop-blur-lg text-slate-800 bg-white/30 h-3/5 w-[70%] lg:w-[40%] flex flex-col px-12 py-14 justify-evenly">
          <h2 className='text-3xl text-slate-800'>Password Generator</h2>
          <div className="lengthBox flex justify-between flex-wrap gap-2">
            <input
              type="range"
              min={6}
              max={100}
              onChange={(e) => { setlength(e.target.value) }}
              className='w-[65%] cursor-pointer '
            />
            <label className="p-2 bg-white rounded-md text-[15px]">Length: {length} </label>
          </div>
          <div className="checkBoxes flex gap-1 my-3">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="checkBoxes flex gap-1 ">
            <input type="checkbox"
              defaultChecked={characaterAllowed}
              id='charInput'
              onChange={() => {
                setcharacaterAllowed((prev) => !prev);
              }}

            />
            <label htmlFor="charInput">Characters</label>
          </div>
          <div className="resultBox flex-col flex py-3 gap-3">
            <input type="text" value={password} ref={passwordRef}
              className='px-3 py-4 rounded-md backdrop-blur-lg bg-white/30 focus:outline-none ' />
            <div className="butts flex justify-evenly flex-wrap gap-2">
              <button className=' bg-blue-600 text-white p-2 rounded-md ' onClick={()=>{passwordGenerator()}}>Generate Password</button>
              <button className='capitalize bg-white text-blue-600 p-2 rounded-md' onClick={copyPasswordClipboard}>Copy to clipboard</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App