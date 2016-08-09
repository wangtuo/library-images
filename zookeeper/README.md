# zookeeper

## Usage

```
kirk stacks run zookeeper -f zookeeper.example.yml 
```

## Test

Run `kirk services run qiniutools -i qiniutools` to start a qiniutools
services.

```
[qiniutools] for i in {1..3}; do echo stat | nc node$i.zookeeper 2181; done
```
