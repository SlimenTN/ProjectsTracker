<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ProjectController extends Controller
{
    /**
     * @Route("/projects", name="project_index")
     */
    public function findAllAction(){
        $projects = $this->getDoctrine()->getManager()->getRepository('AppBundle:Project')->findAll();

        return new AngularResponse($projects);
    }


}