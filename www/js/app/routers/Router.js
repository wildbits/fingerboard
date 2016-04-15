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
app.routers = app.routers || {};

app.routers.Router = Backbone.Router.extend({

    initialize: function (slider) {
        this.currentView = false;
        this.slider = slider;
        this.history = [];
    },

    routes: {
        ''                                        : 'mainView'
    },

    showView: function(view) {
        var current = this.currentView;
        var cleanup = function () {
            if (current) {
                current.close();
            }
        };
        var currentHash = window.location.hash;
        var index = _.indexOf(this.history, currentHash);
        if (index > -1) {
            this.history = this.history.slice(0, index + 1);
            this.slider.left(view.render().$el, cleanup);
        } else {
            this.history.push(currentHash);
            this.slider.right(view.render().$el, cleanup);
        }
        this.currentView = view;
    },

    mainView: function () {
        var self = this;
        new app.models.Config({id: 'config'}).fetch({
            success: function (config) {
                var view = new app.views.MainView({config: config.toJSON()});
                self.showView(view);
            }
        });

    }

});
