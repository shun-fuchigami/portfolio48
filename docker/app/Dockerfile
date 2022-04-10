FROM --platform=linux/amd64 centos:centos7.4.1708

RUN  yum update -y
RUN  curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
RUN  yum install -y nodejs

RUN  yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
RUN  yum -y install --enablerepo=remi,remi-php74 php php-fpm php-devel php-mbstring php-pdo php-mysql php-gd php-xml php-mcrypt

RUN  cp -p /etc/php.ini /etc/php.ini.org
COPY php.ini /etc/php.ini
RUN  cp -p /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.conf.org
COPY www.conf /etc/php-fpm.d/www.conf
RUN  mkdir -p /run/php-fpm

RUN  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN  php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    
RUN  php composer-setup.php
RUN  php -r "unlink('composer-setup.php');"
RUN  mv composer.phar /usr/local/bin/composer

RUN groupadd nginx
RUN useradd -g nginx nginx
RUN usermod -s /bin/false nginx
RUN chown nginx:nginx /var/lib/php/session  
