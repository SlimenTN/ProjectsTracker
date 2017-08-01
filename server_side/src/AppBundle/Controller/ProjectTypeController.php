<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use AppBundle\Components\EntityCrud;
use AppBundle\Entity\ProjectType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ProjectTypeController extends Controller implements EntityCrud
{
    /**
     * @Route("/projects-types", name="project_type_index")
     */
    public function findAllAction(){
        $types = $this->getDoctrine()->getManager()->getRepository('AppBundle:ProjectType')->findAll();

        return new AngularResponse($types);
    }

    private function fillObject(ProjectType $type, $json){
        $type->setTitle($json['title']);
    }

    /**
     * @Route("/projects-types/new", name="projects_type_new")
     */
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $type = new ProjectType();
        try{

            $this->fillObject($type, $json);

            $em->persist($type);
            $em->flush();

            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('persisted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/projects-types/update/{id}", name="projects_type_update")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $type = $em->getRepository('AppBundle:ProjectType')->find($id);
        try{

            $this->fillObject($type, $json);

            $em->persist($type);
            $em->flush();

            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('persisted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/projects-types/delete/{id}", name="projects_type_delete")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $type = $em->getRepository('AppBundle:ProjectType')->find($id);

        try{

            $em->remove($type);
            $em->flush();

            return new AngularResponse(array('removed' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('removed' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/projects-types/find/{id}", name="projects_type_find")
     */
    public function findAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $type = $em->getRepository('AppBundle:ProjectType')->find($id);
        
        return new AngularResponse($type);
    }
}