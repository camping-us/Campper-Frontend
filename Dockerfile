# Build Stage
FROM node:its-alpine as build-stage
WORKDIR /app
COPY package.json .

ADD . .
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "serve"]

# Production Stage
FROM nginx:1.21.4
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]