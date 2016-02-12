function testLogin() {

    var uri = 'https://fesebuv.github.io';
    var appId = '1670352679887073';

    FB.login(function(response) {
        fbLogin = true;
        if (response.authResponse) {
            alert('Success!');
            window.location.href = uri;
        } else {
            alert('Login Failed!');
        }
    });

}
