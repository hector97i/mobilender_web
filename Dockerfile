FROM python:3.7

# USER app
ENV PYTHONUNBUFFERED 1
# RUN mkdir /db
#RUN chown app:app -R /db

RUN mkdir /code
WORKDIR /code
COPY . /code/
# ADD requirements.txt /code/
RUN pip3 install -r requirements.txt

CMD ["gunicorn", "-c", "config/gunicorn/conf.py", "--bind", ":8000", "--chdir", "src", "mobilender.wsgi:application"]
