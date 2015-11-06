var $ = require('jquery');

/**
 * Weather component
 * @type {{template: *, components: {alert: *, loader: *}, data: module.exports.data, computed: {googleUrl: module.exports.computed.googleUrl, forecastUrl: module.exports.computed.forecastUrl, icon: module.exports.computed.icon}, ready: module.exports.ready, methods: {update: module.exports.methods.update, reset: module.exports.methods.reset}}}
 */
module.exports = {
    template: require('./template.html'),

    components: {
        alert: require('../Alert'),
        loader: require('../Loader'),
        icon: require('../Icon')
    },

    data: function () {
        return {
            city: '',
            forecast: false,
            googleMaps: false,
            weather: false,
            location: false,
            loader: false,
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
            this.loader = true;
            this.$http.get(this.googleUrl, function(data, status, request) {
                if (data.results.length < 1) {
                    this.error.msg = 'No results with this address!';
                    this.error.show = true;
                    this.reset();
                    return;
                }

                this.location = data.results[0].geometry.location;
                this.$http.jsonp(this.forecastUrl, function(data, status, request) {
                    this.weather = data;
                    this.loader = false;
                }.bind(this));
            }.bind(this));
        },

        reset: function() {
            this.location = false;
            this.weather = false;
            this.loader = false;
        }
    }
}