import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.post('/user/login', payload);
}