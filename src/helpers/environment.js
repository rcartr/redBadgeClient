let APIURL = ""

switch(window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'efa-rb-clanorg.herokuapp.com':
        APIURL = 'https://efa-rb-clanorg.herokuapp.com'
    
}
// Heroku url is just a placeholder until deployment

export default APIURL

