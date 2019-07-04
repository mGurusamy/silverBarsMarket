FROM alpine:3.7
LABEL maintainer="manoharan.gurusamy@gmail.com"
RUN apk add --update nodejs nodejs-npm
COPY  . /app
WORKDIR /app
RUN rm -rf node_modules && npm install
ENV PORT=8000
EXPOSE $PORT
ENTRYPOINT [ "npm", "start" ]