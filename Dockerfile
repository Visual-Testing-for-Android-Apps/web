FROM node:14-alpine AS BUILD_STAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM gcr.io/distroless/nodejs:14

WORKDIR /app

COPY --from=BUILD_STAGE /usr/src/app ./

EXPOSE 3000

CMD ["server.js"]
