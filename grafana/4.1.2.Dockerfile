FROM debian:jessie

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY pandora-grafana-proxy.conf /pandora/proxy.conf

ADD sources.list.jessie /etc/apt/sources.list
RUN apt-get update && \
    apt-get -y --no-install-recommends install libfontconfig curl ca-certificates && \
    apt-get clean && \
    curl http://okxq98xn6.bkt.clouddn.com/grafana_4.1.2-1486989747_amd64.deb > /tmp/grafana.deb && \
    dpkg -i /tmp/grafana.deb && \
    rm /tmp/grafana.deb && \
    curl -L http://7xqd3r.com1.z0.glb.clouddn.com/library_images/gosu-amd64 > /usr/sbin/gosu && \
    chmod +x /usr/sbin/gosu
RUN curl http://oji8s4dhx.bkt.clouddn.com/PANDORATSDB.2017-03-21-12-02-43.tar.gz > /tmp/grafanaProxy.tar.gz && \
    tar -xzvf /tmp/grafanaProxy.tar.gz -C /tmp/ && rm /tmp/grafanaProxy.tar.gz &&\
    mv /tmp/_package/pandora-grafanaProxy  /pandora/grafanaProxy && \
    rm -rf /tmp/_package && \
    chmod +x /pandora/grafanaProxy
RUN apt-get remove -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

VOLUME ["/grafana"]

EXPOSE 3000

COPY plugins /grafana/plugins
COPY assets /usr/share/grafana/public/app/plugins/pili
COPY datasource/kirkmonitor /usr/share/grafana/public/app/plugins/datasource/kirkmonitor
COPY datasource/influxdb-config.html /usr/share/grafana/public/app/plugins/datasource/influxdb/partials/config.html
RUN find /usr/share/grafana/public/app -name "*.js" | xargs sed -i 's/InfluxDB Details/Pandora TSDB Details/g'
RUN find /usr/share/grafana/public/app -name "*.js" | xargs sed -i 's/localhost:8086/localhost:8999/g'
COPY datasource/influxdb-plugin.json /usr/share/grafana/public/app/plugins/datasource/influxdb/plugin.json
COPY grafana.4.1.2.ini /etc/grafana/grafana.ini
COPY start.4.1.2.sh /start.sh

ENTRYPOINT []
CMD ["/start.sh"]
