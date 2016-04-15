/**
 * Copyright 2015 wildbits.github.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
app.views = app.views || {};

app.views.MainView = (function () {

    var template = 'templates/MainView.html';

    app.cache.Cache.get(template);

    // TODO render the scale details
    // number of #, b
    // notes
    // possible notations (Maj, Min, etc)

    return app.views.BaseView.extend({

        tagName: 'div',

        initialize: function (options) {
            app.views.BaseView.prototype.initialize.apply(this, arguments);
        },

        events: {
            'change .select-scale': 'scaleChanged'
        },

        scaleChanged: function (e) {
            var $select = $(e.target);
            var selected = $select.find("option:selected").attr("value");
            this.renderBoard(selected);
        },

        SCALES: [
            {"scale": "All #",                          "tonic": "C1",  "intervals": [1,1,1,1,1,1,1,1,1,1,1,1], "prefAlt": "#"},
            {"scale": "All b",                          "tonic": "C1",  "intervals": [1,1,1,1,1,1,1,1,1,1,1,1], "prefAlt": "b"},
            {"scale": "C Maj, A Min",                   "tonic": "C1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "#"},
            {"scale": "G Maj, E Min",                   "tonic": "G1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "#"},
            {"scale": "D Maj, B Min",                   "tonic": "D1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "#"},
            {"scale": "A Maj, F# Min",                  "tonic": "A1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "#"},
            {"scale": "E Maj, C# Min",                  "tonic": "E1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "#"},
            {"scale": "B Maj, Cb Maj, G# Min, Ab Min",  "tonic": "B1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "#"},
            {"scale": "F# Maj, Gb Maj, D# Min, Eb Min", "tonic": "F#1", "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "b"},
            {"scale": "Db Maj, C# Maj, Bb Min, A# Min", "tonic": "Db1", "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "b"},
            {"scale": "Ab Maj, F Min",                  "tonic": "Ab1", "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "b"},
            {"scale": "Eb Maj, C Min",                  "tonic": "Eb1", "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "b"},
            {"scale": "Bb Maj, G Min",                  "tonic": "Bb1", "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "b"},
            {"scale": "F Maj, D Min",                   "tonic": "F1",  "intervals": [2, 2, 1, 2, 2, 2, 1], "prefAlt": "b"},
            
            {"scale": "Arpège C Maj, A Min",            "tonic": "C1",  "intervals": [4, 3, 4, 1], "prefAlt": "#"},
            {"scale": "Arpège G Maj, E Min",            "tonic": "G1",  "intervals": [4, 3, 4, 1], "prefAlt": "#"},
            {"scale": "Arpège D Maj, B Min",            "tonic": "D1",  "intervals": [4, 3, 4, 1], "prefAlt": "#"},
            {"scale": "Arpège A Maj, F# Min",                  "tonic": "A1",  "intervals": [4, 3, 4, 1], "prefAlt": "#"},
            {"scale": "Arpège E Maj, C# Min",                  "tonic": "E1",  "intervals": [4, 3, 4, 1], "prefAlt": "#"},
            {"scale": "Arpège B Maj, Cb Maj, G# Min, Ab Min",  "tonic": "B1",  "intervals": [4, 3, 4, 1], "prefAlt": "#"},
            {"scale": "Arpège F# Maj, Gb Maj, D# Min, Eb Min", "tonic": "F#1", "intervals": [4, 3, 4, 1], "prefAlt": "b"},
            {"scale": "Arpège Db Maj, C# Maj, Bb Min, A# Min", "tonic": "Db1", "intervals": [4, 3, 4, 1], "prefAlt": "b"},
            {"scale": "Arpège Ab Maj, F Min",                  "tonic": "Ab1", "intervals": [4, 3, 4, 1], "prefAlt": "b"},
            {"scale": "Arpège Eb Maj, C Min",                  "tonic": "Eb1", "intervals": [4, 3, 4, 1], "prefAlt": "b"},
            {"scale": "Arpège Bb Maj, G Min",                  "tonic": "Bb1", "intervals": [4, 3, 4, 1], "prefAlt": "b"},
            {"scale": "Arpège F Maj, D Min",                   "tonic": "F1",  "intervals": [4, 3, 4, 1], "prefAlt": "b"},
            
            {"scale": "C",                   "tonic": "C1",   "intervals": [0], "prefAlt": "#"},
            {"scale": "C#",                  "tonic": "C#1",  "intervals": [0], "prefAlt": "#"},
            {"scale": "D",                   "tonic": "D1",   "intervals": [0], "prefAlt": "#"},            
            {"scale": "D#",                  "tonic": "D#1",  "intervals": [0], "prefAlt": "#"},
            {"scale": "E",                   "tonic": "E1",   "intervals": [0], "prefAlt": "#"},
            {"scale": "F",                   "tonic": "F1",   "intervals": [0], "prefAlt": "#"},
            {"scale": "F#",                  "tonic": "F#1",  "intervals": [0], "prefAlt": "#"},
            {"scale": "G",                   "tonic": "G1",   "intervals": [0], "prefAlt": "#"},
            {"scale": "G#",                  "tonic": "G#1",  "intervals": [0], "prefAlt": "#"},
            {"scale": "A",                   "tonic": "A1",   "intervals": [0], "prefAlt": "#"},
            {"scale": "A#",                  "tonic": "A#1",  "intervals": [0], "prefAlt": "#"},
            {"scale": "B",                   "tonic": "B1",   "intervals": [0], "prefAlt": "#"},
        ],

        renderBoard: function (selected) {
            this.$el.find('.scale .fingerboard-container').replaceWith(new app.views.FingerBoardView({
                model: new app.models.FingerBoard({
                    'tonic': this.SCALES[selected].tonic,
                    'intervals': this.SCALES[selected].intervals,
                    'prefAlt': this.SCALES[selected].prefAlt
                }),
                config: this.config
            }).render().$el);
        },

        renderScaleDetails: function (selected) {
            this.$el.find('.scale .scale-details-container').replaceWith(new app.views.ScaleDetailsView({
                model: new app.models.FingerBoard(this.SCALES[selected]),
                config: this.config
            }).render().$el);
        },

        render: function () {

            var self = this;

            app.cache.Cache.get(template, function(data) {

                self.$el.html(_.template(data)({
                    config: self.config
                }));

                var values = [];
                for (var i = 0 ; i < self.SCALES.length ; i++) {
                    values.push({"name": i, "value": self.SCALES[i].scale});
                }

                var def = '0';
                self.$el.find('.scale').prepend(new app.views.OptionView({
                    model: new app.models.Option({
                        name: 'scale',
                        data: '',
                        default: def,
                        values: values
                    }),
                    config: self.config
                }).render().$el);

                self.renderBoard(def);
                self.renderScaleDetails(def);

            });

            return this;
        }

    });

})();