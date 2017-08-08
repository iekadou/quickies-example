<?php
namespace Iekadou\Example;
require_once("../inc/include.php");
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('index', Translation::translate('Home'), "index.html");

$View->render();
