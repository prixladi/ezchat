import type { NextPage } from 'next';
import { useState } from 'react';
import Collapse from '../components/Collapse';
import Username from '../subpages/index/username';
import PasswordLogin from '../subpages/index/passwordLogin';
import NewPassword from '../subpages/index/newPassword';
import Email from '../subpages/index/email';
import Head from 'next/head';
import { appName } from '../constants';

const Home: NextPage = () => {
  const [state, setState] = useState('0');

  <Head>
    <title>{appName}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>;

  return (
    <>
      <Collapse in={state == '0'}>
        <Username isOpen={state == '0'} setState={setState}></Username>
      </Collapse>

      <Collapse in={state == '1'}>
        <PasswordLogin isOpen={state == '1'} setState={setState}></PasswordLogin>
      </Collapse>

      <Collapse in={state == '2'}>
        <NewPassword isOpen={state == '2'} setState={setState}></NewPassword>
      </Collapse>

      <Collapse in={state == '3'}>
        <Email isOpen={state == '3'} setState={setState}></Email>
      </Collapse>
    </>
  );
};

export default Home;
