<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Globals;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;

if (Account::is_logged_in() != true) {
    Utils::raise404();
    die();
}

$View = new View('Dashboard', Translation::translate('Dashboard'), 'account/index.html');
$View->set_template_var('dashboard_active', true);
$View->render();
