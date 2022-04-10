FROM --platform=linux/amd64 centos:centos7.4.1708

RUN yum update -y
RUN yum install -y yum-utils

COPY nginx.repo /etc/yum.repos.d/
RUN yum install -y nginx
COPY default.conf /etc/nginx/conf.d/

ENTRYPOINT /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf