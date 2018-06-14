package org.csid.service;

import org.csid.service.dto.InscriptionDTO;
import java.util.List;

/**
 * Service Interface for managing Inscription.
 */
public interface InscriptionService {

    /**
     * Save a inscription.
     *
     * @param inscriptionDTO the entity to save
     * @return the persisted entity
     */
    InscriptionDTO save(InscriptionDTO inscriptionDTO);

    /**
     * Get all the inscriptions.
     *
     * @return the list of entities
     */
    List<InscriptionDTO> findAll();

    /**
     * Get the "id" inscription.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InscriptionDTO findOne(Long id);

    /**
     * Delete the "id" inscription.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
