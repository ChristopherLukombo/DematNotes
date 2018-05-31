package org.csid.service;

import org.csid.service.dto.SchoolYearDTO;
import java.util.List;

/**
 * Service Interface for managing SchoolYear.
 */
public interface SchoolYearService {

    /**
     * Save a schoolYear.
     *
     * @param schoolYearDTO the entity to save
     * @return the persisted entity
     */
    SchoolYearDTO save(SchoolYearDTO schoolYearDTO);

    /**
     * Get all the schoolYears.
     *
     * @return the list of entities
     */
    List<SchoolYearDTO> findAll();

    /**
     * Get the "id" schoolYear.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SchoolYearDTO findOne(Long id);

    /**
     * Delete the "id" schoolYear.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
