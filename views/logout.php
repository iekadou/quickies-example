<?php
namespace Iekadou\Example;
require_once("../inc/include.php");
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Logout', Translation::translate('Logout'), 'logout.html');
Account::logout();
$View->render();
