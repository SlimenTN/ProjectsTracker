<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Project
 *
 * @ORM\Table(name="project")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ProjectRepository")
 */
class Project implements \JsonSerializable
{

    function jsonSerialize()
    {
        return get_object_vars($this);
    }
    
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="creation_date", type="datetime")
     */
    private $creationDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="project_date", type="date")
     */
    private $projectDate;

    /**
     * @var ProjectType
     * 
     * @ORM\ManyToOne(targetEntity="ProjectType")
     */
    private $type;
    
    function __construct()
    {
        $this->creationDate = new \DateTime("now", new \DateTimeZone('Etc/GMT'));
    }

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
     * Set title
     *
     * @param string $title
     *
     * @return Project
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Project
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
     * Set creationDate
     *
     * @param \DateTime $creationDate
     *
     * @return Project
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
     * Set projectDate
     *
     * @param \DateTime $projectDate
     *
     * @return Project
     */
    public function setProjectDate($projectDate)
    {
        $this->projectDate = $projectDate;

        return $this;
    }

    /**
     * Get projectDate
     *
     * @return \DateTime
     */
    public function getProjectDate()
    {
        return $this->projectDate;
    }

    /**
     * Set type
     *
     * @param \AppBundle\Entity\ProjectType $type
     *
     * @return Project
     */
    public function setType(\AppBundle\Entity\ProjectType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \AppBundle\Entity\ProjectType
     */
    public function getType()
    {
        return $this->type;
    }
}
