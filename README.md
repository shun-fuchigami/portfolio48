*本番環境
VPS:ConohaVPS
ドメイン:Freenom
OS:CentOS Linux release 7.4.1708 (Core)
httpサーバー:nginx 1.21.6
APIサーバー:PHP 7.4.28
APサーバー:Node 16.14.2
DBサーバー:MySQL 8.0.28

*Nginxインストール
  公式ドキュメント
    https://nginx.org/en/linux_packages.html#RHEL-CentOS
  参考
    https://weblabo.oscasierra.net/nginx-centos7-install/

  1.リポジトリのインストール
    sudo yum install yum-utils

  2.設定ファイルの作成・記述
  パス：/etc/yum.repos.d/nginx.repo
  記述：
    [nginx-stable]
    name=nginx stable repo
    baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
    gpgcheck=1
    enabled=1
    gpgkey=https://nginx.org/keys/nginx_signing.key
    module_hotfixes=true

    [nginx-mainline]
    name=nginx mainline repo
    baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
    gpgcheck=1
    enabled=0
    gpgkey=https://nginx.org/keys/nginx_signing.key
    module_hotfixes=true

  3.Nginxインストール
    sudo yum install nginx

  4.自動起動設定
    systemctl enable nginx

  5.起動
    systemctl start nginx

  6.ファイアウォールで接続できないため、ポートの開放
  firewall-cmd --add-service=http --zone=public --permanent
  firewall-cmd --reload

  7.webサーバーを処理するユーザを作成
    groupadd xxxx
    useradd -g xxxx yyyy
    usermod -s /bin/false yyyy

  8.nginx.confの実行ユーザを変更
    user  yyyy;

*Node.jsインストール
  公式ドキュメント
    https://github.com/nodesource/distributions/blob/master/README.md
  参考
    https://www.ino-shika-cho.com/index.php/2020/05/15/post-489/

  1.リポジトリの追加
    curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -

  2.node.jsインストール（npmも同時にインストールされる）
    sudo yum install -y nodejs


*MySQLインストール
  ダウンロードサイト
    https://dev.mysql.com/downloads/
  公式ドキュメント
    https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/

  1.リポジトリ追加
    yum localinstall http://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm

  2.有効にするサーバーを確認
    yum repolist enabled | grep mysql

  3.MySQLインストール
    sudo yum install mysql-community-server

  4.MySQLサーバー起動
    systemctl start mysqld
    systemctl status mysqld

  5.一時パスワードの確認
    sudo grep 'temporary password' /var/log/mysqld.log

  6.パスワードの変更
      ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxxxxxx';

  7.自動起動設定
    systemctl enable mysqld


*PHPインストール
  
  参考
    https://deep-blog.jp/engineer/centos7-latest-version-php-install/
    https://www.rem-system.com/centos-nginx-php/ 
    https://pgmemo.tokyo/data/archives/1107.html
    https://qiita.com/ksugawara61/items/0fcf3f72cc905bb6d654

  1.リポジトリのインストール
    yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
  
  2.インストール
    yum -y install --enablerepo=remi,remi-php74 php php-devel php-mbstring php-pdo php-mysql php-gd php-xml php-mcrypt

  3.確認
    rpm -qa | grep php

  4.php-fpmのインストール
    yum -y install --enablerepo=remi,remi-php74 php-fpm

  5.php.iniのバックアップ
    cp -p /etc/php.ini /etc/php.ini.org
  
  6.php.iniの変更
    date.timezone = 
    ->date.timezone = "Asia/Tokyo"

    ;mbstring.language = Japanese
    ->mbstring.language = Japanese

    ;mbstring.internal_encoding =
    ->mbstring.internal_encoding = UTF-8

    ;mbstring.http_input = 
    ->mbstring.http_input = UTF-8

    ;mbstring.http_output =
    ->mbstring.http_output = pass

  7.php-fpmの設定ファイルバックアップ
    cp -p /etc/php-fpm.d/www.conf /etc/php-fpm.d/www.conf.org
  
  8.作成した実行ユーザを設定
  ; Unix user/group of processes
  ; Note: The user is mandatory. If the group is not set, the default user's group
  ;       will be used.
  ; RPM: apache user chosen to provide access to the same directories as httpd
  user = yyyy
  ; RPM: Keep a group allowed to write in log dir.
  group = xxxx

  9.起動
    systemctl start php-fpm
  
  10.自動起動設定
    systemctl enable php-fpm



*Composerインストール
  公式ドキュメント
    https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos
    https://getcomposer.org/download/

  1.インストーラーのコピー
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    
  2.インストーラーの確認
    php -r "if (hash_file('sha384', 'composer-setup.php') === '906a84df04cea2aa72f40b5f787e49f22d4c2f19492ac310e8cba5b96ac8b64115ac402c8cd292b8a03482574915d1a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    
  3.インストール
    php composer-setup.php
    
  4.インストーラーの削除
    php -r "unlink('composer-setup.php');"

*git

1.必要なパッケージインストール
  sudo yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-ExtUtils-MakeMaker

2.gitの最新版取得
  wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.9.5.tar.gz --no-check-certificate

3.解凍
  tar -zxf git-2.9.5.tar.gz

4.インストール
  make prefix=/usr/local all
  make prefix=/usr/local install

5.シンボリックリンク作成
  ln -s /usr/local/bin/git /usr/bin/git


*開発環境(Docker)
  参考
    https://www.aruse.net/entry/2019/10/06/115704

webコンテナ :centos7 nginx
appコンテナ :centos7 php-fpm / node.js
dbコンテナ  :mysql (dbコンテナは公式イメージをそのまま利用)

composer create-project laravel/laravel:^8.0 portfolio48
