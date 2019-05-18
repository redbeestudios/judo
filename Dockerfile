FROM node:8

WORKDIR /usr/src/app

COPY src/ src/
COPY bin/ bin/
COPY package.json package.json

RUN npm install --loglevel verbose

ENTRYPOINT [ "./bin/judo" ]