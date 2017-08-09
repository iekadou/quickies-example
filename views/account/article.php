<?php
namespace Iekadou\Example;
require_once("../../inc/include.php");
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\UrlsPy;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;
use Lare_Team\Lare\Lare;

$Article = _i(Article::_cn);
$id = (isset($_GET['id']) ? htmlspecialchars($_GET['id']) : false);
if ($id == 'new' && Account::is_logged_in() && !Lare::is_enabled()) {
    if (!Account::get_user()->admin) {
        Utils::raise404();
        die();
    }
    $Article->name = 'new article';
    $Article = $Article->create();
    header("Location: " . UrlsPy::get_url('account:article', $Article->id));
} else {
    $Article = _i(Article::_cn)->get_by(array(array("id", "=", $id)));
    if (!$Article) {
        Utils::raise404();
        die();
    }
    $View = new View('Article', Translation::translate('Article'), 'account/__instance_edit.html');
    $View->set_template_var('form_method', 'PUT');
    $View->set_template_var('Form', $Article->get_form());
    $View->set_template_var('form_method', 'PUT');
    $View->set_template_var('instance', $Article);
    $View->set_template_var('instance_name', $Article->name);
    $View->set_template_var('overview_url', UrlsPy::get_url('account:articles'));
    $View->set_template_var('overview_label', Translation::translate("Articles"));
    $View->set_template_var('instance_url', UrlsPy::get_url('account:article', $Article->id));
    $View->set_template_var('instance_api_url', UrlsPy::get_url('api:article', $Article->id));
    $View->set_template_var('articles_active', true);
    $View->set_template_var('sm_cols', 12);
    $View->render();
}
