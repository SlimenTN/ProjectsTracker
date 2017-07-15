<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use AppBundle\Entity\Client;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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
}