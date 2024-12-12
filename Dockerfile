FROM python:3.10-slim

ENV PYTHONUNBUFFERED True

WORKDIR /app

ENV PORT 5000

COPY . ./

RUN pip install --no-cache-dir -r requirements.txt

CMD ["flask","run"]