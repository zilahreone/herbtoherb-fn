current directory herbtoherb
```
sudo docker build -t hub.meca.in.th/meca/herbtoherb:dev .
```

next step
```
docker login inobox.azurecr.io

sudo docker push hub.meca.in.th/meca/herbtoherb:dev
```
