import $$ from 'cmn-utils';
// 模拟
export async function login(params) {
  return $$.post('/site_operations_pc/auth/login');
}