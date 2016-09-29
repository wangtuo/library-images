#!/bin/bash

# extract pushgateway binary
docker rm -f extract-pushgateway-tmp
docker run --name=extract-pushgateway-tmp -d quay.io/prometheus/pushgateway
docker cp extract-pushgateway-tmp:/bin/pushgateway .
docker rm -f extract-pushgateway-tmp
