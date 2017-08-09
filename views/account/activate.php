<?php
namespace Iekadou\Example;
require_once("../../inc/include.php");
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Globals;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;

if (Account::is_logged_in() != true) {
    Utils::raise404();
    die();
}

$View = new View('Activate', Translation::translate('Activate'), 'account/activate.html');
$View->set_template_var('dashboard_active', true);
$View->render();
