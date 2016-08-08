FROM ubuntu:14.04

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN sed -i s/archive.ubuntu.com/mirrors.163.com/g /etc/apt/sources.list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 \
  && echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" >> /etc/apt/sources.list.d/mongodb-org-3.0.list

RUN apt-get update && \
  apt-get install -qy dnsutils mongodb-org-shell curl ruby rubygems \
  wget telnet mysql-client redis-tools python-pip \
  tmux vim python2.7 python-pymongo \
  apache2-utils iperf tcpdump tcpflow lsof iproute2 \
  python-pymongo-ext httpie nginx && \
  echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install redis

ADD redis-trib.rb /

ADD default.conf /etc/nginx/sites-available/default

COPY start.sh /start.sh

CMD [ "./start.sh" ]
