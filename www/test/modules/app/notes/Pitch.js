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
(function() {


    module("app.notes.Note", {});

    test("constructor from frequency", 6, function(assert) {
        var p1 = new app.notes.Pitch(200); // G3
        equal(p1.labels().octave, 3);
        equal(p1.labels().notes.n, "G");
        var p2 = new app.notes.Pitch(12); // C0
        equal(p2.labels().octave, 0);
        equal(p2.labels().notes.n, "C");
        var p3 = new app.notes.Pitch(40000); // B10
        equal(p3.labels().octave, 10);
        equal(p3.labels().notes.n, "B");
    });

    test("constructor from string label", 5, function(assert) {
        var p1 = new app.notes.Pitch("A4");
        equal(p1.labels().octave, 4);
        equal(p1.labels().notes.n, "A");
        var p2 = new app.notes.Pitch("A#4");
        equal(p2.labels().octave, 4);
        equal(p2.labels().notes['#'], "A");
        var p3 = new app.notes.Pitch("C1");
        equal(p3.labels().notes['n'], 'C');
    });

    test("constructor from octave and semiTones", 4, function(assert) {
        var p1 = new app.notes.Pitch({"octave": 4, "semiTones": 9});
        equal(p1.labels().octave, 4);
        equal(p1.labels().notes.n, "A");
        var p2 = new app.notes.Pitch({"octave": 0, "semiTones": 10});
        equal(p2.labels().octave, 0);
        equal(p2.labels().notes['#'], "A");
    });

    test("Pitch frequency", 1, function(assert) {
        var p1 = new app.notes.Pitch(200); // G3
        equal(p1.frequency(), 196.00);
    });

    test("Pitch add", 8, function(assert) {
        var p1 = new app.notes.Pitch('G3');
        equal(p1.add(1).labels().notes['#'], 'G');
        equal(p1.add(2).labels().notes['n'], 'A');
        var p2 = p1.add(12);
        equal(p2.labels().notes['n'], 'G');
        equal(p2.labels().octave, 4);
        var p3 = p1.add(24);
        equal(p3.labels().notes['n'], 'G');
        equal(p3.labels().octave, 5);
        var p4 = p1.add(-12);
        equal(p4.labels().notes['n'], 'G');
        equal(p4.labels().octave, 2);
    });

})();