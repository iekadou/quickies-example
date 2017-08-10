<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Forgot password', Translation::translate('Forgot password').'?', "forgot_password.html");
$View->render();
