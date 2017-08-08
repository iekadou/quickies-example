<?php
namespace Iekadou\Example;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

require_once("../inc/include.php");

$View = new View('Forgot password', Translation::translate('Forgot password').'?', "forgot_password.html");
$View->render();
