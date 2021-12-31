FROM node:16-alpine3.11 as dependencies

WORKDIR /app
COPY ./api/package.json ./api/yarn.lock ./api/

WORKDIR /app/api
RUN yarn install --frozen-lockfile

FROM node:16-alpine3.11 as builder

WORKDIR /app
COPY ./api ./api
COPY ./api-models ./api-models

WORKDIR /app/api
COPY --from=dependencies /app/api/node_modules ./node_modules
RUN yarn lint
RUN yarn build

FROM node:16-alpine3.11 as release

WORKDIR /app
COPY --from=builder /app/api/package.json ./package.json
COPY --from=builder /app/api/yarn.lock ./yarn.lock
RUN yarn install --only=production 
COPY --from=builder /app/api/dist ./dist

CMD ["node", "dist/api/src/main.js"]
