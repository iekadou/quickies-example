<?php
namespace Iekadou\Example;
require_once("../inc/include.php");
use Iekadou\Quickies\Utils;
use Iekadou\Quickies\View;


$id = (isset($_GET['id']) ? htmlspecialchars($_GET['id']) : false);

$Article = _i(Article::_cn)->get_by(array(array("slug", "=", $id), array("public", "=", 1)));
if (!$Article) {
    Utils::raise404();
    die();
}
$View = new View($Article->slug, $Article->name, 'article.html');
$View->set_template_var('article', $Article);
$View->render();

