const fs = require('fs');
const axios = require('axios');

// 读取 HTML 文件内容
const filePath = './index.html';
const fileContent = fs.readFileSync(filePath, 'utf-8');

// 构造 curl 命令
const curlCommand = `
curl -X PUT "http://cloudfs-bigfile.didapinche.com:7786/bfs/bigfile/doc/magiccubegubaquery.html" \
    -H "Content-Type: multipart/form-data" \
    -H "Permission: public" \
    --connect-timeout 500 \
    --max-time 500 \
    --data-binary '${fileContent.replace(/'/g, "'\\''")}'
`;

// 发送请求
async function uploadFile() {
  try {
    const response = await axios.post(
      'https://capis-ecs.didapinche.com/web/webtool/bfs/bigfile/curl',
      { curl: curlCommand }
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

uploadFile();
