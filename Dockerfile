
FROM node:12-alpine
MAINTAINER William Nunes

WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN yarn build

ENTRYPOINT [ "sh", "./init.sh" ]
