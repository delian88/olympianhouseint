const crypto = require('crypto');
const https = require('https');

const cloudName = 'h8he9fel';
const apiKey = '234241878558291';
const apiSecret = 'UGpz_fzQXMWe9YxyAmyF843HxzA';

const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto.createHash('sha1').update('timestamp=' + timestamp + apiSecret).digest('hex');

const req = https.request('https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---BOUNDARY'
  }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Status:', res.statusCode, body));
});

req.on('error', console.error);

const body = Buffer.from(
  '---BOUNDARY\r\n' +
  'Content-Disposition: form-data; name="api_key"\r\n\r\n' +
  apiKey + '\r\n' +
  '---BOUNDARY\r\n' +
  'Content-Disposition: form-data; name="timestamp"\r\n\r\n' +
  timestamp + '\r\n' +
  '---BOUNDARY\r\n' +
  'Content-Disposition: form-data; name="signature"\r\n\r\n' +
  signature + '\r\n' +
  '---BOUNDARY\r\n' +
  'Content-Disposition: form-data; name="file"; filename="test.pdf"\r\n' +
  'Content-Type: application/pdf\r\n\r\n' +
  '%PDF-1.4\n%EOF\r\n' +
  '---BOUNDARY--\r\n'
);

req.write(body);
req.end();
