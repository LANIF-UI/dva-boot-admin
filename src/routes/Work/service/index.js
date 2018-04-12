import $$ from 'cmn-utils';

export async function getEmployee() {
  return $$.post('/work/getWorkEmployee');
}