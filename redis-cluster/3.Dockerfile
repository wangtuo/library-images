FROM redis:3

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ADD redis.conf /etc/redis/redis.conf
RUN chown redis:redis /etc/redis/redis.conf
ENV CLUSTER_NODE_TIMEOUT 5000
RUN mkdir -p /data/db
ENV CLUSTER_NODE_DB /data/db
COPY redis-cluster-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/redis-cluster-entrypoint.sh
ENTRYPOINT ["/usr/local/bin/redis-cluster-entrypoint.sh"]
