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

app.views.FingerBoardView = (function () {

    var template = 'templates/FingerBoard.html';

    app.cache.Cache.get(template);

    return app.views.BaseView.extend({

        tagName: 'div',

        className: 'fingerboard-container',

        initialize: function (options) {
            app.views.BaseView.prototype.initialize.apply(this, arguments);
        },

        OCTAVE_COLOR: [
            '#001f3f',
            '#0074D9',
            '#7FDBFF',
            '#39CCCC',
            '#3D9970',
            '#2ECC40',
            '#01FF70',
            '#FFDC00',
            '#FF851B',
            '#FF4136'
        ],

        renderFretIndex: function (snap, index, size, x, y) {
            return snap.add(snap.text(x + 1, y+ 1, index).attr({
                fill: '#000',
                'font-size': size + 'px'
            }));
        },

        renderPitchOctave: function (snap, pitch, x, y, radius) {
            var group = snap.g();
            var octave = pitch.labels().octave;

            group.add(snap.circle(x, y, radius).attr({
                fill: '#ffffff',
                stroke: this.OCTAVE_COLOR[octave]
            }));

            group.add(snap.text(x + 1, y + (radius / 2) + 1, octave).attr({
                fill: this.OCTAVE_COLOR[octave],
                'font-size': radius + 'px'
            }));

            return group;
        },

        renderPitchLabel: function (snap, pitch, active, prefAlt, x, y, height, fill) {
            var notes = pitch.labels().notes;
            var text = (notes['n']) ? [notes['n'], ''] : (prefAlt === '#') ? [notes['#'], '#'] : [notes['b'], 'b'] ;
            var label = snap.text(x, y, text).attr({
                'font-size': height + 'px',
                'font-weight': (active) ? 'bold' : 'normal'
            });
            var expHeight = (height / 1.65);
            label.selectAll('tspan:nth-child(2)').attr({
                'font-size': expHeight + 'px',
                'y': (y - expHeight / 2) + 'px'
            });
            return label;
        },

        renderTone: function (snap, pitch, active, prefAlt, x, y) {

            var tone = snap.g();

            var octave = pitch.labels().octave;

            tone.add(this.renderPitchOctave(snap, pitch, x + 15, y + 15, 10));

            tone.add(snap.circle(x, y, 20).attr({
                fill: (active) ? this.OCTAVE_COLOR[octave] : '#ffffff',
                stroke: this.OCTAVE_COLOR[octave],
                strokeWidth: 1
            }));

            tone.add(this.renderPitchLabel(snap, pitch, active, prefAlt, x - 9, y + 9, 24)).attr({
                fill: (active) ? '#f9f9f9' : this.OCTAVE_COLOR[octave],
                frequencyIndex: pitch.frequencyIndex(),
                semiToneIndex: pitch.semiToneIndex()
            });

            return tone;

            // TODO position in Y axis to match frets
            // TODO display neck
            // TODO display harmonics

        },

        render: function () {

            var self = this;

            app.cache.Cache.get(template, function(data) {

                var strings = self.model.attributes.strings;

                var SEMITONE_COVERAGE = 13;

                self.$el.html(_.template(data)({
                    config: self.config
                }));

                var snap = Snap(self.$el.find('.fingerboard')[0]);
                snap.attr({
                    width:  ((strings.length - 1) * 70 + 90) + 'px',
                    height: ((SEMITONE_COVERAGE - 1) * 50 + 48) + 'px'
                });

                var tonic = new app.notes.Pitch(self.model.attributes.tonic);
                var intervals = self.model.attributes.intervals;
                var prefAlt = self.model.attributes.prefAlt;
                var scale = [];
                for (var i in intervals) {
                    scale.push(tonic.semiToneIndex());
                    tonic = tonic.add(intervals[i]);
                }

                for (var string = 0 ; string < strings.length ; string++){
                    var pitch = new app.notes.Pitch(strings[string]);
                    for (var semiTones = 0 ; semiTones < SEMITONE_COVERAGE ; semiTones++) {
                        var active = scale.indexOf(pitch.semiToneIndex()) != -1;
                        if (semiTones > 0) {
                            self.renderFretIndex(snap, semiTones, 20, 0, 27 + semiTones * 50);
                        }
                        self.renderTone(snap, pitch, active, prefAlt, 63 + 70 * string, 21 + semiTones * 50);
                        pitch = pitch.add(1);
                    }
                }
            });
            return this;
        }

    });

})();