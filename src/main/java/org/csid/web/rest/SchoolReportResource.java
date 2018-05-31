package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.SchoolReportService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.SchoolReportDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SchoolReport.
 */
@RestController
@RequestMapping("/api")
public class SchoolReportResource {

    private final Logger log = LoggerFactory.getLogger(SchoolReportResource.class);

    private static final String ENTITY_NAME = "schoolReport";

    private final SchoolReportService schoolReportService;

    public SchoolReportResource(SchoolReportService schoolReportService) {
        this.schoolReportService = schoolReportService;
    }

    /**
     * POST  /school-reports : Create a new schoolReport.
     *
     * @param schoolReportDTO the schoolReportDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new schoolReportDTO, or with status 400 (Bad Request) if the schoolReport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/school-reports")
    @Timed
    public ResponseEntity<SchoolReportDTO> createSchoolReport(@Valid @RequestBody SchoolReportDTO schoolReportDTO) throws URISyntaxException {
        log.debug("REST request to save SchoolReport : {}", schoolReportDTO);
        if (schoolReportDTO.getId() != null) {
            throw new BadRequestAlertException("A new schoolReport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolReportDTO result = schoolReportService.save(schoolReportDTO);
        return ResponseEntity.created(new URI("/api/school-reports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /school-reports : Updates an existing schoolReport.
     *
     * @param schoolReportDTO the schoolReportDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated schoolReportDTO,
     * or with status 400 (Bad Request) if the schoolReportDTO is not valid,
     * or with status 500 (Internal Server Error) if the schoolReportDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/school-reports")
    @Timed
    public ResponseEntity<SchoolReportDTO> updateSchoolReport(@Valid @RequestBody SchoolReportDTO schoolReportDTO) throws URISyntaxException {
        log.debug("REST request to update SchoolReport : {}", schoolReportDTO);
        if (schoolReportDTO.getId() == null) {
            return createSchoolReport(schoolReportDTO);
        }
        SchoolReportDTO result = schoolReportService.save(schoolReportDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, schoolReportDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /school-reports : get all the schoolReports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of schoolReports in body
     */
    @GetMapping("/school-reports")
    @Timed
    public List<SchoolReportDTO> getAllSchoolReports() {
        log.debug("REST request to get all SchoolReports");
        return schoolReportService.findAll();
        }

    /**
     * GET  /school-reports/:id : get the "id" schoolReport.
     *
     * @param id the id of the schoolReportDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the schoolReportDTO, or with status 404 (Not Found)
     */
    @GetMapping("/school-reports/{id}")
    @Timed
    public ResponseEntity<SchoolReportDTO> getSchoolReport(@PathVariable Long id) {
        log.debug("REST request to get SchoolReport : {}", id);
        SchoolReportDTO schoolReportDTO = schoolReportService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(schoolReportDTO));
    }

    /**
     * DELETE  /school-reports/:id : delete the "id" schoolReport.
     *
     * @param id the id of the schoolReportDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/school-reports/{id}")
    @Timed
    public ResponseEntity<Void> deleteSchoolReport(@PathVariable Long id) {
        log.debug("REST request to delete SchoolReport : {}", id);
        schoolReportService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
