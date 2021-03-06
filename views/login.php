<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Globals;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Login', Translation::translate('Login'), "login.html");
$referrer = (isset($_GET['referrer']) ? htmlspecialchars($_GET['referrer']) : false);
$View->set_template_var('referrer', $referrer);

$View->render();
