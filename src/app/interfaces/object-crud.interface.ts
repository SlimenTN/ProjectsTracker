export interface ObjectCrud{
  /**
   * Get all objects from the server
   */
  findAll();

  /**
   * Send object to the server and save it in database
   */
  create(object);

  /**
   * Update given object
   */
  update(object, identifier);

  /**
   * Delete object
   */
  deleteObject(identifier);

  /**
   * Find object by his identifier
   */
  find(identifier);
}
