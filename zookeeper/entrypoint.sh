#!/bin/bash

set -e

# Add /opt/zookeeper/bin/zkServer.sh as command if needed
if [ "${1:0:1}" = '-' ]; then
    set -- /opt/zookeeper/bin/zkServer.sh "$@"
fi

# Drop root privileges if we are running zookeeper
# allow the container to be started with `--user`
if [ "$1" = '/opt/zookeeper/bin/zkServer.sh' -a "$(id -u)" = '0' ]; then
    chown -R zookeeper:zookeeper /data
    
    set -- gosu zookeeper "$@"
fi

if [[ "$ZOOKEEPER_DATADIR" != "" ]]; then
    test -d "$ZOOKEEPER_DATADIR" || mkdir "$ZOOKEEPER_DATADIR"
    chown -R zookeeper:zookeeper "$ZOOKEEPER_DATADIR"
else
    echo "invalid datadir: $ZOOKEEPER_DATADIR"
    exit 1
fi

if [[ "$ZOOKEEPER_MYID" =~ ^[0-9]+$ ]]; then
    echo "$ZOOKEEPER_MYID" > "$ZOOKEEPER_DATADIR/myid"
    chown zookeeper:zookeeper "$ZOOKEEPER_DATADIR/myid"
else
    echo "invalid myid: $ZOOKEEPER_MYID"
    exit 2
fi

sed -i "s#%%ZOOKEEPER_DATADIR%%#$ZOOKEEPER_DATADIR#g" /opt/zookeeper/conf/zoo.cfg

for server in $(env | grep ^ZOOKEEPER_SERVER_); do
    ID=$(echo $server | cut -d= -f 1 | grep -oP '\d+')
    SERVER=$(echo $server | cut -d= -f 2)
    echo "server.${ID}=$SERVER" >> /opt/zookeeper/conf/zoo.cfg
done

# As argument is not related to /opt/zookeeper/bin/zkServer.sh,
# then assume that user wants to run his own process,
# for example a `bash` shell to explore this image
exec "$@"
