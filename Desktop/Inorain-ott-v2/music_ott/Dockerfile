FROM node:22 AS builder
WORKDIR app

COPY . .

RUN node -e 'let fs = require("fs"); let f = "package.json"; let j = JSON.parse(fs.readFileSync(f)); j.browserslist = ["chrome 28"]; fs.writeFileSync(f, JSON.stringify(j, null, 2));'

RUN npm install

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app .

COPY set_env.sh ./set_env.sh

RUN chmod +x ./set_env.sh

CMD ["sh", "-c", "sh /usr/share/nginx/html/set_env.sh && nginx -g 'daemon off;'"]
