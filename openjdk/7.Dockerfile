FROM openjdk:7

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY loop.sh /loop.sh

CMD [ "/loop.sh" ]
