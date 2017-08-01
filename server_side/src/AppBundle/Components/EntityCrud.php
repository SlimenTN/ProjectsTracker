<?php
namespace AppBundle\Components;

use Symfony\Component\HttpFoundation\Request;
use AppBundle\Components\AngularResponse;

/**
 * Interface EntityCrud
 * Contains the crud of entity and each function should return an AngularResponse
 * @package AppBundle\Components
 */
interface EntityCrud
{
    /**
     * Find list of all objects
     * @return AngularResponse
     */
    public function findAllAction();

    /**
     * Create new object
     * @param Request $request
     * @return AngularResponse
     */
    public function createAction(Request $request);

    /**
     * Update object
     * @param Request $request
     * @return AngularResponse
     */
    public function updateAction(Request $request, $id);

    /**
     * Delete object
     * @param $id
     * @return AngularResponse
     */
    public function deleteAction($id);

    /**
     * Find object by id
     * @param $id
     * @return AngularResponse
     */
    public function findAction($id);
}