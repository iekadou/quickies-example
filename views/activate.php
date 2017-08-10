<?php
namespace Iekadou\Checkpoints;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;

$View = new View('Activate', Translation::translate('Activate'), "activate.html");

$activation_key = (isset($_GET['activation_key']) ? htmlspecialchars($_GET['activation_key']) : false);
$User = _i(USERCLASS)->get_by(array(array("activation_key", "=", $activation_key)));

if ($User == false) {
    Utils::raise404();
    die();
}
$User->activated = true;
$User->save();
$View->render();
