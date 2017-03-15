'use strict';

System.register(['app/plugins/pili/echarts', './china', './province_in_china'], function (_export, _context) {
    "use strict";

    var echarts, china, provinces, _createClass, MapChart;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_appPluginsPiliEcharts) {
            echarts = _appPluginsPiliEcharts.default;
        }, function (_china) {
            china = _china.default;
        }, function (_province_in_china) {
            provinces = _province_in_china.default;
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

            echarts.registerMap('china', china);

            MapChart = function () {
                function MapChart(elementId) {
                    _classCallCheck(this, MapChart);

                    this._elementId = elementId;
                    this._series = [];
                    this._seriesMap = {};
                    this._legend = {};
                }

                _createClass(MapChart, [{
                    key: '_clearSerieData',
                    value: function _clearSerieData(data) {
                        provinces.forEach(function (province) {
                            var cell = data.find(function (cell) {
                                return cell.name === province;
                            });
                            if (cell) {
                                cell.value = NaN;
                            } else {
                                data.push({
                                    name: province,
                                    value: NaN
                                });
                            }
                        });
                    }
                }, {
                    key: '_updateSerieData',
                    value: function _updateSerieData(province, serieName, value) {
                        var serie = this._seriesMap[serieName];
                        if (!serie) {
                            serie = {
                                name: serieName,
                                type: 'map',
                                mapType: 'china',
                                roam: false,
                                showLegendSymbol: false,
                                data: [],
                                itemStyle: {
                                    normal: {
                                        label: { show: false }
                                    },
                                    emphasis: {
                                        borderWidth: 1,
                                        borderColor: "#fff"
                                    }
                                }
                            };
                            this._seriesMap[serieName] = serie;
                            this._series.push(serie);
                            this._legend.data.push(serieName);
                            this._clearSerieData(serie.data);
                        }
                        var cell = serie.data.find(function (cell) {
                            return cell.name === province;
                        });
                        if (cell) {
                            cell.value = value;
                        }
                    }
                }, {
                    key: 'setupOption',
                    value: function setupOption() {
                        this._myChart = echarts.init(document.getElementById(this._elementId), 'dark');
                        this._legend = {
                            show: true,
                            orient: "vertical",
                            left: "left",
                            data: []
                        };
                        return {
                            legend: this._legend,
                            series: [],

                            tooltip: {
                                trigger: 'item',
                                formatter: '{b}<br/>{c}'
                            },
                            visualMap: {
                                left: "left",
                                top: "bottom",
                                text: ["高", "低"],
                                calculable: true,
                                max: 1100,
                                min: 300,
                                inRange: {
                                    color: ["#0C8918", "#9ED900", "#F05654", "#C91F37"]
                                }
                            },
                            toolbox: {
                                show: true,
                                orient: "vertical",
                                left: "right",
                                top: "center"
                            }
                        };
                    }
                }, {
                    key: 'updateDataList',
                    value: function updateDataList(option, dataList) {
                        var _this = this;

                        this._series.forEach(function (serie) {
                            return _this._clearSerieData(serie.data);
                        });
                        dataList.forEach(function (_ref) {
                            var targetObj = _ref.targetObj,
                                value = _ref.value;

                            if (provinces.indexOf(targetObj.province) == -1) {
                                return;
                            }
                            var targetKeys = [];
                            for (var key in targetObj) {
                                targetKeys.push(key);
                            }
                            targetKeys = targetKeys.sort().filter(function (key) {
                                return key !== 'province';
                            });
                            var targetValues = targetKeys.map(function (key) {
                                return targetObj[key];
                            });
                            var serieName = targetValues.length > 0 ? targetValues.join('-') : 'main';

                            var province = targetObj.province;

                            _this._updateSerieData(province, serieName, value);
                        });
                        this._legend.show = this._legend.data.length > 1;

                        option.series = this._series;
                        option.legend = this._legend;

                        this._myChart.setOption(option);
                    }
                }]);

                return MapChart;
            }();

            _export('default', MapChart);
        }
    };
});
//# sourceMappingURL=map_chart.js.map
