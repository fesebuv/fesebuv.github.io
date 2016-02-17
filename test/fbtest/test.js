function testLogin(){
    var test = (function() {

                function loginWithPopup(){
                    alert('login with popup');
                    var appId = '1670352679887073';
                    var uri = window.location.href;
                    var url = encodeURI("https://www.facebook.com/dialog/oauth?client_id="+appId+"&redirect_uri="+uri+"&response_type=token");
                    window.location.href = url;
                    
                }

                function login() {

                    console.info('login regarless');
                    FB.login(function(response) {
                        
                        if (response.authResponse) {
                            redirect();
                        } else {
                            getStatus();
                        }
                    });

                }

                function getStatus() {
                    FB.getLoginStatus(function(response) {

                        if (response.status === 'connected') {
                            redirect();
                        } else if(response.status === 'not_authorized'){
                            loginWithPopup();
                        } 
                        
                        else {
                            console.info(response.status);
                            login();
                        }

                    });
                }

                function redirect() {
                    //SocialAuthService.triggerRedirect(idProvisioner);
                    alert('redirect!')
                }

                return {
                    login: login
                };

            })();

            test.login();
}

function testLogin_______(){
    // var uri = 'https://fesebuv.github.io';
    var uri = 'https://stag-cnid.condenastdigital.com/auth/facebook?brand=com.condenet.traveler&originalHost=localhost%3A9001&flow=auth&regSrc=CNEE_GLM&clientUrl=http%3A%2F%2Flocalhost%3A9001%2F%3Frandom%3D0.8816532542755882%26domain%3Dhttp%3A%2F%2Flocalhost%3A8080%26regPath%3Dauth%26regSrc%3DCNEE_GLM%26brandUrl%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fadmin%2Fpostmessage.html%26referralDomain%3Dlocalhost%26updateToken%3D%26resetToken%3D%26token%3D%23com.condenet.traveler%2Ffblogin';
    // var appId = '1670352679887073';
    
    // traveler
    var appId = '1501816783447608';
    
    
    
    FB.getLoginStatus(function(response){
            
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                // testAPI();
                window.location.href = uri;
            } else {
                alert('Please log into this app.' + 'not_autorized');
                window.top.location.href = encodeURI("https://www.facebook.com/dialog/oauth?client_id="+appId+"&redirect_uri="+uri+"&response_type=token");
                
            } 
            
        });
    
}


function testLogin___(){
    // var uri = 'https://fesebuv.github.io';
    var uri = 'https://stag-cnid.condenastdigital.com/auth/facebook?brand=com.condenet.traveler&originalHost=localhost%3A9001&flow=auth&regSrc=CNEE_GLM&clientUrl=http%3A%2F%2Flocalhost%3A9001%2F%3Frandom%3D0.8816532542755882%26domain%3Dhttp%3A%2F%2Flocalhost%3A8080%26regPath%3Dauth%26regSrc%3DCNEE_GLM%26brandUrl%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fadmin%2Fpostmessage.html%26referralDomain%3Dlocalhost%26updateToken%3D%26resetToken%3D%26token%3D%23com.condenet.traveler%2Ffblogin';
    // var appId = '1670352679887073';
    
    // traveler
    var appId = '1501816783447608';
    
    
    
    FB.getLoginStatus(function(response){
            
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                // testAPI();
                window.location.href = uri;
            } else if (response.status === 'not_authorized') {
                
                window.top.location.href = encodeURI("https://www.facebook.com/dialog/oauth?client_id="+appId+"&redirect_uri="+uri+"&response_type=token");
                alert('Please log into this app.' + 'not_autorized');
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
