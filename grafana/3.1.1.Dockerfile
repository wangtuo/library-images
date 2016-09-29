FROM debian:jessie

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

ADD sources.list.jessie /etc/apt/sources.list
RUN apt-get update && \
    apt-get -y --no-install-recommends install libfontconfig curl ca-certificates && \
    apt-get clean && \
    curl http://7xqd3r.com1.z0.glb.clouddn.com/library_images/grafana_3.1.1-1470047149_amd64.deb > /tmp/grafana.deb && \
    dpkg -i /tmp/grafana.deb && \
    rm /tmp/grafana.deb && \
    curl -L http://7xqd3r.com1.z0.glb.clouddn.com/library_images/gosu-amd64 > /usr/sbin/gosu && \
    chmod +x /usr/sbin/gosu && \
    apt-get remove -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

VOLUME ["/grafana"]

EXPOSE 3000

COPY grafana.ini /etc/grafana/grafana.ini
COPY start.sh /start.sh

ENTRYPOINT []
CMD ["/start.sh"]
