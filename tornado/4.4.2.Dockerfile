FROM python:3

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /usr/src/app/

COPY pip-douban.conf /etc/pip.conf
COPY requirements.txt /usr/src/app/
COPY hello.py /usr/src/app/start.py

RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "./start.py"]
