package org.csid.service;

import org.csid.service.dto.AssignmentYearPeriodDTO;
import java.util.List;

/**
 * Service Interface for managing AssignmentYearPeriod.
 */
public interface AssignmentYearPeriodService {

    /**
     * Save a assignmentYearPeriod.
     *
     * @param assignmentYearPeriodDTO the entity to save
     * @return the persisted entity
     */
    AssignmentYearPeriodDTO save(AssignmentYearPeriodDTO assignmentYearPeriodDTO);

    /**
     * Get all the assignmentYearPeriods.
     *
     * @return the list of entities
     */
    List<AssignmentYearPeriodDTO> findAll();

    /**
     * Get the "id" assignmentYearPeriod.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AssignmentYearPeriodDTO findOne(Long id);

    /**
     * Delete the "id" assignmentYearPeriod.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
