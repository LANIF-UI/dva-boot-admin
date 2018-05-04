import $$ from 'cmn-utils';

export async function login(payload) {
  return $$.post('/user/login', payload);
}

export async function getMenu(payload) {
  return $$.post('/user/menu', payload);
}