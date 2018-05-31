package org.csid.service;

import org.csid.service.dto.ModuleDTO;
import java.util.List;

/**
 * Service Interface for managing Module.
 */
public interface ModuleService {

    /**
     * Save a module.
     *
     * @param moduleDTO the entity to save
     * @return the persisted entity
     */
    ModuleDTO save(ModuleDTO moduleDTO);

    /**
     * Get all the modules.
     *
     * @return the list of entities
     */
    List<ModuleDTO> findAll();

    /**
     * Get the "id" module.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ModuleDTO findOne(Long id);

    /**
     * Delete the "id" module.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
