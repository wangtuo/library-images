FROM centos:7

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY start.sh /start.sh

CMD [ "./start.sh" ]
