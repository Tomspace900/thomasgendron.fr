FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false
RUN yarn build
RUN rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true
FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app  .
ENV HOST 0.0.0.0
ENV PORT=3003
ENV NUXT_ENV_API_URL=http://localhost:8008
EXPOSE 3003
CMD [ "yarn", "start" ]