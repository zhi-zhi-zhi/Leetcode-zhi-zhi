{
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      try {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          alert(xhr.responseText);
        } else {
          alert('Request was unsuccessful: ' + xhr.status);
        }
      } catch (e) {
        // 假设由 ontimeout 处理
      }
    }
  };

  let url = 'hello';
  url = addURLParam(url, 'name', 'TanQiang');
  url = addURLParam(url, 'age', 21);

// 只能访问同源 URL
  xhr.open('get', 'hello', true);
// setRequestHeader 设置 HTTP 头部字段，必须在 open() 之后、send() 之前调用
  xhr.setRequestHeader('MyHeader', 'MyValue');
  xhr.send(null);


// 停止触发事件，并阻止访问这个对象上任何与响应相关的属性。
//   xhr.abort();
// 中断后，应取消对 XHR 对象的引用。
// xhr = null;

// 由于内存问题，不推荐重用 XHR 对象。


  let myHeader = xhr.getResponseHeader('MyHeader');
  let allHeaders = xhr.getAllResponseHeaders();


  function addURLParam(url, name, value) {
    url += (url.indexOf('?') === -1 ? '?' : '&');
    // URI: Uniform Resources Identifier
    // 查询字符串的每个名和值都必须使用 encodeURIComponent() 编码
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);

    return url;
  }
}

{
  function submitData() {
    let xhr = new XMLHttpRequest();

    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4) {
    //     try {
    //       if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
    //         alert(xhr.responseText);
    //       } else {
    //         alert("Request was unsuccessful: " + xhr.status);
    //       }
    //     } catch (e) {
    //       // 假设由 ontimeout 处理
    //     }
    //   }
    // };

    // 只要是从服务器接到响应，无论状态码是什么，都会触发 load 事件。
    // Firefox 的 onload 事件实际上会收到一个 event 对象，但考虑到跨浏览器兼容，还是需要像下面这样使用 XHR 对象变量。
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        try {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            alert(xhr.responseText);
          } else {
            alert('Request was unsuccessful: ' + xhr.status);
          }
        } catch (e) {
          // 假设由 ontimeout 处理
        }
      }
    };

    // event.target 为 XHR 对象，event 包含三个额外属性：lengthComputable、position 和 totalSize（2021年1月18日实际为：total）。
    // lengthComputable: 进度信息是否可用。
    // position：        已接受到的字节数。
    // total：           响应的 Content-Length 头部定义的总字节数。
    // 有了这三个信息，就可以给用户提供进度条了。
    xhr.onprogress = (event) => {
      let divStatus = document.getElementById('status');
      if (event.lengthComputable) {
        divStatus.innerHTML = 'Received ' + event.position + ' of ' + event.total + ' bytes';
      }
    };

    xhr.open('post', 'postOfHello', true);
    // 超时回除法 ontimeout 事件处理程序，readyState 仍然会变成 4，因此也会调用 onreadystatechange 事件处理程序
    // 但在超时之后访问 status 属性则会发生错误，所以要加上 try/catch
    xhr.timeout = 1000;
    xhr.ontimeout = () => {
      alert('Request did not return in a second.');
    };
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let form = document.getElementById('user-info');
    // FormData 自动对表单数据进行序列化
    // 且 XHR 对象能够识别作为 FormData 实例传入的数据类型并自动配置相应的头部
    // MIME Multipurpose Internet Mail Extensions
    xhr.overrideMimeType('text/xml');
    xhr.send(new FormData(form));
  }
}

{
  // CORS： Cross-Origin Resource Sharing
  // 基本思路：使用自定义的　HTTP 头部允许浏览器和服务器相互了解，以确实请求或响应应该成功还是失败。

  // 对于简单的请求，比如 GET 或 POST 请求，没有自定义头部，且请求体类型为 text/plain，
  // 此时的请求在发送时会有一个额外的头部叫 Origin
  // 跨域 XHR 对象允许访问 status 和 statusText 属性，也允许同步请求。
  // 但出于安全考虑，跨域 XHR 对象施加了一些额外限制：
  // 1.不能使用 setRequestHeader() 设置自定义头部。
  // 2.不能发送和接受 Cookie。
  // 3.getAllResponseHeaders() 方法始终返回空字符串

  // CORS 通过一种叫预检(preflighted request)的服务器验证机制，
  // 允许使用自定义头部、除 GET 和 POST 之外方法，以及不同请求体内容类型。
  // 在发送设计上述某种高级选项的请求时，会先向服务器发送一个“预检”请求，该请求使用 OPTIONS 方法并包含以下头部
  // 1. Origin：与简单请求相同
  // 2.Access-Control-Request-Method：请求希望使用的方法
  // 3.Access-Control-Request-Headers：（可选）要使用的逗号分割的自定义头部列表。
  // 例如包含自定义的 TQ 和 tq 头部的 POST 请求的预检：
  // Origin: http://www.tq.net
  // Access-Control-Request-Method: POST
  // Access-Control-Request-Headers: TQ, tq
  // 服务器在响应头中返回的相关信息：
  // 1. Origin：与简单请求相同。
  // 2.Access-Control-Allow-Method：允许的方法（逗号分割的列表）。
  // 3.Access-Control-Allow-Headers：服务器允许的头部（逗号分割的列表）。
  // 4.Access-Control.Max-Age：缓存预检请求的描述。

  // 默认情况，跨域请求不提供凭据：Cookie、HTTP 认证和客户端 SSL 证书。
  // 可以通过设置 withCredentials 属性为 true 来表明会发送凭据。
  // 若服务器允许，则响应中也会包含响应头部且值为 true
  // 否则浏览器不会把响应交给 JavaScript：responseText 为空字符串，status 为 0， onerror() 被调用
}
