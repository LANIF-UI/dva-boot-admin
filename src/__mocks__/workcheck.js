/**
 * 模拟作业计划表数据
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    // 表格带分页
    '-/api/site_operations_pc/work/getWorkDetail': (options) => {
      return toSuccess(mock({
        "id": "126ac86dbeed4b458e867790484eaa6d",
        "deptid": "100201",
        "dicDistributionNetwork": "城网",
        "workType": "消缺",
        "planType": "1",
        "address": "@city(true)",
        "planBeginTime": 1521475200000,
        "planEndTime": 1521482400000,
        "actualEndTime": null,
        "content": "@csentence",
        "importType": "1",
        "remark": null,
        "createTime": 1521615091000,
        "creater": "1005",
        "modifyTime": 1521615091000,
        "modifier": "1005",
        "planStatus": null,
        "sendTime": null,
        "changeRemark": null,
        "workEmployeeList|1-3": [{
          "id": "@guid",
          "workPlanId": null,
          "cn": "10021@imserver108",
          "name": "@cname",
          "duty": null,
          "mobile": null,
          "createTime": 1521615091000,
          "creater": "1005",
          "modifyTime": 1521615091000,
          "modifier": "1005",
          "workDateList": [1521630368000],
          "workPicList": [{
            "id": "@guid",
            "employeeId": "d97963f12553474bbe5245a65e7b0ff2",
            "dicPicTypeId": "2",
            "dicPicTypeName": "施工",
            "picType": null,
            "fsFileId": "2",
            "picture": "@dataImage('200x300', '我的照片')",
            "content": "@cparagraph(1, 3)",
            "lon": null,
            "lat": null,
            "address": "@city(true)",
            "picTime": null,
            "createTime": 1521630368000,
            "creater": null,
            "createrName": null,
            "modifyTime": 1521630368000,
            "modifier": null,
            "modifierName": null
          }, {
            "id": "@guid",
            "employeeId": "d97963f12553474bbe5245a65e7b0ff2",
            "dicPicTypeId": "1",
            "dicPicTypeName": "开工",
            "picType": null,
            "fsFileId": null,
            "picture": "@dataImage('200x300', '我的照片')",
            "content": "@cparagraph(1, 3)",
            "lon": null,
            "lat": null,
            "address": "@city(true)",
            "picTime": null,
            "createTime": 1521630368000,
            "creater": null,
            "createrName": null,
            "modifyTime": 1521630368000,
            "modifier": null,
            "modifierName": null
          }],
          "status": "1"
        }]
      }), 400)
    },
  }
}