var myChart = echarts.init(document.getElementById('sxmap'));


// 注意引入版本
// 注意不同版本使用差别

var data = [                        //元素为对象的数组
    { name: '甘肃', value: 10 },
    { name: '青海', value: 10 },
    { name: '广西', value: 10 },
    { name: '贵州', value: 10 },
    { name: '重庆', value: 10 },
    { name: '北京', value: 10 },
    { name: '福建', value: 10 },
    { name: '安徽', value: 1000 },
];
var scatterData= [                        //元素为对象的数组
    { name: '甘肃', value: 10 },
    { name: '青海', value: 10 },
    { name: '广西', value: 10 },
    { name: '贵州', value: 10 },
    { name: '重庆', value: 10 },
    { name: '北京', value: 10 },
    { name: '福建', value: 10 },
    { name: '安徽', value: 10 },
];

var geoCoordMap = {                 //对象
    '甘肃': [104.35851932200904, 35.40123159456249],
    '青海': [98.77753991113792, 36.53004669909589],
    '广西': [107.99655439706783, 23.735673935703687],
    '贵州': [106.25837527859625, 26.505908922458815],
    '重庆': [106.59396202962392, 29.737597968171656],
    '北京': [116.35679568867022, 40.25702627244448],
    '福建': [117.7802840500002, 26.617417710000097],
    '安徽': [116.62978356256133, 32.13288035704295],
    '广东': [112.38982181100027, 23.09589264500019],
    '西藏': [91.67781334810746, 29.081958115774455],
    '新疆': [86.36633990098284, 42.722922619141826],
    '海南': [109.68506920700003, 19.15330638200004],
    '宁夏': [106.65764611237813, 37.85293528913229],
    '陕西': [108.11004520082531, 33.38519318281914],
    '山西': [111.72104861939818, 36.35586904611952],
    '湖北': [111.37402265791923, 31.417539985382007],
    '湖南': [110.902381220417, 28.066339830418826],
    '四川': [103.4985530948494, 30.67739736629541],
    '云南': [100.29696333219198, 25.721744899807277],
    '河北': [115.64873628100008, 38.04465116700004],
    '河南': [113.46032230023388, 34.15787079530108],
    '辽宁': [123.35254967500032, 40.48240794500012],
    '山东': [118.28029535679576, 36.076608741968954],
    '天津': [117.65956331411487, 39.21855181203543],
    '江西': [115.17473025869447, 27.407869370774904],
    '江苏': [120.34094130672383, 32.49093327643905],
    '上海': [121.64094130672383, 31.02093327643905],
    '浙江': [120.28535242000021, 29.10194563100012],
    '吉林': [126.25284846284336, 43.46916859112878],
    '内蒙古': [108.41327478505161, 40.317334824121446],
    '黑龙江': [131.25284846284336, 46.46916859112878],
    '香港': [114.0517684250002, 22.32851797100014],
    '澳门': [111.95860436300031, 21.8],
    '台湾': [120.63599694100014, 23.222805080000114],
}

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)   //新值= 坐标+旧值；
            });
        }
    }
    return res;                                         // [113.57, 37.85, 31]
};

option = {
    backgroundColor: '#fff',
    title: {
        // text: '矿山灾害点危险性展示',
        left: 'center',
        textStyle: {
            // color: '#fff',
            fontSize: 25
        }
    },
    tooltip: {           //提示框组件
        trigger: 'item',
        formatter: '{b} <br/> ',  //{c@[2]}
        show: false
    },

    // legend: {            //图例
    //     // orient: 'vertical',  
    //     y: 'bottom',
    //     x: 'right',
    //     data: ['危害性'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },
    geo: {
        map: "china",
        label: {
            normal: {
                show: true,
            },
            emphasis: {
                show: false
            }
        },
        roam: true, // 支持拖拽
        // center: [112.38, 37.67],
        // zoom: 7,
        itemStyle: {
            normal: {
                // areaColor: "#323c48",
                // borderColor: "#000000"
            },
            emphasis: {
                areaColor: "#2a333d" //悬浮时区域颜色
            }
        },
    },
    visualMap: {
        min: 80,
        max: 500,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
        }
    },
    series: [{
        name: '危险指数：',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),    //选取从 start 到数组结尾的所有元素，该方法并不会修改数组，而是返回一个子数组
        symbolSize: function (val) {
            return val[2] / 2;        //res数组中的第三个元素
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                // formatter: '{@2}',
                position: 'right',
                show: false
            },
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: '#f4e925',// scartter图标的颜色  
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        zlevel: 1
    }
    ]
};

option2 = {
    backgroundColor: '#fff',
    title: {
        left: 'center',
        textStyle: {
            // color: '#fff',
            fontSize: 25
        }
    },
    tooltip: {           //提示框组件
        trigger: 'item',
        // show: false
    },
    visualMap: {
        min: 80,
        max: 500,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['grey', 'lightskyblue']
        }
    },
    series: [
        {
            name: 'china',
            type: 'map',
            mapType: 'china', // 自定义扩展图表类型
            label: {
                show: true
            },
            data: data,
        }
    ]
};

option3 = { // 进行相关配置
    tooltip: {           //提示框组件
        trigger: 'item',
        // formatter: '{b} <br/> ',  //{c@[2]}
        show: true
    },
    visualMap: {  //各市区的颜色由value值得大小定
        show: true,
        text: ['高', '低'],
        showLabel: true,
        seriesIndex: [0],
        min: 1,
        max: 300,
        inRange: {
            color: ['grey', 'blue',]
        },

    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            },
            normal:{
                show:true
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#83caf5',
                borderColor: '#fff',
            },
            emphasis: {
                areaColor: '#aed6f2',
            }
        },
    },
    series: [
        {
            name:"china",
            type: 'map',
            map: 'china',
            geoIndex: 0, //此处地图为geo的第一个值
            data: data,
            label:{
                normal:{
                    show:true
                }
            }
        },
        {
            // name: 'china',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function (val) {
                console.log(val[2])
                return val[2] / 2;        //res数组中的第三个元素
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            // label: {
            //     normal: {
            //         // formatter: '{@2}',
            //         position: 'right',
            //         show: false
            //     },
            //     emphasis: {
            //         show: false
            //     }
            // },
            itemStyle: {
                normal: {
                    color: '#f4e925',// scartter图标的颜色  
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1,
            data: convertData(scatterData),    //选取从 start 到数组结尾的所有元素，该方法并不会修改数组，而是返回一个子数组
        }
    ]
}
myChart.setOption(option3);


/*
a(); 执行一次绘制地图
$(window).resize(function() {   窗口缩放一次
    map.resize();               地图画布缩放一次
    a()                         地图再绘制一次
    */