## Oops
I messed with some rate limits from let's encrypt.
Lost the recent certs. So it can be offline for a while :(.

# What is this

This is a simple nodejs server. It can proxy your local traffic with a valid certificate from the localh.app or *
.localh.app. The dns from the domain is pointing to 127.0.0.1.

There is also an experimental nameserver, so you can connect from a mobile phone. It will change the dns from *
.localh.app to the ip of the host.

There is also a cli, if you only want to download the certificate.

# Server / Gui

#### Install

```npm i -g @localhapp/server```

#### Run

```localhapp```

A webpage where you can proxy *.localh.app to your localhost or other adresses. There is also a small api available.

![](docs/config_localh_app.png)

Please make sure that node is able to open port 80, 443 and 53. See: https://gist.github.com/firstdoit/6389682

# Cli only


#### Install

You can dowload / update your certs with the command line
```npm i -g @localhapp/cli```

#### Run

```localh-cli```

![](docs/install_cli.gif)

### Settings under vue.config.js

If you want to load a hmr Vue project to listen on a domain:

```javascript
module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    devServer: {
        host: '0.0.0.0',
        port: '8080',
        public: 'test.localh.app',
    }
}
```


