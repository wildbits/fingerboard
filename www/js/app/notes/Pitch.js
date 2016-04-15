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
app = app || {};

app.notes = (function () {

    /**
     * 0  -> C
     * 1  -> C#, Db
     * 2  -> D
     * 3  -> D#, Eb
     * 4  -> E
     * 5  -> F
     * 6  -> F#, Gb
     * 7  -> G
     * 8  -> G#, Ab
     * 9  -> A
     * 10 -> A#, Bb
     * 11 -> B
     */
    var SEMI_TONES = [
        {'n': 'C'},
        {'#': 'C', 'b': 'D'},
        {'n': 'D'},
        {'#': 'D', 'b': 'E'},
        {'n': 'E'},
        {'n': 'F'},
        {'#': 'F', 'b': 'G'},
        {'n': 'G'},
        {'#': 'G', 'b': 'A'},
        {'n': 'A'},
        {'#': 'A', 'b': 'B'},
        {'n': 'B'}
    ];

    var LABEL_TO_SEMI_TONE_INDEX = {
        'C' : 0,
        'C#': 1,
        'Db': 1,
        'D' : 2,
        'D#': 3,
        'Eb': 3,
        'E' : 4,
        'F' : 5,
        'F#': 6,
        'Gb': 6,
        'G' : 7,
        'G#': 8,
        'Ab': 8,
        'A' : 9,
        'A#': 10,
        'Bb': 10,
        'B' : 11
    };

    /**
     * Sorted Standard concert pitch frequencies.
     */
    var FREQ_A440 = [
        // octave 0
        16.352,
        17.324,
        18.354,
        19.445,
        20.602,
        21.827,
        23.125,
        24.500,
        25.957,
        27.500,
        29.135,
        30.868,
        // octave 1
        32.703,
        34.648,
        36.708,
        38.891,
        41.203,
        43.654,
        46.249,
        48.999,
        51.913,
        55.000,
        58.270,
        61.735,
        // octave 2
        65.406,
        69.296,
        73.416,
        77.782,
        82.407,
        87.307,
        92.499,
        97.999,
        103.83,
        110.00,
        116.54,
        123.47,
        // octave 3
        130.81,
        138.59,
        146.83,
        155.56,
        164.81,
        174.61,
        185.00,
        196.00,
        207.65,
        220.00,
        233.08,
        246.94,
        // octave 4
        261.63,
        277.18,
        293.66,
        311.13,
        329.63,
        349.23,
        369.99,
        392.00,
        415.30,
        440.00,
        466.16,
        493.88,
        // octave 5
        523.25,
        554.37,
        587.33,
        622.25,
        659.26,
        698.46,
        739.99,
        783.99,
        830.61,
        880.00,
        932.33,
        987.77,
        // octave 6
        1046.5,
        1108.7,
        1174.7,
        1244.5,
        1318.5,
        1396.9,
        1480.0,
        1568.0,
        1661.2,
        1760.0,
        1864.7,
        1975.5,
        // octave 7
        2093.0,
        2217.5,
        2349.3,
        2489.0,
        2637.0,
        2793.8,
        2960.0,
        3136.0,
        3322.4,
        3520.0,
        3729.3,
        3951.1,
        // octave 8
        4186.0,
        4434.9,
        4698.6,
        4978.0,
        5274.0,
        5587.7,
        5919.9,
        6271.9,
        6644.9,
        7040.0,
        7458.6,
        7902.1,
        // octave 9
        8372.0,
        8869.8,
        9397.3,
        9956.1,
        10548.1,
        11175.3,
        11839.8,
        12543.9,
        13289.8,
        14080.0,
        14917.2,
        15804.3,
        // octave 10
        16744.0,
        17739.7,
        18794.5,
        19912.1,
        21096.2,
        22350.6,
        23679.6,
        25087.7,
        26579.5,
        28160.0,
        29834.5,
        31608.5
    ];

    /**
     * @param index {int} the index of the frequency in the FREQ_A440 table.
     * @returns {number} the octave number (in [0, ..., 10]) corresponding to the given index.
     */
    var freqIndexToOctaveIndex = function (index) {
        return Math.floor(index / 12);
    };

    /**
     * @param index {int} the index of the frequency in the FREQ_A440 table.
     * @returns {number} the semi tone number (in [0, 11]) corresponding to the given index.
     */
    var freqIndexToSemiToneIndex = function (index) {
        return index % 12;
    };

    /**
     * @param stIndex {int} the index of the semi tone
     * @param octaveIndex {int} the index of the octave
     * @returns {int} the index of the frequency in the FREQ_A440 table matching the given semit tone and octave.
     */
    var freqFromIndices = function (stIndex, octaveIndex) {
        return 12 * octaveIndex + stIndex;
    };

    /**
     *
     * @param keys {Array} the sorted array of potential neighbors.
     * @param key {number} the value to search the nearest neighbor for.
     * @returns {int} the index of the nearest neighbor.
     */
    var nearestNeighborSearch = function (keys, key) {
        // trivial and inefficient implementation of nearest neighbor search.
        // assumes a sorted set of keys.
        var minDelta = Number.MAX_VALUE;
        for(var i = keys.length; i--; ) {
            var delta = Math.abs(key - keys[i]);
            if (delta < minDelta) {
                minDelta = delta;
            } else {
                return i + 1;
            }
        }
        return 0;
    };

    /**
     * @param frequency {float} the frequency to be matched to a frequency in the FREQ_A440 table.
     * @returns {int} the index of the frequency from the FREQ_A440 table that is the nearest to the given frequency.
     */
    var nearestFreqIndex = function (frequency) {
        return nearestNeighborSearch(FREQ_A440, frequency);
    };

    var validateFreqIndex = function (index) {
        if (index < 0 || index > FREQ_A440.length - 1) {
            throw 'Illegal frequency index: ' + index;
        }
    };

    var validateOctaveIndex = function (index) {
        if (index < 0 || index > 10) {
            throw 'Illegal octave index: ' + index;
        }
    };

    var validateSemiToneIndex = function (index) {
        if (index < 0 || index > 11) {
            throw 'Illegal semiTone index: ' + index;
        }
    };

    /**
     * @param data {number|string|object} the frequency (e.g. 234.5) or pitch label (e.g. "C#2") or
     *        object (e.g. {"octave": 3, "semiTones": 5} or {"freqIndex": 42})
     */
    var Pitch = function (data) {
        if (typeof data === 'number') {
            this.freqIndex = nearestFreqIndex(data);
            this.stIndex = freqIndexToSemiToneIndex(this.freqIndex);
            this.octaveIndex = freqIndexToOctaveIndex(this.freqIndex);
        } else if (typeof data === 'string') {
            if (data.length < 2) {
                throw 'Pitch label miss-formatted (too short)';
            }
            var label = data.slice(0, -1);
            this.stIndex = LABEL_TO_SEMI_TONE_INDEX[label];
            if (this.stIndex === undefined) {
                throw 'Unsupported label: ' + label;
            }
            var octave = data.slice(-1);
            this.octaveIndex = parseInt(octave);
            this.freqIndex = freqFromIndices(this.stIndex, this.octaveIndex);
        } else if (typeof data === 'object') {
            if (data['freqIndex'] !== undefined) {
                this.freqIndex = data['freqIndex'];
                this.stIndex = freqIndexToSemiToneIndex(this.freqIndex);
                this.octaveIndex = freqIndexToOctaveIndex(this.freqIndex);
            } else if (data['octave'] !== undefined && data['semiTones'] !== undefined) {
                this.octaveIndex = parseInt(data['octave']);
                this.stIndex = parseInt(data['semiTones']);
                this.freqIndex = freqFromIndices(this.stIndex, this.octaveIndex);
            } else {
                throw 'Unsupported build parameters: ' + data;
            }
        } else {
            throw 'Unable to build a pitch given the data: ' + data;
        }

        // validate fields
        validateFreqIndex(this.freqIndex);
        validateOctaveIndex(this.octaveIndex);
        validateSemiToneIndex(this.stIndex);

        /**
         * Add the given amount of tone to the current pitch and return an instance of the new {app.notes.Pitch} pitch.
         *
         * @param semiTones {number} the number of semi tones to add (positive) or remove (negative) from the current pitch.
         * @returns {Pitch} the new pitch.
         */
        this.add = function (semiTones) {
            var freqIndex = this.freqIndex + semiTones;
            return new Pitch({"freqIndex": freqIndex});
        };

        /**
         * @returns {number} the pitch frequency
         */
        this.frequency = function () {
            return FREQ_A440[this.freqIndex];
        };

        /**
         * @returns {int} the pitch frequency index.
         */
        this.frequencyIndex = function () {
            return this.freqIndex;
        };

        /**
         * @returns {int} the pitch semi tone index.
         */
        this.semiToneIndex = function () {
            return this.stIndex;
        };

        /**
         * @returns {object} an object combining the octave and labels
         */
        this.labels = function () {
            return {"octave": this.octaveIndex,
                    "notes" : SEMI_TONES[this.stIndex]}
        };
    };

    return {
        Pitch: Pitch
    };

}());




