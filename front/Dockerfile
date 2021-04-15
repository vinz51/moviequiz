FROM node:14.16.0-alpine3.12
WORKDIR /usr/src/front
COPY ./package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
# Run start script in package.json
CMD ["yarn", "start"]
