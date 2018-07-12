import $$ from 'cmn-utils';

export async function register(payload) {
  return $$.post('/user/register', payload);
}