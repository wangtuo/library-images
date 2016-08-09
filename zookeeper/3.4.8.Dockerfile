FROM java:8-jre
MAINTAINER QCOS Team <qcos@qiniu.com>

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

ARG MIRROR=http://mirrors.aliyun.com/apache
ARG VERSION=3.4.8

LABEL name="zookeeper" version=$VERSION

# grab gosu for easy step-down from root
ENV GOSU_VERSION 1.9
RUN set -x \
    && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture)" \
    && wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture).asc" \
    && export GNUPGHOME="$(mktemp -d)" \
    && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
    && gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
    && rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true

# add our user and group first to make sure their IDs get assigned consistently, regardless of whatever dependencies get added
RUN groupadd -r zookeeper && useradd -r -g zookeeper zookeeper
RUN test -d /opt || mkdir /opt
RUN wget -q -O - $MIRROR/zookeeper/zookeeper-$VERSION/zookeeper-$VERSION.tar.gz | tar -xzf - -C /opt
RUN mv /opt/zookeeper-$VERSION /opt/zookeeper

ADD zoo.cfg /opt/zookeeper/conf/zoo.cfg

ENV ZOOKEEPER_MYID %%ZOOKEEPER_MYID%%
ENV ZOOKEEPER_DATADIR /data/zookeeper

VOLUME /data

WORKDIR /opt/zookeeper

ADD entrypoint.sh /

EXPOSE 2181 2888 3888
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/opt/zookeeper/bin/zkServer.sh", "start-foreground"]
