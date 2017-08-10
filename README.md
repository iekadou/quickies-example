# quickies-example

An example and starting project to use the Quickies Framework.

## How to run this project?

### 1. Install Composer

For further information please read [https://getcomposer.org/doc/00-intro.md](https://getcomposer.org/doc/00-intro.md).

### 2. Check out this project:

Download the latest branch as [ZIP File](https://getcomposer.org/doc/00-intro.md) or clone it using GIT: 

    $ cd /path/to/your/workspace
    $ git clone git://github.com/iekadou/quickies-example.git projectname && cd projectname


### 3. Install Packages

To install the required packages just run the following command:

    $ composer install

### 4. Config

You need to add your MySQL Database Settings in `conf/secrets.py`:

```php
<?php
    $secrets['db_host'] = "localhost";
    $secrets['db_name'] = "example";
    $secrets['db_user'] = "secret";
    $secrets['db_pass'] = "secret";
```

Additionally you may want to adjust `conf/webapp.php`.

### 5. Run Quicky

To run database migrations and install them into the database just run the following commands:

    $ php quicky makemigrations
    $ php quicky migrate

Now the Project should be available.
