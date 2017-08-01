<?php
namespace AppBundle\Controller;

use AppBundle\Components\AngularResponse;
use AppBundle\Entity\Project;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class ProjectController extends Controller
{
    /**
     * @Route("/projects", name="project_index")
     */
    public function findAllAction(){
        $projects = $this->getDoctrine()->getManager()->getRepository('AppBundle:Project')->findAll();

        return new AngularResponse($projects);
    }
    
    private function fillObject(Project $project, array $json){
        $type = $this->getDoctrine()->getManager()->getRepository('AppBundle:ProjectType')->find($json['type']);
        $project->setTitle($json['title']);
        $project->setDescription($json['description']);
        $project->setProjectDate(\DateTime::createFromFormat('d/m/Y', $json['projectDate']));
        $project->setType($type);
    }

    /**
     * @Route("/projects/new", name="project_new")
     */
    public function createProjectAction(Request $request){
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $project = new Project();        
        try{
            
            $this->fillObject($project, $json);

            $em->persist($project);
            $em->flush();
            
            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('persisted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/projects/update/{id}", name="project_update")
     */
    public function updateProjectAction(Request $request, $id){
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent(), true);
        $project = $em->getRepository('AppBundle:Project')->find($id);

        try{

            $this->fillObject($project, $json);

            $em->persist($project);
            $em->flush();

            return new AngularResponse(array('persisted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('persisted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/projects/delete/{id}", name="project_delete")
     */
    public function deleteAction($id){
        $em = $this->getDoctrine()->getManager();
        $project = $em->getRepository('AppBundle:Project')->find($id);

        try{
            
            $em->remove($project);
            $em->flush();

            return new AngularResponse(array('deleted' => true));
        }catch(\Exception $e){
            return new AngularResponse(array('deleted' => false, 'message' => $e->getMessage()));
        }
    }

    /**
     * @Route("/projects/find/{id}", name="project_find")
     */
    public function findAction($id){
        $project = $this->getDoctrine()->getManager()->getRepository('AppBundle:Project')->find($id);

        return new AngularResponse($project);
    }
}