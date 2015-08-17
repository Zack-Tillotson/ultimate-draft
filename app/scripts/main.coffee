requirejs.config
  baseUrl: 'assets/scripts',
  paths:
    libs: '../../libs/'
    jquery: 'https://code.jquery.com/jquery-2.1.4.min'
    eventemitter2: 'libs/eventemitter2'
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min'
    react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.13.2/react.min'
    firebase: 'https://cdn.firebase.com/js/client/2.2.4/firebase'
    moment: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min'
    jquerycookie: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min'
    papaparse: '/libs/papaparse-4.1.2'

requirejs ['ultimate_draft'], (UltimateDraft) ->
  new zt.UltimateDraft container: document.getElementById('main-container')
