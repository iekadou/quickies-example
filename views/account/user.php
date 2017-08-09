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
$Form = new BaseModelForm(
    $model=get_class($User),
    $fields=array('username', 'email', 'apnkey', 'first_name', 'last_name', 'activated', 'admin'),
    $object_id=$User->id
);
$View->set_template_var('form_method', 'PUT');
$View->set_template_var('Form', $Form);
$View->set_template_var('form_method', 'PUT');
$View->set_template_var('instance', $User);
$View->set_template_var('instance_name', $User->username);
$View->set_template_var('overview_url', UrlsPy::get_url('account:users'));
$View->set_template_var('overview_label', Translation::translate("Users"));
$View->set_template_var('instance_url', UrlsPy::get_url('account:user', $User->id));
$View->set_template_var('instance_api_url', UrlsPy::get_url('api:user', $User->id));
$View->set_template_var('users_active', true);
$View->render();
