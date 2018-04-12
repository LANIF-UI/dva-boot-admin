// http://www.wheresrhys.co.uk/fetch-mock/api
import packMock from '@/utils/packMock';
import userInfo from './userInfo';
import work from './work';
import workcheck from './workcheck';

packMock(
  userInfo,
  work,
  workcheck,
);