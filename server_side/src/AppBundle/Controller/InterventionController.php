<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use AppBundle\Components\EntityCrud;
use AppBundle\Entity\Client;
use AppBundle\Entity\Intervention;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class InterventionController extends Controller implements EntityCrud
{
    /**
     * @Route("/interventions", name="intervention_index")
     */
    public function findAllAction()
    {
        $interventions = $this->getDoctrine()->getManager()->getRepository('AppBundle:Intervention')->findAll();
        return new AngularResponse($interventions);
    }

    private function fillObject(Intervention $intervention, array $json){
        $em = $this->getDoctrine()->getManager();
        $intervention->setInterventionDate(\DateTime::createFromFormat('d/m/Y', $json['interventionDate']));
        $intervention->setProject($em->getRepository('AppBundle:Project')->find($json['project']));
        $clients = $json['clients'];
        if($clients != null){
            foreach ($clients as $id){
                $c = $em->getRepository('AppBundle:Client')->find($id);
                if(!$intervention->getClients()->contains($c)){
                    $intervention->addClient($c);
                }
                $this->clearClientCollection($intervention, $clients);
            }
        }
        $intervention->setNumberHours($json['numberHours']);
        $intervention->setType($em->getRepository('AppBundle:InterventionType')->find($json['type']));
        $intervention->setSearchIncluded(($json['searchIncluded'] == null) ? false : true);
        $intervention->setSource($json['source']);
        $intervention->setDescription($json['description']);
    }

    private function clearClientCollection(Intervention $intervention, array $clients){
        foreach ($intervention->getClients() as $client){
            if($client instanceof Client){
                if(!in_array($client->getId(), $clients)) $intervention->getClients()->removeElement($client);
            }
        }
    }

    /**
     * @Route("/interventions/new", name="intervention_new")
     */
    public function createAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $intervention = new Intervention();
        try{

            $this->fillObject($intervention, $json);

            $em->persist($intervention);
            $em->flush();

            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('persisted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/interventions/update/{id}", name="intervention_update")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $intervention = $em->getRepository('AppBundle:Intervention')->find($id);
        try{

            $this->fillObject($intervention, $json);

            $em->persist($intervention);
            $em->flush();

            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){

            return new AngularResponse(array('persisted' => false, 'message' => $this->buildExceptionMessage($e)));
        }
    }

    private function buildExceptionMessage(\Exception $e){
        $msg = $e->getMessage().'<br>';
        $msg .= $e->getFile().' => '.$e->getLine().'<br>';
        $msg .= $e->getTraceAsString();
        return $msg;
    }

    /**
     * @Route("/interventions/delete/{id}", name="intervention_delete")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $intervention = $em->getRepository('AppBundle:Intervention')->find($id);

        try{

            $em->remove($intervention);
            $em->flush();

            return new AngularResponse(array('deleted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('deleted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/interventions/find/{id}", name="intervention_find")
     */
    public function findAction($id)
    {
        $intervention = $this->getDoctrine()->getManager()->getRepository('AppBundle:Intervention')->customFind($id);
        return new AngularResponse($intervention);
    }
}