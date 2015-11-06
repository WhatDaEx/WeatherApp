module.exports = {
    template: require('./template.html'),
    props: ['type'],
    computed: {
        icon: function() {
            switch(this.type) {
                case 'partly-cloudy-day':
                    return 'wi-day-cloudy';
                    break;
                case 'partly-cloudy-night':
                    return 'wi-night-cloudy';
                    break;
                case 'clear-day':
                    return 'wi-day-sunny';
                    break;
                case 'clear-night':
                    return 'wi-night-clear';
                    break;
                case 'rain':
                    return 'wi-rain';
                    break;
                case 'snow':
                    return 'wi-snow';
                    break;
                case 'sleet':
                    return 'wi-sleet';
                    break;
                case 'fog':
                    return 'wi-fog';
                    break;
                case 'cloudy':
                    return 'wi-cloudy';
                    break;
                default:
                    return 'wi-cloud';
            }
        }
    }
}