import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'datatable',

  state: {
    pageData: PageHelper.create(),
    deptTreeData: [],
    dataList: {
      list: []
    },
  }
});