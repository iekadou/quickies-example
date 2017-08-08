<?php
namespace Iekadou\Example;
require_once("../inc/include.php");
use Iekadou\Quickies\Globals;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Login', Translation::translate('Login'), "login.html");
$referrer = (isset($_GET['referrer']) ? htmlspecialchars($_GET['referrer']) : false);
Globals::set_var('referrer', $referrer);

$View->render();
