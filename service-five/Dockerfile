 FROM node:20-alpine as dependencies
 WORKDIR /app
 RUN chown -R node:node /app
 COPY package.json tsconfig.json yarn.* ./
 COPY src src
 RUN yarn install
 ADD . .
 RUN yarn gcp-build

 FROM dependencies
 WORKDIR /app

 COPY package.json yarn.* ./
 RUN yarn install --production

#  COPY --from=dependencies /app/build build

 CMD ["node", "dist/index.js"]