<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;


$slug = (isset($_GET['slug']) ? htmlspecialchars($_GET['slug']) : false);

$Article = _i(Article::_cn)->get_by(array(array("slug", "=", $slug), array("public", "=", 1)));
if (!$Article) {
    Utils::raise404();
    die();
}
$View = new View($Article->slug, $Article->name, 'article.html');
$View->set_template_var('article', $Article);
$View->render();
