<?php
namespace Iekadou\Example;
require_once("../inc/include.php");
use Iekadou\Quickies\Translation;
use Iekadou\Quickies\View;

$View = new View('index', Translation::translate('Home'), "index.html");
$articles = _i(Article::_cn)->filter_by(array(array('public', '=', 1)));
$View->set_template_var('articles', $articles);
$View->render();
