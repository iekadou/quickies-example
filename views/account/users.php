<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Globals;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;

if (Account::is_logged_in() != true || !Account::get_user()->admin) {
    Utils::raise404();
    die();
}

$View = new View('Users', Translation::translate('Users'), 'account/users.html');
$View->set_template_var('users', _i(USERCLASS)->filter_by());
$View->set_template_var('users_active', true);
$View->render();
