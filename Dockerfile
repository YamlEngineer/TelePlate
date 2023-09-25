FROM python:3.11-alpine
WORKDIR /app
ADD app/requirements.txt .
RUN pip install -r requirements.txt
COPY app/ /app/
CMD ["python3", "main.py"]