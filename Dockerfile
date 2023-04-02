# Build environment
# Static React app
FROM node:16.13.1-bullseye as react-build
WORKDIR /app
RUN mkdir -p /app/frontend-react-app
ADD /frontend-react-app ./frontend-react-app
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
WORKDIR /app/frontend-react-app
RUN npm i
# # Build the app
RUN npm run build

# # server environment
# ARG version=1.20.2

# FROM nginx:${version}-alpine AS builder

# ARG version

# WORKDIR /root/

# RUN apk add --update --no-cache build-base git pcre-dev openssl-dev zlib-dev linux-headers \
#     && wget http://nginx.org/download/nginx-${version}.tar.gz \
#     && tar zxf nginx-${version}.tar.gz \
#     && git clone https://github.com/google/ngx_brotli.git \
#     && cd ngx_brotli \
#     && git submodule update --init --recursive \
#     && cd ../nginx-${version} \
#     && ./configure \
#     --add-dynamic-module=../ngx_brotli \
#     --prefix=/etc/nginx \
#     --sbin-path=/usr/sbin/nginx \
#     --modules-path=/usr/lib/nginx/modules \
#     --conf-path=/etc/nginx/nginx.conf \
#     --error-log-path=/var/log/nginx/error.log \
#     --http-log-path=/var/log/nginx/access.log \
#     --pid-path=/var/run/nginx.pid \
#     --lock-path=/var/run/nginx.lock \
#     --http-client-body-temp-path=/var/cache/nginx/client_temp \
#     --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
#     --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
#     --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
#     --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
#     --with-perl_modules_path=/usr/lib/perl5/vendor_perl \
#     --user=nginx \
#     --group=nginx \
#     --with-compat \
#     --with-file-aio \
#     --with-threads \
#     --with-http_addition_module \
#     --with-http_auth_request_module \
#     --with-http_dav_module \
#     --with-http_flv_module \
#     --with-http_gunzip_module \
#     --with-http_gzip_static_module \
#     --with-http_mp4_module \
#     --with-http_random_index_module \
#     --with-http_realip_module \
#     --with-http_secure_link_module \
#     --with-http_slice_module \
#     --with-http_ssl_module \
#     --with-http_stub_status_module \
#     --with-http_sub_module \
#     --with-http_v2_module \
#     --with-mail \
#     --with-mail_ssl_module \
#     --with-stream \
#     --with-stream_realip_module \
#     --with-stream_ssl_module \
#     --with-stream_ssl_preread_module \
#     --with-cc-opt='-Os -fomit-frame-pointer -g' \
#     --with-ld-opt=-Wl,--as-needed,-O1,--sort-common \
#     && make modules

FROM zvonimirsun/nginx:stable-alpine-brotli
COPY nginx.conf /etc/nginx/conf.d/configfile.template


COPY --from=react-build /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
