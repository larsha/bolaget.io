FROM node:6.2.2

RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json
RUN npm install
ADD . .

CMD [ "npm", "run", "dev" ]
