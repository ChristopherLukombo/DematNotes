package org.csid.service;

import org.csid.service.dto.InterventionDTO;
import java.util.List;

/**
 * Service Interface for managing Intervention.
 */
public interface InterventionService {

    /**
     * Save a intervention.
     *
     * @param interventionDTO the entity to save
     * @return the persisted entity
     */
    InterventionDTO save(InterventionDTO interventionDTO);

    /**
     * Get all the interventions.
     *
     * @return the list of entities
     */
    List<InterventionDTO> findAll();

    /**
     * Get the "id" intervention.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InterventionDTO findOne(Long id);

    /**
     * Delete the "id" intervention.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
