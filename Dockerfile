FROM node:lts-alpine
ENV NODE_ENV=prod
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i --prod --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
