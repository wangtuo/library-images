FROM java:8

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY loop.sh /loop.sh

CMD [ "/loop.sh" ]
