package org.csid.service;

import org.csid.service.dto.YearPeriodDTO;
import java.util.List;

/**
 * Service Interface for managing YearPeriod.
 */
public interface YearPeriodService {

    /**
     * Save a yearPeriod.
     *
     * @param yearPeriodDTO the entity to save
     * @return the persisted entity
     */
    YearPeriodDTO save(YearPeriodDTO yearPeriodDTO);

    /**
     * Get all the yearPeriods.
     *
     * @return the list of entities
     */
    List<YearPeriodDTO> findAll();

    /**
     * Get the "id" yearPeriod.
     *
     * @param id the id of the entity
     * @return the entity
     */
    YearPeriodDTO findOne(Long id);

    /**
     * Delete the "id" yearPeriod.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
