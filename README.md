# Route

[生成二维码 http://127.0.0.1:8787/qr](http://127.0.0.1:8787/qr)

|        | 值   | 类型   | 备注          |
| ------ | ---- | ------ | ------------- |
| route  | /qr  |
| method | get  |
| param  | text | String | maxlength=300 |




# 👷 `worker-template` Hello World

A template for kick starting a Cloudflare worker project.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

#### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).
