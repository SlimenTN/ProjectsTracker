<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class InterventionTypeController extends Controller
{
    /**
     * @Route("/interventions-types", name="intervention_type_index")
     */
    public function findAllAction(){
        $types = $this->getDoctrine()->getManager()->getRepository('AppBundle:InterventionType')->findAll();

        return new AngularResponse($types);
    }
}