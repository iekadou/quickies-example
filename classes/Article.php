<?php

namespace Iekadou\Example;
use Iekadou\Quickies\BaseModel;
use Iekadou\Quickies\BooleanField;
use Iekadou\Quickies\TextField;
use Iekadou\Quickies\VarcharField;

class Article extends BaseModel
{
    const _cn = "Iekadou\\Example\\Article";

    protected $table = 'article';
    protected $fields = array(
        'name' => array('type' => VarcharField::_cn, 'max_length' => 255),
        'slug' => array('type' => VarcharField::_cn, 'max_length' => 255),
        'content' => array('type' => TextField::_cn, 'html' => True),
        'public' => array('type' => BooleanField::_cn),
    );
    public $form_fields = array('name', 'slug', 'public', 'content');

}
