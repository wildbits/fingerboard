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
app.models = app.models || {};

app.models.FingerBoard = (function () {

    return app.models.BaseModel.extend({

        initialize: function(attributes) {
            this.syncer = app.sync.Syncer.getSync('app.models.FingerBoard', 'mem');
        },

        defaults : {
            strings: ['E1', 'A1', 'D2', 'G2']
        },

        validate: function (attrs) {
            return true;
        }

    });
})();