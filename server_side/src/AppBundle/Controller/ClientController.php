<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use AppBundle\Entity\Client;
use AppBundle\Form\ClientType;
use Doctrine\DBAL\Exception\ForeignKeyConstraintViolationException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Serializer;

class ClientController extends Controller
{
    /**
     * @Route("/clients", name="client_index")
     */
    public function findAllAction(){

        $clients = $this->getDoctrine()->getManager()->getRepository('AppBundle:Client')->findAll();

        return new AngularResponse($clients);
    }

    /**
     * @Route("/clients/new", name="client_new")
     */
    public function createClientAction(Request $request){
        $serializer = new Serializer(array(new GetSetMethodNormalizer()), array('json' => new JsonEncoder()));
        $client = $serializer->deserialize($request->getContent(), Client::class, 'json');
        $em = $this->getDoctrine()->getManager();

        $em->persist($client);
        $em->flush();

        return new AngularResponse(array('persisted' => true));
    }

    /**
     * @Route("/clients/update/{id}", name="client_update")
     */
    public function updateClientAction(Request $request, $id){
        $em = $this->getDoctrine()->getManager();
        $client = $em->getRepository('AppBundle:Client')->find($id);
        $form = $this->createForm(ClientType::class, $client);
        
        $json = json_decode($request->getContent(), true);
        $client->setDenomination($json['denomination']);
        $client->setActivity($json['activity']);
        $client->setPhone($json['phone']);
        $client->setAddress($json['address']);
//        return new AngularResponse($client);
        try{
            $em->persist($client);
            $em->flush();
            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('persisted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/clients/delete/{id}", name="client_delete")
     */
    public function deleteClientAction($id){
        $em = $this->getDoctrine()->getManager();
        $cObject = $em->getRepository('AppBundle:Client')->find($id);
        $response = null;
        try{
            $em->remove($cObject);
            $em->flush();
            $response = array('deleted' => true);
        }catch(ForeignKeyConstraintViolationException $e){
            $response = array('deleted' => false, 'message' => 'Constraint violation: '.$e->getMessage());
        }


        return new AngularResponse($response);
    }

    /**
     * @Route("/clients/find/{id}", name="client_find")
     */
    public function findClientAction($id){
        $client = $this->getDoctrine()->getManager()->getRepository('AppBundle:Client')->find($id);

        return new AngularResponse($client);
    }
}