FROM pingcap/tikv:rc1.1

RUN sed -i s/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g /etc/apk/repositories && \
  apk --update upgrade && \
  apk add tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  apk del tzdata && \
  rm -rf /var/cache/apk/*

ADD run-tikv-server.sh /

ENTRYPOINT []
CMD /run-tikv-server.sh
