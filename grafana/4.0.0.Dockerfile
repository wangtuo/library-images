FROM debian:jessie

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY pandora-grafana-proxy.conf /pandora/proxy.conf

ADD sources.list.jessie /etc/apt/sources.list
RUN apt-get update && \
    apt-get -y --no-install-recommends install libfontconfig curl ca-certificates && \
    apt-get clean && \
    curl http://7xqd3r.com1.z0.glb.clouddn.com/library_images/grafana_4.0.0-1480439068_amd64.deb > /tmp/grafana.deb && \
    dpkg -i /tmp/grafana.deb && \
    rm /tmp/grafana.deb && \
    curl -L http://7xqd3r.com1.z0.glb.clouddn.com/library_images/gosu-amd64 > /usr/sbin/gosu && \
    chmod +x /usr/sbin/gosu && \
    curl http://oht9qv125.bkt.clouddn.com/grafanaProxy?20161209 > /pandora/grafanaProxy && \
    chmod +x /pandora/grafanaProxy && \
    apt-get remove -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

VOLUME ["/grafana"]

EXPOSE 3000

COPY datasource/kirkmonitor /usr/share/grafana/public/app/plugins/datasource/kirkmonitor
COPY datasource/pandoratsdb /usr/share/grafana/public/app/plugins/datasource/pandoratsdb
COPY init.4.0.0.db /etc/grafana/init.4.0.0.db
COPY grafana.4.0.0.ini /etc/grafana/grafana.ini
COPY start.4.0.0.sh /start.sh

ENTRYPOINT []
CMD ["/start.sh"]
