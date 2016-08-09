FROM alpine:3.4

RUN apk --update upgrade && \
    apk add tzdata curl ca-certificates && \
    update-ca-certificates && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*

ADD start.sh /

CMD ["./start.sh"]
