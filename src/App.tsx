import { useState } from 'react';
import './App.css';
import Form from './app/Form';
import { GreenTickIcon } from './icons';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        New User
      </h1>

      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
          <Form onSuccess={() => setIsSuccess(true)} />

          {isSuccess && (
            <div className="flex flex-col items-center justify-center gap-5 w-full h-full bg-white absolute top-0 left-0">
              <GreenTickIcon className="w-24" />
              <div className="text-black text-xl font-semibold">
                Congrats, you are successfully registered
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
