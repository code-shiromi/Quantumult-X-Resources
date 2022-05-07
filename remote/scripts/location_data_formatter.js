/* References: https://raw.githubusercontent.com/crossutility/Quantumult-X/master/sample-location-with-script.js, https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/Scripts/IP_API.js
 * Geo-IP API provider: ipinfo.io
 * Example from http://ipinfo.io/json
{
    "ip": "0.0.0.0",
    "hostname": "",
    "city": "Japan",
    "region": "Tokyo",
    "country": "JP",
    "loc": "",
    "org": "",
    "timezone": "Asia/Japan",
    "readme": "https://ipinfo.io/missingauth"
} */

if ($response.statusCode != 200) {
    $done(Null);
}

var flags = new Map([["AC","🇦🇨"], ["AE","🇦🇪"], ["AF","🇦🇫"], ["AI","🇦🇮"], ["AL","🇦🇱"], ["AM","🇦🇲"], ["AQ","🇦🇶"], ["AR","🇦🇷"], ["AS","🇦🇸"], ["AT","🇦🇹"], ["AU","🇦🇺"], ["AW","🇦🇼"], ["AX","🇦🇽"], ["AZ","🇦🇿"], ["BA","🇧🇦"], ["BB","🇧🇧"], ["BD","🇧🇩"], ["BE","🇧🇪"], ["BF","🇧🇫"], ["BG","🇧🇬"], ["BH","🇧🇭"], ["BI","🇧🇮"], ["BJ","🇧🇯"], ["BM","🇧🇲"], ["BN","🇧🇳"], ["BO","🇧🇴"], ["BR","🇧🇷"], ["BS","🇧🇸"], ["BT","🇧🇹"], ["BV","🇧🇻"], ["BW","🇧🇼"], ["BY","🇧🇾"], ["BZ","🇧🇿"], ["CA","🇨🇦"], ["CF","🇨🇫"], ["CH","🇨🇭"], ["CK","🇨🇰"], ["CL","🇨🇱"], ["CM","🇨🇲"], ["CN","🇨🇳"], ["CO","🇨🇴"], ["CP","🇨🇵"], ["CR","🇨🇷"], ["CU","🇨🇺"], ["CV","🇨🇻"], ["CW","🇨🇼"], ["CX","🇨🇽"], ["CY","🇨🇾"], ["CZ","🇨🇿"], ["DE","🇩🇪"], ["DG","🇩🇬"], ["DJ","🇩🇯"], ["DK","🇩🇰"], ["DM","🇩🇲"], ["DO","🇩🇴"], ["DZ","🇩🇿"], ["EA","🇪🇦"], ["EC","🇪🇨"], ["EE","🇪🇪"], ["EG","🇪🇬"], ["EH","🇪🇭"], ["ER","🇪🇷"], ["ES","🇪🇸"], ["ET","🇪🇹"], ["EU","🇪🇺"], ["FI","🇫🇮"], ["FJ","🇫🇯"], ["FK","🇫🇰"], ["FM","🇫🇲"], ["FO","🇫🇴"], ["FR","🇫🇷"], ["GA","🇬🇦"], ["GB","🇬🇧"], ["GE","🇬🇪"], ["GR","🇬🇷"], ["HK","🇭🇰"], ["HR","🇭🇷"] ,["HU","🇭🇺"], ["ID","🇮🇩"], ["IE","🇮🇪"], ["IL","🇮🇱"], ["IM","🇮🇲"], ["IN","🇮🇳"], ["IR","🇮🇷"] ,["IS","🇮🇸"], ["IT","🇮🇹"], ["JO","🇯🇴"], ["JP","🇯🇵"], ["KE","🇰🇪"], ["KG","🇰🇬"], ["KH","🇰🇭"], ["KR","🇰🇷"], ["KZ","🇰🇿"], ["LT","🇱🇹"], ["LU","🇱🇺"], ["LV","🇱🇻"] ,["MA","🇲🇦"], ["MD","🇲🇩"], ["MK","🇲🇰"], ["MN","🇲🇳"], ["MO","🇲🇴"], ["MX","🇲🇽"], ["MY","🇲🇾"] ,["NG","🇳🇬"], ["NL","🇳🇱"], ["NO","🇳🇴"], ["NP","🇳🇵"], ["NZ","🇳🇿"], ["PA","🇵🇦"], ["PE","🇵🇪"], ["PH","🇵🇭"], ["PK","🇵🇰"], ["PL","🇵🇱"], ["PT","🇵🇹"], ["RO","🇷🇴"], ["RS","🇷🇸"], ["RU","🇷🇺"], ["RW","🇷🇼"], ["SA","🇸🇦"], ["SB","🇸🇧"], ["SC","🇸🇨"], ["SD","🇸🇩"], ["SE","🇸🇪"], ["SG","🇸🇬"], ["SI","🇸🇮"], ["SK","🇸🇰"], ["TH","🇹🇭"], ["TN","🇹🇳"], ["TO","🇹🇴"], ["TR","🇹🇷"], ["TV","🇹🇻"], ["TW","🇹🇼"], ["UA","🇺🇦"], ["UK","🇬🇧"], ["UM","🇺🇲"], ["US","🇺🇸"], ["UY","🇺🇾"], ["UZ","🇺🇿"], ["VA","🇻🇦"], ["VE","🇻🇪"], ["VG","🇻🇬"], ["VI","🇻🇮"], ["VN","🇻🇳"], ["ZA","🇿🇦"]]);
var body = $response.body;
var obj = JSON.parse(body);
var flag = flags.get(obj['country']);

var ip = obj['ip'];
var title = flag + ' ' + obj['city'];
var subtitle = 'ISP: ' + obj['org'];
var description = 'Server location: ' + flag + ' ' + obj['region'] + '\n' + 'IP: ' + ip + '\n' + 'ISP: ' + obj['org'];

$done({title, subtitle, ip, description});