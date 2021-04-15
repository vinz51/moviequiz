FROM php:8.0.3-fpm-alpine

RUN apk --update --no-cache add bash git

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php composer-setup.php && php -r "unlink('composer-setup.php');" && mv composer.phar /usr/local/bin/composer

RUN wget https://get.symfony.com/cli/installer -O - | bash && mv /root/.symfony/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www/html

COPY . .

CMD ["symfony", "server:start"]
