<?php
namespace Iekadou\Example;

use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

if (!isset($INIT_LOADED)) {
    require_once("../../inc/include.php");
}
$View = new View('404', Translation::translate('404'), 'errors/404.html');
$View->render();
