<?php
namespace Iekadou\Example;
require_once(getenv('INCLUDE_PHP_PATH'));
use Iekadou\Quickies\Account;
use Iekadou\Quickies\ApiSerializer;
use Iekadou\Quickies\ApiView;

class ArticleSerializer extends ApiSerializer {

    public function __construct()
    {
        $this->model = _i(Article::_cn);
        $this->fields = array('name', 'slug', 'public', 'content');
        $this->write_only_fields = array();
        $this->read_only_fields = array();
    }

    public function has_instance_rights($instance) {
        return Account::get_user()->admin;
    }
}

$ApiView = new ApiView(
    $serializer = new ArticleSerializer()
);
$result = $ApiView->render();
echo $result;
