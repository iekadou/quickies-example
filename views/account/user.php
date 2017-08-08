<?php
namespace Iekadou\Example;
require_once("../../inc/include.php");
use Iekadou\Quickies\Account;
use Iekadou\Quickies\BaseModelForm;
use Iekadou\Quickies\Globals;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\UrlsPy;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;

if (Account::is_logged_in() != true || !Account::get_user()->admin) {
    Utils::raise404();
    die();
}

$id = (isset($_GET['id']) ? htmlspecialchars($_GET['id']) : false);

$User = _i(USERCLASS)->get_by(array(array("id", "=", $id)));
if (!$User) {
    Utils::raise404();
    die();
}

$View = new View('User', Translation::translate('User'), 'account/user.html');
Globals::set_var('form_method', 'PUT');
$Form = new BaseModelForm(
    $model=get_class($User),
    $fields=array('username', 'email', 'apnkey', 'first_name', 'last_name', 'activated', 'admin'),
    $object_id=$User->id);
Globals::set_var('Form', $Form);
Globals::set_var('form_method', 'PUT');
Globals::set_var('instance', $User);
Globals::set_var('instance_name', $User->username);
Globals::set_var('overview_url', UrlsPy::get_url('account:users'));
Globals::set_var('overview_label', Translation::translate("Users"));
Globals::set_var('instance_url', UrlsPy::get_url('account:user', $User->id));
Globals::set_var('instance_api_url', UrlsPy::get_url('api:user', $User->id));
Globals::set_var('users_active', true);
$View->render();
