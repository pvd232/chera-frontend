# Build environment
# Static React app
FROM node:16.13.1-bullseye as react-build
WORKDIR /app
RUN mkdir -p /app/frontend-react-app
ADD /frontend-react-app ./frontend-react-app
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
WORKDIR /app/frontend-react-app
RUN npm i
# Build the app
RUN npm run build

# server environment
FROM fholzer/nginx-brotli:v1.21.6
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=react-build /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
