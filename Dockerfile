FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* npm-shrinkwrap.json* ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV production
ENV PORT=3003
ENV BASE_URL=http://localhost:8008
EXPOSE 3003
CMD npm start