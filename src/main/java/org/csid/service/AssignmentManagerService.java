package org.csid.service;

import org.csid.service.dto.AssignmentManagerDTO;
import java.util.List;

/**
 * Service Interface for managing AssignmentManager.
 */
public interface AssignmentManagerService {

    /**
     * Save a assignmentManager.
     *
     * @param assignmentManagerDTO the entity to save
     * @return the persisted entity
     */
    AssignmentManagerDTO save(AssignmentManagerDTO assignmentManagerDTO);

    /**
     * Get all the assignmentManagers.
     *
     * @return the list of entities
     */
    List<AssignmentManagerDTO> findAll();

    /**
     * Get the "id" assignmentManager.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AssignmentManagerDTO findOne(Long id);

    /**
     * Delete the "id" assignmentManager.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
