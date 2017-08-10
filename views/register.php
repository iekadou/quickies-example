<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('Register', Translation::translate('Register'), 'register.html');
$View->render();
