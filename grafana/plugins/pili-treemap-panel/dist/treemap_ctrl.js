'use strict';

System.register(['app/plugins/sdk', 'app/plugins/pili/echarts'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, echarts, _createClass, TreeMapCtrl;

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
        }, function (_appPluginsPiliEcharts) {
            echarts = _appPluginsPiliEcharts.default;
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

            _export('TreeMapCtrl', TreeMapCtrl = function (_MetricsPanelCtrl) {
                _inherits(TreeMapCtrl, _MetricsPanelCtrl);

                function TreeMapCtrl($scope, $injector, $rootScope) {
                    _classCallCheck(this, TreeMapCtrl);

                    var _this = _possibleConstructorReturn(this, (TreeMapCtrl.__proto__ || Object.getPrototypeOf(TreeMapCtrl)).call(this, $scope, $injector));

                    _this.$rootScope = $rootScope;
                    var panelDefaults = {
                        textFontSetting: {
                            fontSize: 10,
                            color: '(255,255,255)'

                        },
                        borderSetting: {
                            borderColor: '(0,0,0)',
                            borderWidth: 1

                        },
                        dataList: null

                    };

                    _.defaults(_this.panel, panelDefaults);
                    _this.events.on('render', _this.onRender.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

                    _this.didRenderThisComponent = false;
                    return _this;
                }

                _createClass(TreeMapCtrl, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('TreeOption', 'public/plugins/pili-treemap-panel/editor.html', 2);
                    }
                }, {
                    key: 'onDataError',
                    value: function onDataError() {
                        console.log("data error!");
                    }
                }, {
                    key: 'onRender',
                    value: function onRender() {
                        this._updateSeries();
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        if (!this.didRenderThisComponent) {
                            this._initSeries();
                            this._treeMapChart = echarts.init(document.getElementById('main'));
                            this._option = {
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{b}: {c}"
                                },
                                toolbox: {
                                    show: false,
                                    feature: {
                                        mark: { show: true },
                                        dataView: { show: true, readOnly: false },
                                        restore: { show: true },
                                        saveAsImage: { show: true }
                                    }
                                },
                                calculable: false,
                                series: this._series

                            };
                            this._treeMapChart.setOption(this._option);
                        }

                        this._changeData(dataList);
                    }
                }, {
                    key: '_changeData',
                    value: function _changeData(dataList) {
                        var array = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = dataList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var data = _step.value;

                                var str = data.target;
                                var name = str.split(': ')[1].split('}')[0];
                                var value = data.datapoints[0][0] * 100;
                                var treeData = { name: name,
                                    value: value.toFixed(2)
                                };
                                array.push(treeData);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        this._series[0].data = array;
                        this._treeMapChart.setOption({
                            series: this._series
                        });
                    }
                }, {
                    key: '_updateSeries',
                    value: function _updateSeries() {
                        var borderColor = this._colorRGB2Hex(this.panel.borderSetting.borderColor);
                        var textColor = this._colorRGB2Hex(this.panel.textFontSetting.color);
                        if (!this._series) {
                            return;
                        }
                        this._series[0].itemStyle.normal.label.textStyle.color = textColor;
                        this._series[0].itemStyle.normal.label.textStyle.fontSize = parseInt(this.panel.textFontSetting.fontSize);
                        this._series[0].itemStyle.normal.borderWidth = parseInt(this.panel.borderSetting.borderWidth);
                        this._series[0].itemStyle.normal.borderColor = borderColor;
                        this._treeMapChart.setOption({
                            series: this._series
                        });
                    }
                }, {
                    key: '_initSeries',
                    value: function _initSeries() {
                        var borderColor = this._colorRGB2Hex(this.panel.borderSetting.borderColor);
                        var textColor = this._colorRGB2Hex(this.panel.textFontSetting.color);
                        this._series = [{
                            name: '矩形图',
                            type: 'treemap',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        formatter: "{b}",
                                        textStyle: {
                                            color: textColor,
                                            fontSize: parseInt(this.panel.textFontSetting.fontSize)
                                        }
                                    },
                                    borderWidth: parseInt(this.panel.borderSetting.borderWidth),
                                    borderColor: borderColor
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: []
                        }];
                    }
                }, {
                    key: '_colorRGB2Hex',
                    value: function _colorRGB2Hex(color) {
                        if (!color) return;
                        var rgb = color.split(',');
                        var r = parseInt(rgb[0].split('(')[1]);
                        var g = parseInt(rgb[1]);
                        var b = parseInt(rgb[2].split(')')[0]);

                        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                        return hex;
                    }
                }]);

                return TreeMapCtrl;
            }(MetricsPanelCtrl));

            _export('TreeMapCtrl', TreeMapCtrl);

            TreeMapCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=treemap_ctrl.js.map
