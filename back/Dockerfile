FROM php:7.4-fpm-alpine

RUN apk --update --no-cache add bash git

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php && php -r "unlink('composer-setup.php');" && mv composer.phar /usr/local/bin/composer

RUN wget https://get.symfony.com/cli/installer -O - | bash && mv /root/.symfony/bin/symfony /usr/local/bin/symfony

RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo pdo_mysql zip intl

RUN pecl install mongodb
RUN docker-php-ext-enable mongodb

WORKDIR /var/www/html

COPY . .

CMD ["symfony", "server:start"]
