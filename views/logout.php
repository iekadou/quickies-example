<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Logout', Translation::translate('Logout'), 'logout.html');
Account::logout();
$View->render();
