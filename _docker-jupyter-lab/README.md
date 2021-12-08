# docker-jupyter-lab
It is an environment to run Jupyter Lab with docker for mac

## Starting method
Please install docker for mac to use.

Start docker for mac and enter the command in the terminal.

Move to docker-jupyter-lab directory.
```
$ cd docker-jupyter-lab
```

Build the service.
```
$ docker-compose build
```

After building, start the service.
```
$ docker-compose up
```

When you access the URL displayed in the terminal, the notebook will be launched.

(example)
```
http://127.0.0.1:8888/lab?token=XXXXX
```

The notebook is saved in the app directory.

When you're done, type `ctr + c` in the terminal. Then enter the command in the terminal to end the service.
```
$ docker-compose down
```