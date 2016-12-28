FROM alpine:3.5

RUN sed -i s/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g /etc/apk/repositories && \
  apk --update upgrade && \
  apk add tzdata curl ca-certificates && \
  update-ca-certificates && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  apk del tzdata && \
  rm -rf /var/cache/apk/*

ADD loop.sh /

CMD ["./loop.sh"]
