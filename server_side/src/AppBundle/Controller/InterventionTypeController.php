<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use AppBundle\Components\EntityCrud;
use AppBundle\Entity\InterventionType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class InterventionTypeController extends Controller implements EntityCrud
{
    /**
     * @Route("/interventions-types", name="intervention_type_index")
     */
    public function findAllAction(){
        $types = $this->getDoctrine()->getManager()->getRepository('AppBundle:InterventionType')->findAll();

        return new AngularResponse($types);
    }

    private function fillObject(InterventionType $type, $json){
        $type->setTitle($json['title']);
    }

    /**
     * @Route("/interventions-types/new", name="interventions_type_new")
     */
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $type = new InterventionType();
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
     * @Route("/interventions-types/update/{id}", name="interventions_type_update")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $type = $em->getRepository('AppBundle:InterventionType')->find($id);
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
     * @Route("/interventions-types/delete/{id}", name="intervention_type_delete")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $type = $em->getRepository('AppBundle:InterventionType')->find($id);

        try{

            $em->remove($type);
            $em->flush();

            return new AngularResponse(array('removed' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('removed' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/interventions-types/find/{id}", name="intervention_type_find")
     */
    public function findAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $type = $em->getRepository('AppBundle:InterventionType')->find($id);

        return new AngularResponse($type);
    }
}