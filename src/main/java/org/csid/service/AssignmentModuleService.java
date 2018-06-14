package org.csid.service;

import org.csid.service.dto.AssignmentModuleDTO;
import java.util.List;

/**
 * Service Interface for managing AssignmentModule.
 */
public interface AssignmentModuleService {

    /**
     * Save a assignmentModule.
     *
     * @param assignmentModuleDTO the entity to save
     * @return the persisted entity
     */
    AssignmentModuleDTO save(AssignmentModuleDTO assignmentModuleDTO);

    /**
     * Get all the assignmentModules.
     *
     * @return the list of entities
     */
    List<AssignmentModuleDTO> findAll();

    /**
     * Get the "id" assignmentModule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AssignmentModuleDTO findOne(Long id);

    /**
     * Delete the "id" assignmentModule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
