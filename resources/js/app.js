var Vue = require('vue');
Vue.use(require('vue-resource'));

// Main vue instance
new Vue({

    el: 'body',

    data: {
        title: 'Weather App'
    },

    components: {
        weather: require('./components/Weather')
    }

});