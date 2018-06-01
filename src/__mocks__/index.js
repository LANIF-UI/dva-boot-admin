// http://www.wheresrhys.co.uk/fetch-mock/api
import packMock from '@/utils/packMock';
import user from './user';
import crud from './crud';
import tree from './tree';
import datatable from './datatable';
import charts from './charts';

packMock(
  user,
  crud,
  tree,
  datatable,
  charts,
);