var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'resources/';

elixir( function(mix) {
    mix.browserify('app.js');
    mix.sass('app.scss');
});

//elixir.Task.find('browserify').watch('resources/**/*.vue');