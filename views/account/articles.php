<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Account;
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;

if (Account::is_logged_in() != true || !Account::get_user()->admin) {
    Utils::raise404();
    die();
}

$View = new View('Articles', Translation::translate('Articles'), 'account/articles.html');
$View->set_template_var('articles', _i(Article::_cn)->filter_by());
$View->set_template_var('articles_active', true);
$View->render();
