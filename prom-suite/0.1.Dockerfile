FROM quay.io/prometheus/prometheus
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY pushgateway /bin/pushgateway
COPY start.sh /bin/start.sh

ENTRYPOINT []
CMD ["/bin/start.sh"]
