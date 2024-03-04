current directory herbtoherb
```
sudo docker build -t hub.meca.in.th/meca/herbtoherb:dev .
```

next step
```
docker login inobox.azurecr.io
user: inobox
password: ve+4Txs07CLovaOTrIcTFv=z+9jla44p

sudo docker push hub.meca.in.th/meca/herbtoherb:dev
```