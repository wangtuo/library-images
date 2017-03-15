'use strict';

System.register(['app/plugins/sdk', './dark_theme', 'lodash', './map_chart', './top_chart'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, MapChart, TopChart, _slicedToArray, _createClass, PluginCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_dark_theme) {}, function (_lodash) {
            _ = _lodash.default;
        }, function (_map_chart) {
            MapChart = _map_chart.default;
        }, function (_top_chart) {
            TopChart = _top_chart.default;
        }],
        execute: function () {
            _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;

                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);

                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }

                    return _arr;
                }

                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

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

            _export('PluginCtrl', PluginCtrl = function (_MetricsPanelCtrl) {
                _inherits(PluginCtrl, _MetricsPanelCtrl);

                function PluginCtrl($scope, $injector, $rootScope) {
                    _classCallCheck(this, PluginCtrl);

                    var _this = _possibleConstructorReturn(this, (PluginCtrl.__proto__ || Object.getPrototypeOf(PluginCtrl)).call(this, $scope, $injector));

                    _this.$rootScope = $rootScope;

                    var panelDefaults = {
                        pieType: 'pie',
                        legend: {
                            show: true, // disable/enable legend
                            values: true
                        },
                        links: [],
                        datasource: null,
                        maxDataPoints: 3,
                        interval: null,
                        targets: [{}],
                        cacheTimeout: null,
                        nullPointMode: 'connected',
                        legendType: 'Under graph',
                        aliasColors: {},
                        format: 'short',
                        valueName: 'current',
                        strokeWidth: 1,
                        fontSize: '80%',
                        combine: {
                            threshold: 0.0,
                            label: 'Others'
                        }
                    };

                    _.defaults(_this.panel, panelDefaults);
                    _.defaults(_this.panel.legend, panelDefaults.legend);

                    _this.events.on('render', _this.onRender.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    // this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

                    _this._mapChart = new MapChart('map-dom');
                    _this._topChart = new TopChart('top-dom');
                    _this._didRenderThisComponent = false;
                    _this.render();
                    return _this;
                }

                _createClass(PluginCtrl, [{
                    key: 'setUnitFormat',
                    value: function setUnitFormat(subItem) {}
                }, {
                    key: 'changeSeriesColor',
                    value: function changeSeriesColor(series, color) {
                        series.color = color;
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        var mapOption = {},
                            topOption = {};
                        dataList = this._parseData(dataList);

                        if (!this._didRenderThisComponent) {
                            mapOption = this._mapChart.setupOption();
                            topOption = this._topChart.setupOption();
                            this._didRenderThisComponent = true;
                        }
                        this._mapChart.updateDataList(mapOption, dataList);
                        this._topChart.updateDataList(topOption, dataList);
                    }
                }, {
                    key: '_parseData',
                    value: function _parseData(dataList) {
                        var _this2 = this;

                        return dataList.map(function (_ref) {
                            var target = _ref.target,
                                datapoints = _ref.datapoints;

                            var targetMatcher = target.match(/\{.+}/);
                            if (!targetMatcher) {
                                return;
                            }
                            var targetObj = targetMatcher[0];
                            if (!targetObj) {
                                return;
                            }
                            targetObj = _this2._parseTargetObjString(targetObj);
                            var value = datapoints[0][0];

                            return { targetObj: targetObj, value: value };
                        });
                    }
                }, {
                    key: '_parseTargetObjString',
                    value: function _parseTargetObjString(strObj) {
                        var obj = {};
                        var trim = function trim(s) {
                            return s.replace(/(^\s+|\s+$)/, '');
                        };
                        strObj.replace(/(\{|\})/g, '').split(',').forEach(function (cell) {
                            var _trim$split$map = trim(cell).split(':').map(trim),
                                _trim$split$map2 = _slicedToArray(_trim$split$map, 2),
                                key = _trim$split$map2[0],
                                value = _trim$split$map2[1];

                            obj[key] = value;
                        });
                        return obj;
                    }
                }, {
                    key: 'onDataError',
                    value: function onDataError() {
                        console.error('fail to load database');
                    }
                }, {
                    key: 'onRender',
                    value: function onRender() {}
                }]);

                return PluginCtrl;
            }(MetricsPanelCtrl));

            _export('PluginCtrl', PluginCtrl);

            PluginCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=plugin_ctrl.js.map
