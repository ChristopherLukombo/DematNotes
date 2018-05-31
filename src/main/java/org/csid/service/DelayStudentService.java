package org.csid.service;

import org.csid.service.dto.DelayStudentDTO;
import java.util.List;

/**
 * Service Interface for managing DelayStudent.
 */
public interface DelayStudentService {

    /**
     * Save a delayStudent.
     *
     * @param delayStudentDTO the entity to save
     * @return the persisted entity
     */
    DelayStudentDTO save(DelayStudentDTO delayStudentDTO);

    /**
     * Get all the delayStudents.
     *
     * @return the list of entities
     */
    List<DelayStudentDTO> findAll();

    /**
     * Get the "id" delayStudent.
     *
     * @param id the id of the entity
     * @return the entity
     */
    DelayStudentDTO findOne(Long id);

    /**
     * Delete the "id" delayStudent.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
