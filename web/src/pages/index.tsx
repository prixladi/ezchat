import OneInputForm, { FormUtils } from '@lib/components/oneInputForm';
import ThemeSwitch from '@lib/components/themeSwitch';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import {
  appName,
  minChannelCodeLength,
  maxChannelCodeLength,
  validChannelRegex,
} from '../lib/constants';

const getRandomCode = () => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i += 1) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [prefix, setPrefix] = useState('/');

  useEffect(() => {
    setPrefix(
      `${window.location.hostname}:${
        window.location.port === '80' || window.location.port === '443' ? '' : window.location.port
      }/`,
    );
  }, []);

  const onSubmmit = async (code: string, { setError }: FormUtils) => {
    if (
      code.length > 0 &&
      (code.length < minChannelCodeLength ||
        code.length > maxChannelCodeLength ||
        !validChannelRegex.test(code))
    ) {
      setError(
        `Channel code must be a alphanumberic string between ${minChannelCodeLength} and ${maxChannelCodeLength} charactares long`,
      );

      return;
    }

    router.push(R.isNil(code) || code === '' ? getRandomCode() : code);
  };

  return (
    <div className="centered-content-md">
      <ThemeSwitch />
      <div className="centered-content-block">
        <div>
          <h1>{appName}</h1>
          <span className="description">Simple chat, almost simplistic</span>
        </div>
        <p>
          Create new channel or join existing. You can also leave channel empty to generate random
          channel.
        </p>
      </div>
      <OneInputForm
        type="text"
        prefix={prefix}
        aria-label="channel-code"
        placeholder="channel"
        rightButtonContent="GO!"
        isLoading={false}
        handleSubmit={onSubmmit}
      />
    </div>
  );
};

export default Home;
