function testLogin(){
    var uri = 'https://fesebuv.github.io';
    var appId = '1670352679887073';
    
    
    
    FB.getLoginStatus(function(response){
            
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                // testAPI();
                window.location.href = uri;
            } else if (response.status === 'not_authorized') {
                alert('Please log into this app.');
                window.location = encodeURI("https://www.facebook.com/dialog/oauth?client_id="+appId+"&redirect_uri="+uri+"&response_type=token");
                
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                FB.login();
                alert('Please log into Facebook.');
            }
            
        });
    
}



function testLogin_() {

    var uri = 'https://fesebuv.github.io';
    var appId = '1670352679887073';

    FB.login(function(response) {
        // fbLogin = true;
        // if (response.authResponse) {
        //     alert('Success!');
        //     window.location.href = uri;
        // } else {
        //     alert('Login Failed!');
        // }
        
        FB.getLoginStatus(function(response){
            
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else if (response.status === 'not_authorized') {
                alert('Please log into this app.');
                FB.login();
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                alert('Please log into Facebook.');
            }
            
        });
        
    });

}
