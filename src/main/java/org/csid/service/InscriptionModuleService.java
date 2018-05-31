package org.csid.service;

import org.csid.service.dto.InscriptionModuleDTO;
import java.util.List;

/**
 * Service Interface for managing InscriptionModule.
 */
public interface InscriptionModuleService {

    /**
     * Save a inscriptionModule.
     *
     * @param inscriptionModuleDTO the entity to save
     * @return the persisted entity
     */
    InscriptionModuleDTO save(InscriptionModuleDTO inscriptionModuleDTO);

    /**
     * Get all the inscriptionModules.
     *
     * @return the list of entities
     */
    List<InscriptionModuleDTO> findAll();

    /**
     * Get the "id" inscriptionModule.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InscriptionModuleDTO findOne(Long id);

    /**
     * Delete the "id" inscriptionModule.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
