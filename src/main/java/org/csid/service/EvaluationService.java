package org.csid.service;

import org.csid.service.dto.EvaluationDTO;
import java.util.List;

/**
 * Service Interface for managing Evaluation.
 */
public interface EvaluationService {

    /**
     * Save a evaluation.
     *
     * @param evaluationDTO the entity to save
     * @return the persisted entity
     */
    EvaluationDTO save(EvaluationDTO evaluationDTO);

    /**
     * Get all the evaluations.
     *
     * @return the list of entities
     */
    List<EvaluationDTO> findAll();

    /**
     * Get the "id" evaluation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EvaluationDTO findOne(Long id);

    /**
     * Delete the "id" evaluation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
