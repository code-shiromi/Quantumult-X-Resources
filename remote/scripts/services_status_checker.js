/*
 * Quantumult X Interaction script for the validity of media services region checking
 *
 * - Special thanks -
 * This script is reference from KOP-XIAO's repository
 */ /* Reference url: https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/streaming-ui-check.js
 *
 * Support list:
 * 1. YouTube
 * 2. Netflix
 * 3. Disneyᐩ
 * 4. DAZN
 * 5. Paramountᐩ
 * 6. Discoveryᐩ
 * 7. Hulu JP
 * 8. U-Next TV
 * 9. AbemaTV
 * 10. Cygame - Umamusume
 * 11. Ani.gamer.com.tw
 * 12. Viu
 */ /*
 *
 * Script example

* @fileoverview Example to compose HTTP request
* and handle the response.
const url = "https://example.com/";
const method = "GET";
const headers = {"Field": "test-header-param"};

const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
};

$task.fetch(myRequest).then(response => {
    * response.statusCode, response.headers, response.body
    console.log(response.body);
    $notify("Title", "Subtitle", response.body); // Success!
    $done();
}, reason => {
    * reason.error
    $notify("Title", "Subtitle", reason.error); // Error!
    $done();
});

*/ /*
 *
 * Resources
 */
// URLs for services status checking
//const policy_name = 'Netflix'; // Policy name for Netflix traffic
const YOUTUBE_URL = 'https://www.youtube.com/premium';
const NETFLIX_URL = 'https://www.netflix.com/title/';
const NETFLIX_FILM_ID = 81215567; // 70020728, original: 81161626
const DISNEY_URL = 'https://www.disneyplus.com';
const DAZN_URL = 'https://startup.core.indazn.com/misl/v5/Startup';
const PARAM_URL = 'https://www.paramountplus.com/';
const DISCOVERY_URL = 'https://us1-prod-direct.discoveryplus.com/users/me';
const DISCOVERY_TOKEN = 'https://us1-prod-direct.discoveryplus.com/token?deviceId=d1a4a5d25212400d1e6985984604d740&realm=go&shortlived=true';
const HULU_JP_URL = 'https://www.hulu.jp/signup';
const UNEXT_JP_URL = 'https://video.unext.jp/play/SID0065091/';
const UNEXT_FILM_ID = 'ED00350003';
const ABEMA_TV_URL = 'https://api.abema.io/v1/ip/check';
//const PRIMEVIDEO_URL = 'https://www.amazon.co.jp/gp/video/detail/';
//const PRIMEVIDEO_FILM_ID = 'B08QCMSC3Q';
const UMAMUSUME_URL = 'https://api-umamusume.cygames.jp/';
//const DMM_URL = 'https://www.dmm.com/monthly/prime/-/basket/';
const ANIGAMER_TW_URL = 'https://ani.gamer.com.tw/ajax/token.php?adID=89422&sn=29110';
const VIU_URL = 'https://www.viu.com/ott';
// Headers
const User_Agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11; rv:100.0) Gecko/20100101 Firefox/100.0';
const message = {
    action: "get_policy_state",
    content: $environment.params
};

var opts = {
    policy: $environment.params
};

var opts1 = {
    policy: $environment.params,
    redirection: false
};

// Service Status
const STATUS_COMING = 2; // Coming
const STATUS_AVAILABLE = 1; // Available
const STATUS_NOT_AVAILABLE = 0; // Not Available
const STATUS_TIMEOUT = -1; // Timeout
const STATUS_ERROR = -2; // Error

// National Code
const JAPAN_CODE = ['NRT', 'KIX'];

// Symbols
const arrow = ' ➟ ';
const flags = new Map([['?', '❓'], ['AC', '🇦🇨'], ['AE','🇦🇪'], ['AF', '🇦🇫'], ['AI', '🇦🇮'], ['AL', '🇦🇱'], ['AM', '🇦🇲'], ['AQ', '🇦🇶'], ['AR', '🇦🇷'], ['AS', '🇦🇸'], ['AT', '🇦🇹'], ['AU', '🇦🇺'], ['AW', '🇦🇼'], ['AX', '🇦🇽'], ['AZ', '🇦🇿'], ['BA', '🇧🇦'], ['BB', '🇧🇧'], ['BD', '🇧🇩'], ['BE', '🇧🇪'], ['BF', '🇧🇫'], ['BG', '🇧🇬'], ['BH', '🇧🇭'], ['BI', '🇧🇮'], ['BJ', '🇧🇯'], ['BM', '🇧🇲'], ['BN', '🇧🇳'], ['BO', '🇧🇴'], ['BR', '🇧🇷'], ['BS', '🇧🇸'], ['BT', '🇧🇹'], ['BV', '🇧🇻'], ['BW', '🇧🇼'], ['BY', '🇧🇾'], ['BZ', '🇧🇿'], ['CA', '🇨🇦'], ['CF', '🇨🇫'], ['CH', '🇨🇭'], ['CK', '🇨🇰'], ['CL', '🇨🇱'], ['CM', '🇨🇲'], ['CN', '🇨🇳'], ['CO', '🇨🇴'], ['CP', '🇨🇵'], ['CR', '🇨🇷'], ['CU', '🇨🇺'], ['CV', '🇨🇻'], ['CW', '🇨🇼'], ['CX', '🇨🇽'], ['CY', '🇨🇾'], ['CZ', '🇨🇿'], ['DE', '🇩🇪'], ['DG', '🇩🇬'], ['DJ', '🇩🇯'], ['DK', '🇩🇰'], ['DM', '🇩🇲'], ['DO', '🇩🇴'], ['DZ', '🇩🇿'], ['EA', '🇪🇦'], ['EC', '🇪🇨'], ['EE', '🇪🇪'], ['EG', '🇪🇬'], ['EH', '🇪🇭'], ['ER', '🇪🇷'], ['ES', '🇪🇸'], ['ET', '🇪🇹'], ['EU', '🇪🇺'], ['FI', '🇫🇮'], ['FJ', '🇫🇯'], ['FK', '🇫🇰'], ['FM', '🇫🇲'], ['FO', '🇫'], ['FR', '🇫🇷'], ['GA', '🇬🇦'], ['GB', '🇬🇧'], ['HK', '🇭🇰'], ['HU','🇭🇺'], ['ID', '🇮🇩'], ['IE', '🇮🇪'], ['IL', '🇮🇱'], ['IM', '🇮🇲'], ['IN', '🇮🇳'], ['IS', '🇮🇸'], ['IT', '🇮🇹'], ['JP', '🇯🇵'], ['KR', '🇰🇷'], ['LU', '🇱🇺'], ['MO', '🇲🇴'], ['MX', '🇲🇽'], ['MY', '🇲🇾'], ['NL', '🇳🇱'], ['PH', '🇵🇭'], ['RO', '🇷🇴'], ['RS', '🇷🇸'], ['RU', '🇷🇺'], ['RW', '🇷🇼'], ['SA', '🇸🇦'], ['SB', '🇧'], ['SC', '🇸🇨'], ['SD', '🇸🇩'], ['SE', '🇸🇪'], ['SG', '🇸🇬'], ['TH', '🇹🇭'], ['TN', '🇹🇳'], ['TO', '🇹🇴'], ['TR', '🇹🇷'], ['TV', '🇹🇻'], ['TW', '🇹🇼'], ['UK', '🇬🇧'], ['UM', '🇺🇲'], ['US', '🇺🇸'], ['UY', '🇺🇾'], ['UZ', '🇺🇿'], ['VA', '🇻🇦'], ['VE', '🇻🇪'], ['VG', '🇻🇬'], ['VI', '🇻🇮'], ['VN', '🇻🇳'], ['ZA', '🇿🇦']]);

// Messages
function get_status_code(code) { // Server status code
    if ( code == 200) {
        var status_code = '✅ 200 OK';
    } else {
        var status_code = '⛔ ' + code + ' Failed.';
    };
    return status_code;
};

function msg_supported(region) {
    let msg = '✅ Supported' + arrow + flags.get(region);
    return msg;
};

msg_unsupported = '🚫 Unsupported';

const msg_timeout = '⏱️ Timeout';
function timeout(delay = 5000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Timeout');
        }, delay);
    });
};

// Default result
const msg_no_response = '⛔ Function not responding.';
let result = {
    "title": "- Media Services Status -",
    "YouTube": msg_no_response,
    "YouTubePremium" : msg_no_response,
    "NetflixStatus": msg_no_response,
    "NetflixService": msg_no_response,
    "Disney": msg_no_response,
    "DisneyPlus": msg_no_response,
    "DAZNStatus": msg_no_response,
    "DAZNService": msg_no_response,
    "ParamountStatus" : msg_no_response,
    "ParamountService" : msg_no_response,
    "DiscoveryStatus" : msg_no_response,
    "DiscoveryService" : msg_no_response,
    "HuluJPStatus" : msg_no_response,
    "HuluJPService" : msg_no_response,
    "UNextTVStatus" : msg_no_response,
    "UNextTVService" : msg_no_response,
    "AbemaTVStatus" : msg_no_response,
    "AbemaTVService" : msg_no_response,
    "PrimeVideoJPStatus" : msg_no_response,
    "PrimeVideoJPService" : msg_no_response,
    "UmamusumeStatus" : msg_no_response,
    "UmamusumeService" : msg_no_response,
    "AniGamerStatus" : msg_no_response,
    "AniGamerService" : msg_no_response,
    "ViuStatus" : msg_no_response,
    "ViuService" : msg_no_response
};


/*
 * Testers
 */
// Service - 1. YouTube - Service, Premium
async function test_youtube() {
    let order = {
        url: YOUTUBE_URL,
        opts: opts,
        timeout: 2800,
        headers: { // Optional
            "User-Agent": User_Agent
        }
    };
    let error_msg = 'Premium is not available in your country';
    await $task.fetch(order).then(response => {
        let data = response.body;
        // Check YouTube status
        result['YouTube'] = get_status_code(response.statusCode);
        // Check YouTube Premium status
        if (data.indexOf(error_msg) !== -1) { // Not supported
            result['YouTubePremium'] = msg_unsupported;
        } else { // Supported, get YouTube service region
            let region = '';
            let re = new RegExp('"GL":"(.*?)"', 'gm');
            let ret = re.exec(data);
            if (ret != null && ret.length === 2) {
                region = ret[1];
            } else if (data.indexOf('www.google.cn') !== -1) {
                region = 'CN';
            } else {
                region = 'US';
            };
            result['YouTubePremium'] = msg_supported(region.toUpperCase());
        };
        console.log('YouTube query ............... done');
    }, reason => { // Timeout
        result['YouTube'] = msg_timeout;
        result['YouTubePremium'] = msg_timeout;
        console.log('YouTube query ............... failed');
    });
};

// Service - 2. Netflix - Service
async function test_netflix(filmId) {
    let order = {
        url: NETFLIX_URL + filmId,
        opts: opts,
        timeout: 5200,
        headers: {
            "User-Agent": User_Agent
        }
    };
    await $task.fetch(order).then(response => {
        result['NetflixStatus'] = get_status_code(response.statusCode);
        if (response.statusCode === 404) { // Some supported
            result['NetflixService'] = '⚠️ Netflix originals only';
        } else if (response.statusCode === 403) { // Not supported
            result['NetflixService'] = msg_unsupported;
        } else if (response.statusCode === 200) { // Fully supported
            // Get region
            let url = response.headers['X-Originating-URL'];
            let region = url.split('/')[3];
            region = region.split('-')[0];
            if (region == 'title') {
                region = 'us';
            };
            result['NetflixService'] = '✅ Fully supported' + arrow + flags.get(region.toUpperCase());
        };
        console.log('Netflix query ............... done');
    }, reason => { // Timeout
        result['NetflixStatus'] = msg_timeout;
        result['NetflixService'] = msg_timeout;
        console.log('Netflix query ............... failed');
    });
};

// Service - 3. Disneyᐩ - Service
function disney_home_page() { // Subfunction for test_disney
    return new Promise((resolve, reject) => {
        let opts0 = {
            url: DISNEY_URL,
            opts: opts,
            headers: {
                "Accept-Language": "en",
                "User-Agent": User_Agent
            },
        };
        $task.fetch(opts0).then(response => {
            let data = response.body;
            result['Disney'] = get_status_code(response.statusCode);
            if (response.statusCode !== 200 || data.indexOf('unavailable') !== -1) {
                reject('Not Available');
                return
            } else {
                let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/);
                if (!match) {
                    resolve({ region: '', cnbl: '' });
                    return
                } else {
                    let region = match[1];
                    let cnbl = match[2];
                    //console.log('homepage'+region+cnbl);
                    resolve({ region, cnbl });
                };
            };
        }, reason => {
            reject('Error');
            return
        });
    });
};

function get_disney_location_info() { // Subfunction for test_disney
    return new Promise((resolve, reject) => {
        let opts0 = {
            url: "https://disney.api.edge.bamgrid.com/graph/v1/device/graphql",
            method: "POST",
            opts: opts,
            headers: {
                "Accept-Language": "en",
                "Authorization": "ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84",
                "Content-Type": "application/json",
                "User-Agent": User_Agent
            },
            body: JSON.stringify({
                query: "mutation registerDevice($input: RegisterDeviceInput!) { registerDevice(registerDevice: $input) { grant { grantType assertion } } }",
                variables: {
                    input: {
                        applicationRuntime: "chrome",
                        attributes: {
                            browserName: "chrome",
                            browserVersion: "94.0.4606",
                            manufacturer: "microsoft",
                            model: null,
                            operatingSystem: "windows",
                            operatingSystemVersion: "10.0",
                            osDeviceIds: []
                        },
                        deviceFamily: "browser",
                        deviceLanguage: "en",
                        deviceProfile: "windows"
                    }
                }
            })
        };

        $task.fetch(opts0).then(response => {
            let data = response.body;
            //console.log('locationinfo: ' + response.statusCode);
            if (response.statusCode !== 200) {
                console.log('get_disney_location_info: ' + data);
                reject('Not Available');
                return;
            } else {
                let {
                    inSupportedLocation,
                    location: { countryCode },
                } = JSON.parse(data)?.extensions?.sdk?.session;
                resolve({ inSupportedLocation, countryCode });
            };
        }, reason => {
            reject('Error');
            return;
        });
    });
};

async function test_disney() {
    try {
        let { region, cnbl } = await Promise.race([disney_home_page(), timeout(8800)]);
        let { countryCode, inSupportedLocation } = await Promise.race([get_disney_location_info(), timeout(8800)]);
        //console.log(`disney_location_info: countryCode=${countryCode}, inSupportedLocation=${inSupportedLocation}`);
        region = countryCode ?? region;
        // Coming
        if (inSupportedLocation === false || inSupportedLocation === 'false') {
            //return { region, status: STATUS_COMING };
            result['DisneyPlus'] = '⚠️ Service coming' + arrow + flags.get(region.toUpperCase());
        } else { // Supported
            result['DisneyPlus'] = msg_supported(region.toUpperCase());
            //return { region, status: STATUS_AVAILABLE };
        };
        console.log('Disney Plus query ........... done');
    } catch (error) {
        //console.log('error: ' + error);
        // Unsupported
        if (error === 'Not Available') { // Not supported
            //console.log('Unsupported');
            result['DisneyPlus'] = msg_unsupported;
            //return { status: STATUS_NOT_AVAILABLE };
        };

        if (error === 'Timeout') { // Timeout
            result['DisneyPlus'] = msg_timeout;
            //return { status: STATUS_TIMEOUT };
        };
        result['Disney'] = STATUS_ERROR;
        console.log('Disney Plus query ........... failed');
        //return { status: STATUS_ERROR };
    };
};

// Service - 4. DAZN - Sevice
async function test_dazn() {
    const extra =`{
        "LandingPageKey": "generic",
        "Platform": "web",
        "PlatformAttributes": {},
        "Manufacturer": "",
        "PromoCode": "",
        "Version": "2"
    }`;
    let order = {
        url: DAZN_URL,
        method: "POST",
        opts: opts,
        timeout: 2800,
        headers: {
            "User-Agent": User_Agent,
            "Content-Type": "application/json"
        },
        body: extra
    };
    await $task.fetch(order).then(response=> {
        let data = response.body;
        //data = extra;
        let header = JSON.stringify(response.headers);
        result['DAZNStatus'] = get_status_code(response.statusCode);
        //$done(data);
        if (response.statusCode == 200) {
            //console.log(data.split('countryCode')[1])
            //console.log(data);
            let region = '';
            let re = new RegExp('"GeolocatedCountry":"(.*?)"', 'gm');
            let ret = re.exec(data);
            if (ret != null && ret.length === 2) { // Supported
                region = ret[1];
                result['DAZNService'] = msg_supported(region.toUpperCase());
            } else { // Not supported
                result['DAZNService'] = msg_unsupported;
            };
        };
        console.log('DAZN query .................. done');
    }, reason => { // Timeout
        result['DAZNService'] = msg_timeout;
        console.log('DAZN query .................. failed');
    });
};

// Service - 5. Paramountᐩ - Service
async function test_param() {
    let order = {
        url: PARAM_URL,
        opts: opts1,
        timeout: 2800,
        headers: {
            "User-Agent": User_Agent
        },
    };
    await $task.fetch(order).then(response=> {
        //let data = response.body;
        result['ParamountStatus'] = get_status_code(response.statusCode);
        if (response.statusCode == 200) { // Supported
            result['ParamountService'] = msg_supported('?');
        } else if (response.statusCode == 302) { // Not supported
            result['ParamountService'] = msg_unsupported;
        }
        console.log('Paramount Plus query ........ done');
    }, reason => { // Timeout
        result['ParamountStatus'] = msg_timeout;
        result['ParamountService'] = msg_timeout;
        console.log('Paramount Plus query ........ failed');
    });
};

// Service - 6. Discoveryᐩ - Service
async function test_discovery() {
    let order = {
        url: DISCOVERY_TOKEN,
        opts: opts1,
        timeout: 2800,
        headers: {
            'User-Agent': User_Agent
        },
        verify: false
    }
    await $task.fetch(order).then(response => {
        //console.log('GetToken:'+response.statusCode);
        result['DiscoveryStatus'] = get_status_code(response.statusCode);
        if(response.statusCode == 200) {
            let data = JSON.parse(response.body);
            //console.log(data);
            let token = data['data']['attributes']['token'];
            const cookievalid =
                `_gcl_au=1.1.858579665.1632206782; _rdt_uuid=1632206782474.6a9ad4f2-8ef7-4a49-9d60-e071bce45e88; _scid=d154b864-8b7e-4f46-90e0-8b56cff67d05; _pin_unauth=dWlkPU1qWTRNR1ZoTlRBdE1tSXdNaTAwTW1Nd0xUbGxORFV0WWpZMU0yVXdPV1l6WldFeQ; _sctr=1|1632153600000; aam_fw=aam%3D9354365%3Baam%3D9040990; aam_uuid=24382050115125439381416006538140778858; st=${token}; gi_ls=0; _uetvid=a25161a01aa711ec92d47775379d5e4d; AMCV_BC501253513148ED0A490D45%40AdobeOrg=-1124106680%7CMCIDTS%7C18894%7CMCMID%7C24223296309793747161435877577673078228%7CMCAAMLH-1633011393%7C9%7CMCAAMB-1633011393%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1632413793s%7CNONE%7CvVersion%7C5.2.0; ass=19ef15da-95d6-4b1d-8fa2-e9e099c9cc38.1632408400.1632406594`;
            let order1 = {
                url: DISCOVERY_URL,
                opts: opts1,
                timeout: 2800,
                headers: {
                    "User-Agent": User_Agent,
                    "Cookie": cookievalid
                },
                ciphers: "DEFAULT@SECLEVEL=1",
                verify: false
            };
            $task.fetch(order1).then(response=> {
                //console.log('Check:'+response.statusCode);
                let data = JSON.parse(response.body);
                result['DiscoveryStatus'] = get_status_code(response.statusCode);
                let locationd = data['data']['attributes']['currentLocationTerritory'];
                if (locationd == 'us') { // Supported
                    result['DiscoveryService'] = msg_supported('?');
                    //console.log('SupportedDiscoveryᐩ');
                } else { // Unsupported
                    result['DiscoveryService'] = msg_unsupported;
                    //console.log('Unsupport Discoveryᐩ');
                };
            }, reason => {
                result['DiscoveryService'] = 'Check-Error: ' + reason;
                //resolve('discovery failed');
            });
        } else {
            result['DiscoveryService'] = 'GetToken-Error: ' + reason;
            //resolve('discovery failed');
        };
    }, reason => { // Timeout
        result['DiscoveryStatus'] = msg_timeout;
        result['DiscoveryService'] = 'GetToken-Error: ' + reason;
        //resolve('discovery failed');
    });
};

// Service - 7. Hulu JP - Service
async function test_hulujp() {
    let order = {
        url: HULU_JP_URL,
        opts: opts,
        timeout: 7600,
        headers: { // Optional.
            "User-Agent": User_Agent
        }
    };
    let error_msg = '日本国外からのアクセスはサポートされません';
    await $task.fetch(order).then(response => {
        let data = response.body;
        // Check Hulu Japan status
        result['HuluJPStatus'] = get_status_code(response.statusCode);
        if (data.indexOf(error_msg) !== -1) { // Not supported
            result['HuluJPService'] = msg_unsupported;
        } else { // Supported
            result['HuluJPService'] = msg_supported('JP');
        };
        console.log('Hulu Japan query ............ done');
    }, reason => { // Timeout
        result['HuluJPStatus'] = msg_timeout;
        result['HuluJPService'] = msg_timeout;
        console.log('Hulu Japan query ............ failed');
    });
};

// Service - 8. U-Next TV - Service
async function test_unextjp() {
    let order = {
        url: UNEXT_JP_URL,
        opts: opts,
        timeout: 5600,
        headers: { // Optional.
            "User-Agent": User_Agent
        }
    };
    await $task.fetch(order).then(response => {
        result['UNextTVStatus'] = get_status_code(response.statusCode);
        let country = new RegExp(JAPAN_CODE.join('|')).test(response.headers['X-Amz-Cf-Pop']);
        if (country) { // Supported
            result['UNextTVService'] = msg_supported('JP');
        } else { // Not supported
            result['UNextTVService'] = msg_unsupported;
        }
        console.log('U-Next query ................ done');
    }, reason => { // Timeout
        result['UNextTVStatus'] = msg_timeout;
        result['UNextTVService'] = msg_timeout;
        console.log('U-Next query ................ failed');
    });
};

// Service - 9. Abema TV - Service
async function test_abematv() {
    let order = {
        url: ABEMA_TV_URL,
        opts: opts,
        timeout: 5600,
        headers: { // Optional.
            "User-Agent": User_Agent
        }
    };
    await $task.fetch(order).then(response => {
        result['AbemaTVStatus'] = get_status_code(response.statusCode);
        if (JSON.parse(response.body).isoCountryCode === 'JP') { // Supported
            result['AbemaTVService'] = msg_supported('JP');
        } else { // Not supported
            result['AbemaTVService'] = msg_unsupported;
        };
        console.log('Abema TV query .............. done');
    }, reason => { // Timeout
        result['AbemaTVStatus'] = msg_timeout;
        result['AbemaTVService'] = msg_timeout;
        console.log('Abema TV query .............. failed');
    });
};

// Service - 10. Cygame - Umamusume service
async function test_umamusume() {
    let order = {
        url: UMAMUSUME_URL,
        opts: opts,
        timeout: 5600,
        headers: { // Optional.
            "User-Agent": User_Agent
        }
    };
    await $task.fetch(order).then(response => {
        //result['UmamusumeStatus'] = get_status_code(response.statusCode);
        if (response.statusCode === 404) { // Supported
            result['UmamusumeStatus'] = get_status_code(200);
            result['UmamusumeService'] = msg_supported('JP');
        } else { // Not supported
            result['UmamusumeStatus'] = get_status_code(response.statusCode);
            result['UmamusumeService'] = msg_unsupported;
        };
        console.log('Cygame (Umamusume) query .... done');
    }, reason => { // Timeout
        result['UmamusumeStatus'] = msg_timeout;
        result['UmamusumeService'] = msg_timeout;
        console.log('Cygame (Umamusume) query .... failed');
    });
};

// Service - 11. Ani.gamer.com.tw - service
async function test_anigamer() {
    let order = {
        url: ANIGAMER_TW_URL,
        opts: opts,
        timeout: 5600,
        headers: { // Optional.
            "User-Agent": User_Agent
        }
    };
    await $task.fetch(order).then(response => {
        result['AniGamerStatus'] = get_status_code(response.statusCode);
        if ( JSON.parse(response.body).error ) { // Not supported
            result['AniGamerService'] = msg_unsupported;
        } else {
            result['AniGamerService'] = msg_supported('TW');
        };
        console.log('ani.gamer.com.tw query ...... done');
    }, reason => { // Timeout
        result['AniGamerStatus'] = msg_timeout;
        result['AniGamerService'] = msg_timeout;
        console.log('ani.gamer.com.tw query ...... failed');
    });
};

// Service - 12. Viu - Service
async function test_viu() {
    let order = {
        url: VIU_URL,
        opts: opts,
        timeout: 5600,
        headers: { // Optional.
            "User-Agent": User_Agent
        }
    };
    let error_msg = 'We hope to be with you soon';
    await $task.fetch(order).then(response => {
        let data = response.body;
        result['ViuStatus'] = get_status_code(response.statusCode);
        if (data.indexOf(error_msg) === -1) { // Supported
            let region = '';
            let re = new RegExp('www.viu.com\/ott\/[a-z]+');
            let ret = String(re.exec(data)).split('/');
            if (ret != null && ret[2].length === 2) {
                region = ret[2].toUpperCase();
            } else {
                region = 'HK';
            };
            result['ViuService'] = msg_supported(region);
        } else { // Not supported
            result['ViuService'] = msg_unsupported;
        };
        console.log('Viu query ................... done');
    }, reason => { // Timeout
        result['ViuStatus'] = msg_timeout;
        result['ViuService'] = msg_timeout;
        console.log('Viu query ................... failed');
    });
};

/*
 * Outputs
 */
(async () => {
    console.log('Checking services status...');

    await Promise.all([
        test_youtube(),
        test_netflix(NETFLIX_FILM_ID),
        test_dazn(),
        test_disney(),
        test_param(),
        test_discovery(),
        test_hulujp(),
        test_unextjp(),
        test_abematv(),
        test_umamusume(),
        test_anigamer(),
        test_viu()
    ]);

    // Print results
    console.log('\n' + result['title'] + '\n' + '-------------------------');

    console.log('- YouTube -\n' +
                'Connection: ' + result['YouTube'] + '\n' +
                'Premium: ' + result['YouTubePremium'] + '\n');

    console.log('- Netflix -\n' +
                'Connection: ' + result['NetflixStatus'] + '\n' +
                'Service: ' + result['NetflixService'] + '\n');

    console.log('- Disneyᐩ -\n' +
                'Connection: ' + result['Disney'] + '\n' +
                'Service: ' + result['DisneyPlus'] + '\n');

    console.log('- DAZN -\n' +
                'Connection: ' + result['DAZNStatus'] + '\n' +
                'Service: ' + result['DAZNService'] + '\n');

    console.log('- Paramountᐩ -\n' +
                'Connection: ' + result['ParamountStatus'] + '\n' +
                'Service: ' + result['ParamountService'] + '\n');

    console.log('- Discoveryᐩ -\n' +
                'Connection: ' + result['DiscoveryStatus'] + '\n' +
                'Service: ' + result['DiscoveryService'] + '\n');

    console.log('- Hulu Japan -\n' +
                'Connection: ' + result['HuluJPStatus'] + '\n' +
                'Service: ' + result['HuluJPService'] + '\n');

    console.log('- U-Next TV -\n' +
                'Connection: '  + result['UNextTVStatus'] + '\n' +
                'Service: ' + result['UNextTVService'] + '\n');

    console.log('- AbemaTV -\n' +
                'Connection: '  + result['AbemaTVStatus'] + '\n' +
                'Service: ' + result['AbemaTVService'] + '\n');

    console.log('- Cygame - Umamusume -\n' +
                'Connection: '  + result['UmamusumeStatus'] + '\n' +
                'Service: ' + result['UmamusumeService'] + '\n');

    console.log('- Ani.gamer.com.tw -\n' +
                'Connection: '  + result['AniGamerStatus'] + '\n' +
                'Service: ' + result['AniGamerService'] + '\n');

    console.log('- Viu -\n' +
                'Connection: '  + result['ViuStatus'] + '\n' +
                'Service: ' + result['ViuService'] + '\n');

})().finally(() => {
    console.log(JSON.stringify(message));
    $notify('Finished to test.', 'Please check the detail.');
    $done();
});