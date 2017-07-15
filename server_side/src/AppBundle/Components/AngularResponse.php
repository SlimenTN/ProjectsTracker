<?php
namespace AppBundle\Components;

use Symfony\Component\HttpFoundation\Response;

/**
 * Class AngularResponse
 * Return json response to angular client
 * @package AppBundle\Components
 */
class AngularResponse extends Response
{
    function __construct($content, $status = 201, array $headers = array('Access-Control-Allow-Origin' => '*', 'Content-Type' => 'application/json'))
    {
        parent::__construct(json_encode($content), $status, $headers);
    }
}