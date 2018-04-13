import $$ from 'cmn-utils';
// 模拟
export async function login(params) {
  return $$.post('/auth/login');
}