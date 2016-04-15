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

app.views.ScaleDetailsView = (function () {

    var template = 'templates/ScaleDetailsView.html';

    app.cache.Cache.get(template);

    return app.views.BaseView.extend({

        tagName: 'div',

        className: 'scale-details-container',

        initialize: function (options) {
            app.views.BaseView.prototype.initialize.apply(this, arguments);
        },

        render: function () {

            var self = this;

            app.cache.Cache.get(template, function(data) {

                var tonic = new app.notes.Pitch(self.model.attributes.tonic);
                var intervals = self.model.attributes.intervals;
                var prefAlt = self.model.attributes.prefAlt;
                var scale = self.model.attributes.scale;

                var SEMITONE_COVERAGE = 13;

                self.$el.html(_.template(data)({
                    model: {

                    },
                    config: self.config
                }));


                var scale = [];
                for (var i in intervals) {
                    scale.push(tonic.semiToneIndex());
                    tonic = tonic.add(intervals[i]);
                }

                for (var string = 0 ; string < strings.length ; string++){
                    var pitch = new app.notes.Pitch(strings[string]);
                    for (var semiTones = 0 ; semiTones < SEMITONE_COVERAGE ; semiTones++) {
                        var active = scale.indexOf(pitch.semiToneIndex()) != -1;
                        //
                    }
                }
            });
            return this;
        }

    });

})();