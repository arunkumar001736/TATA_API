FROM node:20

WORKDIR /app

COPY index.js .
COPY otp.html .
COPY package.json .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]


