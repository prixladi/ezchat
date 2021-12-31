import { FormUtils } from '@lib/components/oneInputForm';
import { maxChannelCodeLength, minChannelCodeLength } from '@lib/constants';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { getRandomChannelCode, validateChannelCode } from '../utils';

const useChannelPick = () => {
  const router = useRouter();
  const [prefix, setPrefix] = useState('/');

  useEffect(() => {
    setPrefix(
      `${window.location.hostname}:${
        window.location.port === '80' || window.location.port === '443' ? '' : window.location.port
      }/`,
    );
  }, []);

  const trySetChannel = async (code: string, { setError }: FormUtils) => {
    if (code.length > 0 && !validateChannelCode(code)) {
      setError(
        `Channel code must be a alphanumberic string between ${minChannelCodeLength} and ${maxChannelCodeLength} charactares long`,
      );

      return;
    }

    const channelRoute = R.isNil(code) || code === '' ? getRandomChannelCode() : code;
    router.push(channelRoute);
  };

  return { prefix, trySetChannel };
};

export default useChannelPick;
