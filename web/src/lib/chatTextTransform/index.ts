import * as R from 'ramda';

const encode = (str?: string): React.ReactNode | null => {
  if (R.isNil(str)) {
    return null;
  }

  return str
    .replaceAll(':D', '😄')
    .replaceAll(':-D', '😄')
    .replaceAll(':)', '🙂')
    .replaceAll(':-)', '🙂')
    .replaceAll(':]', '🙂')
    .replaceAll(':-]', '🙂')
    .replaceAll(':(', '☹️')
    .replaceAll(':-(', '☹️')
    .replaceAll(':[', '☹️')
    .replaceAll(':-[', '☹️')
    .replaceAll(':/', '😕')
    .replaceAll(':-/', '😕')
    .replaceAll(':3', '😺')
    .replaceAll(':-3', '😺')
    .replaceAll('._.', '😔')
    .replaceAll('</3', '💔')
    .replaceAll('<3', '❤️');
};

const decode = (_: string): string | null => {
  throw new Error('Chat text decoding is not supported');
};

export { encode, decode };
