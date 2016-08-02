'use strict';

var loginStubData = {
    "id": "c2f88745-c7ce-48ec-a79b-ac12037e192e",
    "createdAt": "2015-02-27T14:11:08.000Z",
    "updatedAt": "2016-08-01T10:42:18.000Z",
    "email": "felippe.fesebuv@gmail.com",
    "siteDetails": {
        "VOG": {
            "id": 10000475134,
            "siteCode": "VOG",
            "displayName": "felippe_fesebuv",
            "lastSessionDate": "2016-07-19T20:57:24.000Z",
            "createdAt": "2015-05-29T12:13:35.000Z",
            "updatedAt": "2016-03-18T14:10:35.000Z"
        }
    },
    "userProfile": {
        "address": {
            "address1": "222 Broadway",
            "city": "New York",
            "country": "US",
            "state": "NY",
            "zipCode": "10038"
        }
    },
    "originalSite": "",
    "_links": {
        "self": {
            "href": "https://stag-cnid-user-service.conde.io/v1/users/c2f88745-c7ce-48ec-a79b-ac12037e192e"
        }
    },
    "lastSessionDate": "2016-08-01T17:55:01.000Z",
    "requiresUpdate": "N",
    "registrationSource": 7560,
    "status": 1,
    "confirmationCode": null,
    "isSyncInternal": 0,
    "syncFailSafe": 0,
    "userType": ""
};

var linkStubData = {
    "status": "success",
    "verifyUrl": "https://user-platform.condenastdigital.com/usres/1a1a1a1a-1111-2222-12ab-1a1a1a1a1a1a/entitlements?filter[app]com.condenet.wiredmag",
    "details": {
        "receiptId": "0A6797B2-13C7-11E5",
        "productId": "001101 -042",
        "beneficiaryIds": [
            "1a1a1a1a-1111-2222-12ab-1a1a1a1a1a1a"
        ],
        "status": "ACTIVE",
        "startDate": 1467380649,
        "endDate": null
    }
};

var utils = (function() {
    function rqst(method, url, dt, success, failure) {

        var request;

        request = new XMLHttpRequest();
        request.open(method, url, true);

        request.setRequestHeader("Authorization", "Authorization: Basic Y25pZDpyMnR0ODdLbQ==");
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Access-Control-Allow-Origin", "*");

        request.onload = function() {

            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                console.log(data);

                if (sucess) {
                    success(data);
                }

            } else {
                // We reached our target server, but it returned an error
                console.log(request);
                if (failure) {
                    failure(request.statusText, request.status);
                }

            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            if (failure) {
                failure(request.statusText, request.status);
            }
        };

        request.send(dt);
    }

    function param(obj) {
        var stringParams = Object.keys(obj).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
        }).join('&');
        return stringParams;
    }

    return {
        rqst: rqst,
        param: param
    };

})();

var swa = (function() {

    function relocateToAmazon(response) {

        var data;

        if (response.details &&
            response.details.status &&
            response.details.status.toString().toLowerCase() === 'active') {
            console.warn('send back to Amazon!!');

            var url = 'https://www.amazon.com/swa/checkout/confirm-activation?';
            var amazonUrlParams = {
                activationToken: 'swa.data.activationToken' || '',
                productId: 'swa.data.productId' || '',
                beneficiaryDescriptor: 'swa.data.email' || '',
            };

            url = url + utils.param(amazonUrlParams);

            data = {
                url: url
            };

        }


        return data;

    }

    function linkWidthSWA(rsp) {


        // activationToken and productId are provided by amazon via url params

        var response;
        var url = 'localhost:8081/swa-account-links';
        var data = {
            "userIdentifier": rsp.id || '',
            "activationToken": "string",
            "email": rsp.email || '',
            "productId": "string",
            "appId": "string"
        };


        try {
            console.log('attempting ajax ... ');
            console.log('url: %s', url);
            console.log(data);
            utils.rqst('POST', url, data, function() {
                console.warn('success!');
            }, function(statusText, status) {

                console.warn('failure!');

                return response;

            });
        } catch (err) {
            console.warn(err);
        }



    }

    return {
        linkWidthSWA: linkWidthSWA,
        relocateToAmazon: relocateToAmazon
    };

})();

var app = (function() {

    function outputResponseTxt(message, className) {
        var elem = document.getElementById('output-message');

        if (elem) {
            elem.className = '';
            elem.textContent = message;

            if (className !== '') {
                elem.classList.add(className);
            }
        }
        console.info(elem);
    }


    function alive() {
        try {

            var url = 'localhost:8081/alive';
            var data = {};
            console.log('attemting ajax ... ');
            console.log('url: %s', url);
            console.log(data);
            utils.rqst('GET', url, data, function(response) {
                console.warn('sucess');
            }, function(statusText, status) {
                console.warn('failure');

                console.warn(statusText);
            });

        } catch (err) {
            console.warn(err);
        }
    }

    function getRelocateURL(data) {

        // we need to pass some url params here
        console.log('get relocate url')
        var relocateURL = swa.relocateToAmazon(data);

        if (relocateURL.url && typeof relocateURL.url === 'string') {
            console.warn(relocateURL.url);
            // window.location.href = relocateURL.url;
        } else {
            outputResponseTxt('Unable to return Amazon', 'error');
        }
    }


    function swaLink(data) {
        //attemp to link with amazon
        var linkSWA = swa.linkWidthSWA(data);

        if (linkSWA &&
            linkSWA.status &&
            linkSWA.status.toString().toLowerCase() === 'success'
        ) {
            getRelocateURL(data);

        } else {
            outputResponseTxt('Unable to link with Amazon', 'error');
        }


        //lets force this
        getRelocateURL(linkStubData);
    }



    function init() {

        //check if we can connect to user platform
        alive();

        var form = document.querySelector("form");

        if (form) {
            form.addEventListener('submit', function(evt) {
                evt.preventDefault();
                if (form.checkValidity()) {

                    var response;
                    var rootUrl = 'http://localhost:8081';
                    var url = rootUrl + (form.getAttribute('data-url') || '');
                    var data = new FormData(form) || {};
                    var id = form.id;
                    var linkWithAmazon = (id === 'login-form' || id === 'register-form');
                    var forgotPasswd = id === 'forgotpassword-form';

                    form.classList.add('submitted');

                    try {
                        console.log('attemting ajax ... ');
                        console.log('url: %s', url);
                        console.log(data);
                        utils.rqst('POST', url, data, function(response) {
                            console.warn('sucess');



                        }, function(statusText, status) {
                            console.warn('failure');
                            console.warn(statusText);

                            //lets force this
                            if (linkWithAmazon) {
                                swaLink(loginStubData);
                            } else if (forgotPasswd) {
                                outputResponseTxt('Please check your email', 'success');
                            }
                        });

                    } catch (err) {
                        console.warn(err);
                    }

                }

            });

            form.addEventListener('focusin', function(evt) {
                outputResponseTxt('', '');
            });
        }

    }

    return {
        init: init
    };
})();


app.init();