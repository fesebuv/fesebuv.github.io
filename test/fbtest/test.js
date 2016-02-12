function testLogin() {

    var uri = 'https://fesebuv.github.io';
    var appId = '1670352679887073';

    console.log('login atttempt! ');

    try {

        window.location.href = encodeURI("https://www.facebook.com/dialog/oauth?client_id=" + appId + "&redirect_uri=" + uri + "&response_type=token");



    } catch (err) {

        console.warn(err);

        window.open(encodeURI("https://www.facebook.com/dialog/oauth?client_id=" + appId + "&redirect_uri=" + uri + "&response_type=token"));

        try {
            FB.login(function(response) {
                if (response.authResponse) {
                    alert('Success!');
                    window.location.href = uri;
                } else {
                    alert('Login Failed!');
                }
            });
        } catch (r) {
            console.warn(r);
        }

    };




    // try {

    // } catch (err) {
    //     FB.login(function(response) {
    //         if (response.authResponse) {
    //             alert('Success!');
    //             window.location.href = uri;
    //         } else {
    //             alert('Login Failed!');
    //         }
    //     }, {
    //         scope: 'email'
    //     });
    // }
}
