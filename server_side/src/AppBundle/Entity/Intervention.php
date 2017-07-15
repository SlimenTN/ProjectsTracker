<?php
namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Intervention
 *
 * @ORM\Table(name="intervention")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\InterventionRepository")
 */
class Intervention
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="creation_date", type="datetime")
     */
    private $creationDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="intervention_date", type="date")
     */
    private $interventionDate;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var float
     *
     * @ORM\Column(name="number_hours", type="float")
     */
    private $numberHours;

    /**
     * @var ArrayCollection
     * 
     * @ORM\ManyToMany(targetEntity="Client")
     */
    private $clients;

    /**
     * @var InterventionType
     *
     * @ORM\ManyToOne(targetEntity="InterventionType")
     */
    private $type;

    /**
     * @var Project
     *
     * @ORM\ManyToOne(targetEntity="Project")
     */
    private $project;

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set creationDate
     *
     * @param \DateTime $creationDate
     *
     * @return Intervention
     */
    public function setCreationDate($creationDate)
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    /**
     * Get creationDate
     *
     * @return \DateTime
     */
    public function getCreationDate()
    {
        return $this->creationDate;
    }

    /**
     * Set interventionDate
     *
     * @param \DateTime $interventionDate
     *
     * @return Intervention
     */
    public function setInterventionDate($interventionDate)
    {
        $this->interventionDate = $interventionDate;

        return $this;
    }

    /**
     * Get interventionDate
     *
     * @return \DateTime
     */
    public function getInterventionDate()
    {
        return $this->interventionDate;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Intervention
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set numberHours
     *
     * @param float $numberHours
     *
     * @return Intervention
     */
    public function setNumberHours($numberHours)
    {
        $this->numberHours = $numberHours;

        return $this;
    }

    /**
     * Get numberHours
     *
     * @return float
     */
    public function getNumberHours()
    {
        return $this->numberHours;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->creationDate = new \DateTime("now", new \DateTimeZone('Etc/GMT'));
        $this->clients = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add client
     *
     * @param \AppBundle\Entity\Client $client
     *
     * @return Intervention
     */
    public function addClient(\AppBundle\Entity\Client $client)
    {
        $this->clients[] = $client;

        return $this;
    }

    /**
     * Remove client
     *
     * @param \AppBundle\Entity\Client $client
     */
    public function removeClient(\AppBundle\Entity\Client $client)
    {
        $this->clients->removeElement($client);
    }

    /**
     * Get clients
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getClients()
    {
        return $this->clients;
    }

    /**
     * Set type
     *
     * @param \AppBundle\Entity\InterventionType $type
     *
     * @return Intervention
     */
    public function setType(\AppBundle\Entity\InterventionType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \AppBundle\Entity\InterventionType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set project
     *
     * @param \AppBundle\Entity\Project $project
     *
     * @return Intervention
     */
    public function setProject(\AppBundle\Entity\Project $project = null)
    {
        $this->project = $project;

        return $this;
    }

    /**
     * Get project
     *
     * @return \AppBundle\Entity\Project
     */
    public function getProject()
    {
        return $this->project;
    }
}
