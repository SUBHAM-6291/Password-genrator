import React, { useState, useCallback } from 'react';

const App = () => {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      characters += '0123456789';
    }
    if (charAllowed) {
      characters += '!@#$%^&*()_+[]{}<>?';
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="gap-5">
      <div className="transform-border uppercase w-full max-w-md mx-auto shadow-md rounded-lg px-9 my-8 text-white text-center py-5 bg-gray-700">
        Password Generator

        <div className="flex bg-zinc-100 shadow rounded-lg overflow-hidden text-black mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
          />

          <div>
            <button
              className="outline-none bg-blue-700 text-white h-12 px-3 py-0.5 shrink-0"
              type="button"
              onClick={() => {
                if (password) {
                  navigator.clipboard.writeText(password);
                  alert("Password copied to clipboard!");
                }
              }}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="flex text-sm gap-x-2 mb-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
        </div>

        <div className="flex text-sm gap-x-2 mb-4">
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberinput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberinput">Include Numbers</label>
          </div>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charinput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charinput">Include Special Characters</label>
          </div>
        </div>

        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
