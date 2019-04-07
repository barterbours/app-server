FROM node
WORKDIR /usr/src/app

USER root

COPY . .

RUN npm install typescript
RUN npm install -g ts-node nodemon typescript
RUN npm install --save

EXPOSE 8084

CMD ["nodemon", "."]