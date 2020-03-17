export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    // 组织机构
    '/api/tree/getDept': (options) => {
      return toSuccess([{
        title: '经理',
        key: '0-0',
        children: [{
          title: '技术总监',
          key: '0-0-0',
          children: [
            { title: '生产部', key: '0-0-0-0' },
            { title: '研发部', key: '0-0-0-1' },
            { title: '测试部', key: '0-0-0-2' },
          ],
        }, {
          title: '销售总监',
          key: '0-0-1',
          children: [
            { title: '订单管理部', key: '0-0-1-0' },
            { title: '吹水培训中心', key: '0-0-1-1' },
            { title: '分公司', key: '0-0-1-2' },
          ],
        }, {
          title: '财务总监',
          key: '0-0-2',
        }],
      }, {
        title: '经理媳妇',
        key: '0-1',
        children: [
          { title: '司机小刘', key: '0-1-0-0' },
          { title: '司机小陈', key: '0-1-0-1' },
          { title: '司机小马', key: '0-1-0-2' },
        ],
      }, {
        title: '隔壁老王',
        key: '0-2',
      }], 400)
    },
    // 异步树
    '/api/tree/getAsyncData': (options) => {
      let key = '0';
      if (options.body) {
        key = JSON.parse(options.body);
      }
      return toSuccess([
        {
          title: '子节点0' + key,
          key: '0' + key,
        },
        {
          title: '子节点1' + key,
          key: '1' + key,
        },
        {
          title: '子节点2' + key,
          key: '2' + key,
          isLeaf: true,
        }
      ], 400)
    },
    '/api/tree/getAsyncSearchData': (options) => {
      let title = '0';
      if (options.body) {
        const data = JSON.parse(options.body);
        title = data.search;
      }
      return toSuccess([
        {
          title: `子节点2${title}`,
          key: `2${title}`,
        }
      ], 400)
    },
    // 自定义样式异步树
    '/api/tree/getCustomAsyncData': (options) => {
      let key = '0';
      if (options.body) {
        key = JSON.parse(options.body);
      }
      return toSuccess(mock([
        {
          title: '@city(true)',
          key: '0' + key,
        },
        {
          title: '@cname',
          key: '1' + key,
          isLeaf: true,
          gender: Math.random() > 0.5 ? 1 : 0
        },
        {
          title: '@cname',
          key: '2' + key,
          isLeaf: true,
          gender: Math.random() > 0.5 ? 1 : 0
        }
      ]), 400)
    },
    '/api/tree/getCustomAsyncSearchData': (options) => {
      let title = '0';
      if (options.body) {
        const data = JSON.parse(options.body);
        title = data.search;
      }
      return toSuccess([
        {
          title: `子节点2${title}`,
          key: `2${title}`,
        }
      ], 400)
    },
    // 异步select tree
    '/api/tree/getAsyncTreeSelect': (options) => {
      let key = '0';
      if (options.body) {
        key = JSON.parse(options.body);
      }
      return toSuccess([
        {
          title: '子节点0' + key,
          value: '0' + key,
          key: '0' + key,
        },
        {
          title: '子节点1' + key,
          value: '1' + key,
          key: '1' + key,
        },
        {
          title: '子节点2' + key,
          value: '2' + key,
          key: '2' + key,
          isLeaf: true,
        }
      ], 400)
    },
    // 省市区数据
    '/api/tree/getData': (options) => toSuccess(
      [
        {
          key: "123123",
          title: "只有一级"
        },
        {
          key: "340000",
          title: "安徽省",
          children: [
            {
              key: "341500",
              title: "六安市",
              children: [
                {
                  key: "341522",
                  title: "霍邱县",
                },
                {
                  key: "341525",
                  title: "霍山县",
                },
                {
                  key: "341502",
                  title: "金安区",
                },
                {
                  key: "341524",
                  title: "金寨县",
                },
                {
                  key: "341526",
                  title: "其它区",
                },
                {
                  key: "341521",
                  title: "寿县",
                },
                {
                  key: "341523",
                  title: "舒城县",
                },
                {
                  key: "341503",
                  title: "裕安区",
                }
              ]
            },
            {
              key: "340500",
              title: "马鞍山市",
              children: [
                {
                  key: "340506",
                  title: "博望区",
                }
              ]
            },
            {
              key: "341800",
              title: "宣城市",
              children: [
                {
                  key: "341822",
                  title: "广德县",
                },
                {
                  key: "341824",
                  title: "绩溪县",
                },
                {
                  key: "341825",
                  title: "旌德县",
                }
              ]
            }
          ]
        },
        {
          key: "820000",
          title: "澳门特别行政区",
          children: [
            {
              key: "820100",
              title: "澳门半岛",
            },
            {
              key: "820200",
              title: "离岛",
            }
          ]
        },
        {
          key: "110000",
          title: "北京",
          children: [
            {
              key: "110100",
              title: "北京市",
              children: [
                {
                  key: "110114",
                  title: "昌平区",
                },
                {
                  key: "110105",
                  title: "朝阳区",
                },
                {
                  key: "110103",
                  title: "崇文区",
                },
                {
                  key: "110115",
                  title: "大兴区",
                },
                {
                  key: "110101",
                  title: "东城区",
                },
                {
                  key: "110111",
                  title: "房山区",
                },
                {
                  key: "110106",
                  title: "丰台区",
                },
                {
                  key: "110108",
                  title: "海淀区",
                },
                {
                  key: "110116",
                  title: "怀柔区",
                },
                {
                  key: "110109",
                  title: "门头沟区",
                },
                {
                  key: "110228",
                  title: "密云县",
                },
                {
                  key: "110117",
                  title: "平谷区",
                },
                {
                  key: "110230",
                  title: "其它区",
                },
                {
                  key: "110107",
                  title: "石景山区",
                },
                {
                  key: "110113",
                  title: "顺义区",
                },
                {
                  key: "110112",
                  title: "通州区",
                },
                {
                  key: "110102",
                  title: "西城区",
                },
                {
                  key: "110104",
                  title: "宣武区",
                },
                {
                  key: "110229",
                  title: "延庆县",
                }
              ]
            }
          ]
        },
        {
          key: "450000",
          title: "广西壮族自治区",
          children: [
            {
              key: "450500",
              title: "北海市",
              children: [
                {
                  key: "450502",
                  title: "海城区",
                },
                {
                  key: "450521",
                  title: "合浦县",
                },
                {
                  key: "450522",
                  title: "其它区",
                },
                {
                  key: "450512",
                  title: "铁山港区",
                },
                {
                  key: "450503",
                  title: "银海区",
                }
              ]
            },
            {
              key: "451000",
              title: "百色市",
              children: [
                {
                  key: "451024",
                  title: "德保县",
                },
                {
                  key: "451025",
                  title: "靖西县",
                },
                {
                  key: "451028",
                  title: "乐业县",
                },
                {
                  key: "451027",
                  title: "凌云县",
                },
                {
                  key: "451031",
                  title: "隆林各族自治县",
                },
                {
                  key: "451026",
                  title: "那坡县",
                },
                {
                  key: "451023",
                  title: "平果县",
                },
                {
                  key: "451032",
                  title: "其它区",
                },
                {
                  key: "451022",
                  title: "田东县",
                },
                {
                  key: "451029",
                  title: "田林县",
                },
                {
                  key: "451021",
                  title: "田阳县",
                },
                {
                  key: "451030",
                  title: "西林县",
                },
                {
                  key: "451002",
                  title: "右江区",
                }
              ]
            },
            {
              key: "451400",
              title: "崇左市",
              children: [
                {
                  key: "451424",
                  title: "大新县",
                },
                {
                  key: "451421",
                  title: "扶绥县",
                },
                {
                  key: "451402",
                  title: "江州区",
                },
                {
                  key: "451423",
                  title: "龙州县",
                },
                {
                  key: "451422",
                  title: "宁明县",
                },
                {
                  key: "451481",
                  title: "凭祥市",
                },
                {
                  key: "451482",
                  title: "其它区",
                },
                {
                  key: "451425",
                  title: "天等县",
                }
              ]
            },
            {
              key: "450600",
              title: "防城港市",
              children: [
                {
                  key: "450681",
                  title: "东兴市",
                },
                {
                  key: "450603",
                  title: "防城区",
                },
                {
                  key: "450602",
                  title: "港口区",
                },
                {
                  key: "450682",
                  title: "其它区",
                },
                {
                  key: "450621",
                  title: "上思县",
                }
              ]
            },
            {
              key: "450800",
              title: "贵港市",
              children: [
                {
                  key: "450802",
                  title: "港北区",
                },
                {
                  key: "450803",
                  title: "港南区",
                },
                {
                  key: "450881",
                  title: "桂平市",
                },
                {
                  key: "450821",
                  title: "平南县",
                },
                {
                  key: "450882",
                  title: "其它区",
                },
                {
                  key: "450804",
                  title: "覃塘区",
                }
              ]
            },
            {
              key: "450300",
              title: "桂林市",
              children: [
                {
                  key: "450303",
                  title: "叠彩区",
                },
                {
                  key: "450332",
                  title: "恭城瑶族自治县",
                },
                {
                  key: "450327",
                  title: "灌阳县",
                },
                {
                  key: "450331",
                  title: "荔浦县",
                },
                {
                  key: "450322",
                  title: "临桂区",
                },
                {
                  key: "450323",
                  title: "灵川县",
                },
                {
                  key: "450328",
                  title: "龙胜各族自治县",
                },
                {
                  key: "450330",
                  title: "平乐县",
                },
                {
                  key: "450333",
                  title: "其它区",
                },
                {
                  key: "450305",
                  title: "七星区",
                },
                {
                  key: "450324",
                  title: "全州县",
                },
                {
                  key: "450304",
                  title: "象山区",
                },
                {
                  key: "450325",
                  title: "兴安县",
                },
                {
                  key: "450302",
                  title: "秀峰区",
                },
                {
                  key: "450311",
                  title: "雁山区",
                },
                {
                  key: "450321",
                  title: "阳朔县",
                },
                {
                  key: "450326",
                  title: "永福县",
                },
                {
                  key: "450329",
                  title: "资源县",
                }
              ]
            },
            {
              key: "451200",
              title: "河池市",
              children: [
                {
                  key: "451227",
                  title: "巴马瑶族自治县",
                },
                {
                  key: "451229",
                  title: "大化瑶族自治县",
                },
                {
                  key: "451224",
                  title: "东兰县",
                },
                {
                  key: "451228",
                  title: "都安瑶族自治县",
                },
                {
                  key: "451223",
                  title: "凤山县",
                },
                {
                  key: "451226",
                  title: "环江毛南族自治县",
                },
                {
                  key: "451202",
                  title: "金城江区",
                },
                {
                  key: "451225",
                  title: "罗城仫佬族自治县",
                },
                {
                  key: "451221",
                  title: "南丹县",
                },
                {
                  key: "451282",
                  title: "其它区",
                },
                {
                  key: "451222",
                  title: "天峨县",
                },
                {
                  key: "451281",
                  title: "宜州市",
                }
              ]
            },
            {
              key: "451100",
              title: "贺州市",
              children: [
                {
                  key: "451102",
                  title: "八步区",
                },
                {
                  key: "451123",
                  title: "富川瑶族自治县",
                },
                {
                  key: "451119",
                  title: "平桂管理区",
                },
                {
                  key: "451124",
                  title: "其它区",
                },
                {
                  key: "451121",
                  title: "昭平县",
                },
                {
                  key: "451122",
                  title: "钟山县",
                }
              ]
            },
            {
              key: "451300",
              title: "来宾市",
              children: [
                {
                  key: "451381",
                  title: "合山市",
                },
                {
                  key: "451324",
                  title: "金秀瑶族自治县",
                },
                {
                  key: "451382",
                  title: "其它区",
                },
                {
                  key: "451323",
                  title: "武宣县",
                },
                {
                  key: "451322",
                  title: "象州县",
                },
                {
                  key: "451321",
                  title: "忻城县",
                },
                {
                  key: "451302",
                  title: "兴宾区",
                }
              ]
            },
            {
              key: "450200",
              title: "柳州市",
              children: [
                {
                  key: "450202",
                  title: "城中区",
                },
                {
                  key: "450205",
                  title: "柳北区",
                },
                {
                  key: "450222",
                  title: "柳城县",
                },
                {
                  key: "450221",
                  title: "柳江县",
                },
                {
                  key: "450204",
                  title: "柳南区",
                },
                {
                  key: "450223",
                  title: "鹿寨县",
                },
                {
                  key: "450227",
                  title: "其它区",
                },
                {
                  key: "450224",
                  title: "融安县",
                },
                {
                  key: "450225",
                  title: "融水苗族自治县",
                },
                {
                  key: "450226",
                  title: "三江侗族自治县",
                },
                {
                  key: "450203",
                  title: "鱼峰区",
                }
              ]
            },
            {
              key: "450100",
              title: "南宁市",
              children: [
                {
                  key: "450126",
                  title: "宾阳县",
                },
                {
                  key: "450127",
                  title: "横县",
                },
                {
                  key: "450105",
                  title: "江南区",
                },
                {
                  key: "450108",
                  title: "良庆区",
                },
                {
                  key: "450123",
                  title: "隆安县",
                },
                {
                  key: "450124",
                  title: "马山县",
                },
                {
                  key: "450128",
                  title: "其它区",
                },
                {
                  key: "450103",
                  title: "青秀区",
                },
                {
                  key: "450125",
                  title: "上林县",
                },
                {
                  key: "450122",
                  title: "武鸣区",
                },
                {
                  key: "450107",
                  title: "西乡塘区",
                },
                {
                  key: "450102",
                  title: "兴宁区",
                },
                {
                  key: "450109",
                  title: "邕宁区",
                }
              ]
            },
            {
              key: "450700",
              title: "钦州市",
              children: [
                {
                  key: "450721",
                  title: "灵山县",
                },
                {
                  key: "450722",
                  title: "浦北县",
                },
                {
                  key: "450723",
                  title: "其它区",
                },
                {
                  key: "450703",
                  title: "钦北区",
                },
                {
                  key: "450702",
                  title: "钦南区",
                }
              ]
            },
            {
              key: "450400",
              title: "梧州市",
              children: [
                {
                  key: "450421",
                  title: "苍梧县",
                },
                {
                  key: "450481",
                  title: "岑溪市",
                },
                {
                  key: "450405",
                  title: "长洲区",
                },
                {
                  key: "450404",
                  title: "蝶山区",
                },
                {
                  key: "450406",
                  title: "龙圩区",
                },
                {
                  key: "450423",
                  title: "蒙山县",
                },
                {
                  key: "450482",
                  title: "其它区",
                },
                {
                  key: "450422",
                  title: "藤县",
                },
                {
                  key: "450403",
                  title: "万秀区",
                }
              ]
            },
            {
              key: "450900",
              title: "玉林市",
              children: [
                {
                  key: "450981",
                  title: "北流市",
                },
                {
                  key: "450923",
                  title: "博白县",
                },
                {
                  key: "450903",
                  title: "福绵区",
                },
                {
                  key: "450922",
                  title: "陆川县",
                },
                {
                  key: "450982",
                  title: "其它区",
                },
                {
                  key: "450921",
                  title: "容县",
                },
                {
                  key: "450924",
                  title: "兴业县",
                },
                {
                  key: "450902",
                  title: "玉州区",
                }
              ]
            }
          ]
        },
        {
          key: "810000",
          title: "香港特别行政区",
          children: [
            {
              key: "810200",
              title: "九龙",
              children: [
                {
                  key: "810205",
                  title: "观塘区",
                },
                {
                  key: "810204",
                  title: "黄大仙区",
                },
                {
                  key: "810201",
                  title: "九龙城区",
                },
                {
                  key: "810203",
                  title: "深水埗区",
                },
                {
                  key: "810202",
                  title: "油尖旺区",
                }
              ]
            },
            {
              key: "810100",
              title: "香港岛",
              children: [
                {
                  key: "810103",
                  title: "东区",
                },
                {
                  key: "810104",
                  title: "南区",
                },
                {
                  key: "810102",
                  title: "湾仔",
                },
                {
                  key: "810101",
                  title: "中西区",
                }
              ]
            },
            {
              key: "810300",
              title: "新界",
              children: [
                {
                  key: "810301",
                  title: "北区",
                },
                {
                  key: "810302",
                  title: "大埔区",
                },
                {
                  key: "810308",
                  title: "葵青区",
                },
                {
                  key: "810309",
                  title: "离岛区",
                },
                {
                  key: "810307",
                  title: "荃湾区",
                },
                {
                  key: "810303",
                  title: "沙田区",
                },
                {
                  key: "810306",
                  title: "屯门区",
                },
                {
                  key: "810304",
                  title: "西贡区",
                },
                {
                  key: "810305",
                  title: "元朗区",
                }
              ]
            }
          ]
        },
        {
          key: "330000",
          title: "浙江省",
          children: [
            {
              key: "330100",
              title: "杭州市",
              children: [
                {
                  key: "330108",
                  title: "滨江区",
                },
                {
                  key: "330127",
                  title: "淳安县",
                },
                {
                  key: "330183",
                  title: "富阳区",
                },
                {
                  key: "330105",
                  title: "拱墅区",
                },
                {
                  key: "330182",
                  title: "建德市",
                },
                {
                  key: "330104",
                  title: "江干区",
                },
                {
                  key: "330185",
                  title: "临安市",
                },
                {
                  key: "330186",
                  title: "其它区",
                },
                {
                  key: "330102",
                  title: "上城区",
                },
                {
                  key: "330122",
                  title: "桐庐县",
                },
                {
                  key: "330106",
                  title: "西湖区",
                },
                {
                  key: "330103",
                  title: "下城区",
                },
                {
                  key: "330109",
                  title: "萧山区",
                },
                {
                  key: "330110",
                  title: "余杭区",
                }
              ]
            },
            {
              key: "330500",
              title: "湖州市",
              children: [
                {
                  key: "330523",
                  title: "安吉县",
                },
                {
                  key: "330522",
                  title: "长兴县",
                },
                {
                  key: "330521",
                  title: "德清县",
                },
                {
                  key: "330503",
                  title: "南浔区",
                },
                {
                  key: "330524",
                  title: "其它区",
                },
                {
                  key: "330502",
                  title: "吴兴区",
                }
              ]
            },
            {
              key: "330400",
              title: "嘉兴市",
              children: [
                {
                  key: "330481",
                  title: "海宁市",
                },
                {
                  key: "330424",
                  title: "海盐县",
                },
                {
                  key: "330421",
                  title: "嘉善县",
                },
                {
                  key: "330402",
                  title: "南湖区",
                },
                {
                  key: "330482",
                  title: "平湖市",
                },
                {
                  key: "330484",
                  title: "其它区",
                },
                {
                  key: "330483",
                  title: "桐乡市",
                },
                {
                  key: "330411",
                  title: "秀洲区",
                }
              ]
            },
            {
              key: "330700",
              title: "金华市",
              children: [
                {
                  key: "330783",
                  title: "东阳市",
                },
                {
                  key: "330703",
                  title: "金东区",
                },
                {
                  key: "330781",
                  title: "兰溪市",
                },
                {
                  key: "330727",
                  title: "磐安县",
                },
                {
                  key: "330726",
                  title: "浦江县",
                },
                {
                  key: "330785",
                  title: "其它区",
                },
                {
                  key: "330702",
                  title: "婺城区",
                },
                {
                  key: "330723",
                  title: "武义县",
                },
                {
                  key: "330782",
                  title: "义乌市",
                },
                {
                  key: "330784",
                  title: "永康市",
                }
              ]
            },
            {
              key: "331100",
              title: "丽水市",
              children: [
                {
                  key: "331122",
                  title: "缙云县",
                },
                {
                  key: "331127",
                  title: "景宁畲族自治县",
                },
                {
                  key: "331102",
                  title: "莲都区",
                },
                {
                  key: "331181",
                  title: "龙泉市",
                },
                {
                  key: "331182",
                  title: "其它区",
                },
                {
                  key: "331121",
                  title: "青田县",
                },
                {
                  key: "331126",
                  title: "庆元县",
                },
                {
                  key: "331124",
                  title: "松阳县",
                },
                {
                  key: "331123",
                  title: "遂昌县",
                },
                {
                  key: "331125",
                  title: "云和县",
                }
              ]
            },
            {
              key: "330200",
              title: "宁波市",
              children: [
                {
                  key: "330206",
                  title: "北仑区",
                },
                {
                  key: "330282",
                  title: "慈溪市",
                },
                {
                  key: "330283",
                  title: "奉化市",
                },
                {
                  key: "330203",
                  title: "海曙区",
                },
                {
                  key: "330205",
                  title: "江北区",
                },
                {
                  key: "330204",
                  title: "江东区",
                },
                {
                  key: "330226",
                  title: "宁海县",
                },
                {
                  key: "330284",
                  title: "其它区",
                },
                {
                  key: "330225",
                  title: "象山县",
                },
                {
                  key: "330212",
                  title: "鄞州区",
                },
                {
                  key: "330281",
                  title: "余姚市",
                },
                {
                  key: "330211",
                  title: "镇海区",
                }
              ]
            },
            {
              key: "330800",
              title: "衢州市",
              children: [
                {
                  key: "330822",
                  title: "常山县",
                },
                {
                  key: "330881",
                  title: "江山市",
                },
                {
                  key: "330824",
                  title: "开化县",
                },
                {
                  key: "330802",
                  title: "柯城区",
                },
                {
                  key: "330825",
                  title: "龙游县",
                },
                {
                  key: "330882",
                  title: "其它区",
                },
                {
                  key: "330803",
                  title: "衢江区",
                }
              ]
            },
            {
              key: "330600",
              title: "绍兴市",
              children: [
                {
                  key: "330621",
                  title: "柯桥区",
                },
                {
                  key: "330684",
                  title: "其它区",
                },
                {
                  key: "330682",
                  title: "上虞区",
                },
                {
                  key: "330683",
                  title: "嵊州市",
                },
                {
                  key: "330624",
                  title: "新昌县",
                },
                {
                  key: "330602",
                  title: "越城区",
                },
                {
                  key: "330681",
                  title: "诸暨市",
                }
              ]
            },
            {
              key: "331000",
              title: "台州市",
              children: [
                {
                  key: "331003",
                  title: "黄岩区",
                },
                {
                  key: "331002",
                  title: "椒江区",
                },
                {
                  key: "331082",
                  title: "临海市",
                },
                {
                  key: "331004",
                  title: "路桥区",
                },
                {
                  key: "331083",
                  title: "其它区",
                },
                {
                  key: "331022",
                  title: "三门县",
                },
                {
                  key: "331023",
                  title: "天台县",
                },
                {
                  key: "331081",
                  title: "温岭市",
                },
                {
                  key: "331024",
                  title: "仙居县",
                },
                {
                  key: "331021",
                  title: "玉环县",
                }
              ]
            },
            {
              key: "330300",
              title: "温州市",
              children: [
                {
                  key: "330327",
                  title: "苍南县",
                },
                {
                  key: "330322",
                  title: "洞头县",
                },
                {
                  key: "330303",
                  title: "龙湾区",
                },
                {
                  key: "330302",
                  title: "鹿城区",
                },
                {
                  key: "330304",
                  title: "瓯海区",
                },
                {
                  key: "330326",
                  title: "平阳县",
                },
                {
                  key: "330383",
                  title: "其它区",
                },
                {
                  key: "330381",
                  title: "瑞安市",
                },
                {
                  key: "330329",
                  title: "泰顺县",
                },
                {
                  key: "330328",
                  title: "文成县",
                },
                {
                  key: "330324",
                  title: "永嘉县",
                },
                {
                  key: "330382",
                  title: "乐清市",
                }
              ]
            },
            {
              key: "330900",
              title: "舟山市",
              children: [
                {
                  key: "330921",
                  title: "岱山县",
                },
                {
                  key: "330902",
                  title: "定海区",
                },
                {
                  key: "330903",
                  title: "普陀区",
                },
                {
                  key: "330923",
                  title: "其它区",
                },
                {
                  key: "330922",
                  title: "嵊泗县",
                }
              ]
            }
          ]
        }
      ]
      , 400),
  }
}