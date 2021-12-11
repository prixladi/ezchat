import type { NextPage } from 'next';
import OneInputForm from '../components/OneInputForm';
import ThemeSwitch from '../components/ThemeSwitch';

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen gap-24 justify-center items-center m-auto max-w-md px-10">
        <ThemeSwitch />
        <h1>EzChat</h1>
        <div className='flex flex-col gap-4'>
          <OneInputForm
            type="text"
            placeholder="Username"
            aria-label="username"
            rightButtonContent="GO!"
          />
          <p className='text-center'>Or start <a className='link'>anonymous</a></p>
        </div>
      </div>
    </>
  );
};

export default Home;
