function testLogin() {
    FB.login();

    var uri = 'fesebuv.github.io';
    var appId = '1670352679887073';

    console.log('login atttempt! ');

    try {
        window.location.href = encodeURI("https://www.facebook.com/dialog/oauth?client_id=" + appId + "&redirect_uri=" + uri + "&response_type=token");
    } catch (err) {
        FB.login(function(response) {
            if (response.authResponse) {
                alert('Success!');
                window.location.href = 'https://fesebuv.github.io';
            } else {
                alert('Login Failed!');
            }
        }, {
            scope: 'email'
        });
    }
}
