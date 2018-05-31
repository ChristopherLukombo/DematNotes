package org.csid.service;

import org.csid.service.dto.AbsenceDTO;
import java.util.List;

/**
 * Service Interface for managing Absence.
 */
public interface AbsenceService {

    /**
     * Save a absence.
     *
     * @param absenceDTO the entity to save
     * @return the persisted entity
     */
    AbsenceDTO save(AbsenceDTO absenceDTO);

    /**
     * Get all the absences.
     *
     * @return the list of entities
     */
    List<AbsenceDTO> findAll();

    /**
     * Get the "id" absence.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AbsenceDTO findOne(Long id);

    /**
     * Delete the "id" absence.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
