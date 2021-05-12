# Cli

You can dowload / update your certs with the command line
```npm i @localhapp/cli```

![](docs/install_cli.gif)

# Gui
A webpage where you can proxy *.localh.app to your localhost or other adresses.
There is also a small api available.


Please make sure that node is able to open port 80, 443 and 53.
```bash
user@server:~/$ whereis node
node: /usr/local/bin/node

user@server:~/$ sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
```
