FROM node:16-alpine3.11 as dependencies

WORKDIR /app
COPY ./web/package.json ./web/yarn.lock ./web/

WORKDIR /app/web
RUN yarn install --frozen-lockfile

FROM node:16-alpine3.11 as builder

WORKDIR /app
COPY ./web ./web
COPY ./api-models ./api-models

WORKDIR /app/web
COPY --from=dependencies /app/web/node_modules ./node_modules
RUN yarn lint
RUN yarn build

FROM node:16-alpine3.11 as release

WORKDIR /app
RUN yarn install --only=production 

COPY --from=builder  /app/web/.next/standalone ./
COPY --from=builder  /app/web/.next/static ./.next/static
COPY --from=builder  /app/web/public ./public

CMD ["node", "server.js"]
