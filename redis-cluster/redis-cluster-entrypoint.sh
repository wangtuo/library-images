#!/bin/sh

chown redis:redis $CLUSTER_NODE_DB
chmod 770 $CLUSTER_NODE_DB
sed -i "s#\$CLUSTER_NODE_TIMEOUT#$CLUSTER_NODE_TIMEOUT#g" /etc/redis/redis.conf
sed -i "s#\$CLUSTER_NODE_DB#$CLUSTER_NODE_DB#g" /etc/redis/redis.conf

exec docker-entrypoint.sh redis-server /etc/redis/redis.conf
