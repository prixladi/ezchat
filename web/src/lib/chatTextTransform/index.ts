import * as R from 'ramda';

const encode = (str?: string): string | null => {
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

const decode = (str?: string): string | null => {
  if (R.isNil(str)) {
    return null;
  }

  return str
    .replaceAll('😄', ':D')
    .replaceAll('😄', ':-D')
    .replaceAll('🙂', ':)')
    .replaceAll('🙂', ':-)')
    .replaceAll('🙂', ':]')
    .replaceAll('🙂', ':-]')
    .replaceAll('☹️', ':(')
    .replaceAll('☹️', ':-(')
    .replaceAll('☹️', ':[')
    .replaceAll('☹️', ':-[')
    .replaceAll('😕', ':/')
    .replaceAll('😕', ':-/')
    .replaceAll('😺', ':3')
    .replaceAll('😺', ':-3')
    .replaceAll('😔', '._.')
    .replaceAll('💔', '</3')
    .replaceAll('❤️', '<3');
};

export { encode, decode };
