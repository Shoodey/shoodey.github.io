require('./bootstrap');

Vue.component('home', require('./components/Home.vue'));

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

