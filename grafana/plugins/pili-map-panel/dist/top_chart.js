'use strict';

System.register(['app/plugins/pili/echarts', 'lodash'], function (_export, _context) {
    "use strict";

    var echarts, _, _createClass, TopChart;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_appPluginsPiliEcharts) {
            echarts = _appPluginsPiliEcharts.default;
        }, function (_lodash) {
            _ = _lodash.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            TopChart = function () {
                function TopChart(elementId) {
                    _classCallCheck(this, TopChart);

                    this._elementId = elementId;
                }

                _createClass(TopChart, [{
                    key: 'setupOption',
                    value: function setupOption() {
                        this._myChart = echarts.init(document.getElementById(this._elementId), 'dark');
                        return {
                            title: {
                                text: 'Top 10',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            grid: {
                                right: 40,
                                top: 70,
                                bottom: 40,
                                width: '70%'
                            },
                            xAxis: {
                                type: 'value',
                                scale: true,
                                position: 'top',
                                boundaryGap: false,
                                splitLine: { show: false },
                                axisLine: { show: false },
                                axisTick: { show: false }
                            },
                            yAxis: {
                                type: 'category',
                                position: 'left',
                                data: []
                            },
                            series: [{
                                id: 'bar',
                                zlevel: 2,
                                type: 'bar',
                                symbol: 'none',
                                data: []
                            }]

                        };
                    }
                }, {
                    key: 'updateDataList',
                    value: function updateDataList(option, dataList) {
                        dataList = dataList.sort(function (element1, element2) {
                            return element2.value - element1.value;
                        });

                        while (dataList.length > 10) {
                            dataList.pop();
                        }
                        option.yAxis = option.yAxis || { data: [] };
                        option.series = option.series || [{
                            id: 'bar', data: []
                        }];

                        var yAxisData = option.yAxis.data;
                        var seriesData = option.series[0].data;

                        dataList.reverse().forEach(function (_ref) {
                            var targetObj = _ref.targetObj,
                                value = _ref.value;

                            yAxisData.push(_.values(targetObj).join('/'));
                            seriesData.push(value);
                        });

                        this._myChart.setOption(option);
                    }
                }]);

                return TopChart;
            }();

            _export('default', TopChart);
        }
    };
});
//# sourceMappingURL=top_chart.js.map
