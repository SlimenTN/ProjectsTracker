<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ProjectTypeController extends Controller
{
    /**
     * @Route("/projects-types", name="project_type_index")
     */
    public function findAllAction(){
        $types = $this->getDoctrine()->getManager()->getRepository('AppBundle:ProjectType')->findAll();

        return new AngularResponse($types);
    }
}