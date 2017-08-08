<?php
namespace Iekadou\Example;
require_once("../inc/include.php");
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Register', Translation::translate('Register'), 'register.html');
$View->render();
