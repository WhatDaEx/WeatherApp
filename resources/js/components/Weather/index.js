var $ = require('jquery');

/**
 * @TODO Extract error to own component
 * @type {{template: *, data: module.exports.data, ready: module.exports.ready, methods: {update: module.exports.methods.update}}}
 */
module.exports = {
    template: require('./template.html'),

    data: function () {
        return {
            city: '',
            forecast: false,
            googleMaps: false,
            weather: false,
            location: false,
            error: {
                show: false,
                msg: ''
            }
        }
    },

    computed: {
        googleUrl: function () {
            var params = 'address=' + this.city + '&key=' + this.googleMaps;
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?' + encodeURI(params);
            return url;
        },
        forecastUrl: function() {
            var params = this.forecast + '/' + this.location.lat + ',' + this.location.lng;
            var url = 'https://api.forecast.io/forecast/' + encodeURI(params);
            return url;
        }
    },

    ready: function () {
        this.forecast = $('meta[name=forecast]').attr('content');
        this.googleMaps = $('meta[name=google-maps]').attr('content');
    },

    methods: {
        update: function () {
            this.$http.get(this.googleUrl, function(data, status, request) {
                if (data.results.length < 1) {
                    this.showError('No results with this address!');
                    this.reset();
                    return;
                }

                this.location = data.results[0].geometry.location;
                this.$http.jsonp(this.forecastUrl, function(data, status, request) {
                    this.weather = data;
                }.bind(this));
            }.bind(this));
        },

        reset: function() {
            this.location = false;
            this.weather = false;
        },

        showError: function (msg) {
            this.error.show = true;
            this.error.msg = msg;
        },

        hideError: function () {
            this.error.show = false;
            this.error.msg = '';
        }

    }
}