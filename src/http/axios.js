import axios from "axios";

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if(response.headers['content-type'] && response.headers['content-type'] === "application/octet-stream"){
      downloadFile(response.data,response.headers['content-disposition'].split('filename=')[1])
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function postRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        params
      )
      .then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export function downloadRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { responseType: 'blob' })
      .then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
function downloadFile(binary,name){
  // 创建一个blob对象
  const blob = new Blob([binary]);

  // 创建一个下载链接
  const downloadLink = document.createElement('a');
  const href = window.URL.createObjectURL(blob);

  // 设置下载链接的属性
  downloadLink.href = href;
  downloadLink.download = name; // 你可以根据实际需要设置文件名

  // 添加下载链接到DOM，模拟点击下载
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 清理
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(href);
}