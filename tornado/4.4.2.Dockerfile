FROM python:3

WORKDIR /usr/src/app/

COPY pip-douban.conf /etc/pip.conf
COPY requirements.txt /usr/src/app/
COPY hello.py /usr/src/app/start.py

RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "./start.py"]
