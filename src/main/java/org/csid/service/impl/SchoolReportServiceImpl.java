package org.csid.service.impl;

import org.csid.service.SchoolReportService;
import org.csid.domain.SchoolReport;
import org.csid.repository.SchoolReportRepository;
import org.csid.service.dto.SchoolReportDTO;
import org.csid.service.mapper.SchoolReportMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SchoolReport.
 */
@Service
@Transactional
public class SchoolReportServiceImpl implements SchoolReportService {

    private final Logger log = LoggerFactory.getLogger(SchoolReportServiceImpl.class);

    private final SchoolReportRepository schoolReportRepository;

    private final SchoolReportMapper schoolReportMapper;

    public SchoolReportServiceImpl(SchoolReportRepository schoolReportRepository, SchoolReportMapper schoolReportMapper) {
        this.schoolReportRepository = schoolReportRepository;
        this.schoolReportMapper = schoolReportMapper;
    }

    /**
     * Save a schoolReport.
     *
     * @param schoolReportDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SchoolReportDTO save(SchoolReportDTO schoolReportDTO) {
        log.debug("Request to save SchoolReport : {}", schoolReportDTO);
        SchoolReport schoolReport = schoolReportMapper.toEntity(schoolReportDTO);
        schoolReport = schoolReportRepository.save(schoolReport);
        return schoolReportMapper.toDto(schoolReport);
    }

    /**
     * Get all the schoolReports.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SchoolReportDTO> findAll() {
        log.debug("Request to get all SchoolReports");
        return schoolReportRepository.findAll().stream()
            .map(schoolReportMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one schoolReport by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SchoolReportDTO findOne(Long id) {
        log.debug("Request to get SchoolReport : {}", id);
        SchoolReport schoolReport = schoolReportRepository.findOne(id);
        return schoolReportMapper.toDto(schoolReport);
    }

    /**
     * Delete the schoolReport by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SchoolReport : {}", id);
        schoolReportRepository.delete(id);
    }
}
