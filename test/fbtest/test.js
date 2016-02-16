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
        
        FB.getLoginStatus(function(response){
            
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else if (response.status === 'not_authorized') {
                console.info('Please log into this app.');
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                console.info('Please log into Facebook.');
            }
            
        });
        
    });

}
