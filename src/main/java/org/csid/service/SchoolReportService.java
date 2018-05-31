package org.csid.service;

import org.csid.service.dto.SchoolReportDTO;
import java.util.List;

/**
 * Service Interface for managing SchoolReport.
 */
public interface SchoolReportService {

    /**
     * Save a schoolReport.
     *
     * @param schoolReportDTO the entity to save
     * @return the persisted entity
     */
    SchoolReportDTO save(SchoolReportDTO schoolReportDTO);

    /**
     * Get all the schoolReports.
     *
     * @return the list of entities
     */
    List<SchoolReportDTO> findAll();

    /**
     * Get the "id" schoolReport.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SchoolReportDTO findOne(Long id);

    /**
     * Delete the "id" schoolReport.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
