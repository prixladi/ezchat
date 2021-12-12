import type { NextPage } from 'next';
import { useState } from 'react';
import OneInputForm from '../components/OneInputForm';
import ThemeSwitch from '../components/ThemeSwitch';
import Collapse from '../components/Collapse';

const Home: NextPage = () => {
  const [state, setState] = useState('0');

  return (
    <>
      <Collapse in={state == '0'}>
        <div className="centered-content">
          <ThemeSwitch />
          <div className="flex flex-col gap-4 text-center">
            <h1>EzChat</h1>
            <p>Choose new username or use your already existing account.</p>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <OneInputForm
              isOpen={state == '0'}
              type="text"
              placeholder="Username"
              aria-label="username"
              rightButtonContent="GO!"
              onSubmit={async () => {
                setState('1');
              }}
            />
            <p>
              Or start <a className="link">anonymous</a>
            </p>
          </div>
        </div>
      </Collapse>

      <Collapse in={state == '1'}>
        <div className="centered-content">
          <ThemeSwitch />
          <div className="flex flex-col gap-4 text-center">
            <h1>EzChat</h1>
            <p>Enter password for user &apos;jack&apos;.</p>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <OneInputForm
              isOpen={state == '1'}
              type="password"
              placeholder="**************"
              aria-label="password"
              rightButtonContent="GO!"
              onSubmit={async () => {
                setState('2');
              }}
            />
            <p>
              Or pick{' '}
              <a className="link" onClick={() => setState('0')}>
                different username
              </a>
            </p>
          </div>
        </div>
      </Collapse>

      <Collapse in={state == '2'}>
        <div className="centered-content">
          <ThemeSwitch />
          <div className="flex flex-col gap-4 text-center">
            <h1>EzChat</h1>
            <p>Choose new password for user &apos;jack&apos;.</p>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <OneInputForm
              isOpen={state == '2'}
              type="password"
              placeholder="**************"
              aria-label="password"
              rightButtonContent="GO!"
              onSubmit={async () => {
                setState('3');
              }}
            />
            <p>
              Or pick{' '}
              <a className="link" onClick={() => setState('0')}>
                different username
              </a>
            </p>
          </div>
        </div>
      </Collapse>

      <Collapse in={state == '3'}>
        <div className="centered-content">
          <ThemeSwitch />
          <div className="flex flex-col gap-4 text-center">
            <h1>EzChat</h1>
            <p>Enter email for possible password recovery. This step is optional.</p>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <OneInputForm
              isOpen={state == '3'}
              type="email"
              placeholder="user@email.com"
              aria-label="password"
              rightButtonContent="GO!"
              onSubmit={async () => {
                setState('0');
              }}
            />
            <p>
              Or{' '}
              <a className="link" onClick={() => setState('0')}>
                skip this step
              </a>
            </p>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default Home;
