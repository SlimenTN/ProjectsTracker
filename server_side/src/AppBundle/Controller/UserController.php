<?php
namespace AppBundle\Controller;


use AppBundle\Components\AngularResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class UserController extends Controller
{
    /**
     * @Route("/authentication", name="user_authentication")
     */
    public function authenticateAction(Request $request){
        $json = json_decode($request->getContent(), true);
        try{
            $user = $this->getDoctrine()->getManager()->getRepository('AppBundle:User')->findOneBy(
                array(
                    'username' => $json['username'],
                    'password' => md5($json['password']),
                    'active' => true,
                )
            );
            return new AngularResponse(array('status' => 200, 'content' => $user));
        }catch (\Exception $e){
            return new AngularResponse(array('status' => 500, 'content' => $e->getMessage()));
        }
    }
}