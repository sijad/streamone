import {setConsole} from 'react-query';

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

export * from './rpan';
