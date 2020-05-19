FROM node:14.2.0-alpine3.11
LABEL MAINTAINER="Madhu Akula"
LABEL NAME="tools.tldr.run"
LABEL WEBSITE="https://tools.tldr.run"

RUN apk --no-cache add jq \
    && mkdir -p /home/node/app \
    && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node . ./

EXPOSE 8080

CMD [ "npm", "run", "serve"]